import { Axios } from "axios";
import { JSEncrypt } from "jsencrypt";

const config = {
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

const api = new Axios(config);
let clientPrivateKey;

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = "Bearer " + token;

  const data = req.data;
  const serverPublicKey = localStorage.getItem("serverPublicKey");
  if (req.url?.startsWith("/auth")) {
    const jsEncrypt = new JSEncrypt({ default_key_size: "2048" }).getKey();
    clientPrivateKey = jsEncrypt.getPrivateKey();
    localStorage.setItem("clientPrivateKey", clientPrivateKey);
    data.publicKey = jsEncrypt.getPublicKey();
  }

  const newData = JSON.stringify(data);
  const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
  jsEncrypt.setPublicKey(serverPublicKey!);

  const encryptedData = [];
  for (let i = 0; i <= Math.floor(newData.length / 100); i++) {
    const str = newData.slice(i * 100, (i + 1) * 100);

    const encStr = jsEncrypt.encrypt(str);
    if (encStr === false) {
      throw new Error("error while encryption data.");
    }
    encryptedData.push(encStr);
  }

  req.data = JSON.stringify({ encryptedData });

  return req;
});

api.interceptors.response.use((res) => {
  const data = JSON.parse(res.data);

  const { encryptedData } = data;
  if (encryptedData) {
    const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
    jsEncrypt.setPrivateKey(clientPrivateKey!);

    const decryptedData = [];

    for (const chunk of encryptedData) {
      const decStr = jsEncrypt.decrypt(chunk);
      if (decStr === false) {
        throw new Error("error while encryption data.");
      }
      decryptedData.push(decStr);
    }

    const data = JSON.parse(decryptedData.join(""));
    res.data = data;

    return res;
  } else {
    throw new Error(data.error ?? data.message ?? data.errors ?? "no data");
  }
});

const apiNotSecured = new Axios(config);
apiNotSecured.interceptors.response.use((res) => {
  res.data = JSON.parse(res.data);
  return res;
});

export { api, apiNotSecured };
