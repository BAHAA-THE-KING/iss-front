import { Axios, InternalAxiosRequestConfig } from "axios";
import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const config = {
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

const setToken = (req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  req.headers.Authorization = "Bearer " + token;
};

const apiNotSecured = new Axios(config);
apiNotSecured.interceptors.response.use((res) => {
  res.data = JSON.parse(res.data);
  return res;
});

const apiAuth = new Axios(config);

let clientPrivateKey;

apiAuth.interceptors.request.use(async (req) => {
  const data = req.data;
  const serverPublicKey = (await apiNotSecured.get("/key/public-key")).data
    .publicKey;

  const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
  const keys = jsEncrypt.getKey();
  clientPrivateKey = keys.getPrivateKey();
  data.publicKey = keys.getPublicKey();

  const newData = JSON.stringify(data);
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

apiAuth.interceptors.response.use((res) => {
  const data = JSON.parse(res.data);

  const { encryptedData } = data;

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

  res.data = JSON.parse(decryptedData.join(""));
  Cookies.set("sessionKey", res.data.sessionKey, {
    secure: true,
    sameSite: "strict",
  });

  delete res.data.sessionKey;

  return res;
});

const api = new Axios(config);

api.interceptors.request.use((req) => {
  setToken(req);
  const data = req.data;

  if (data) {
    const sessionKey = Cookies.get("sessionKey")!;
    const newData = JSON.stringify(data);
    const encryptedData = CryptoJS.TripleDES.encrypt(newData, sessionKey, {
      mode: CryptoJS.mode.ECB,
    }).toString();

    req.data = JSON.stringify({ encryptedData });
  }
  return req;
});

api.interceptors.response.use((res) => {
  const data = JSON.parse(res.data);

  const { encryptedData } = data;
  if (encryptedData) {
    const sessionKey = Cookies.get("sessionKey")!;
    const decryptedData = CryptoJS.TripleDES.decrypt(
      encryptedData,
      sessionKey,
      {
        mode: CryptoJS.mode.ECB,
      }
    ).toString(CryptoJS.enc.Utf8);

    res.data = JSON.parse(decryptedData);

    return res;
  } else {
    throw new Error(data.error ?? data.message ?? data.errors ?? "no data");
  }
});

export { apiAuth, api };
