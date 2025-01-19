import { Axios, InternalAxiosRequestConfig } from "axios";
import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

import { generateSessionKey } from ".";

const config = {
  baseURL: "https://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
};

const setToken = (req: InternalAxiosRequestConfig) => {
  const token = Cookies.get("token");
  req.headers.Authorization = "Bearer " + token;
};

const apiNotSecured = new Axios(config);
apiNotSecured.interceptors.response.use((res) => {
  res.data = JSON.parse(res.data);
  return res;
});

const apiAuth = new Axios(config);

apiAuth.interceptors.request.use(async (req) => {
  const data = req.data;
  const sessionKey = generateSessionKey();
  Cookies.set("sessionKey", sessionKey, {
    secure: true,
    sameSite: "strict",
  });
  let serverPublicKey = Cookies.get("serverPublicKey");
  if (!serverPublicKey) {
    serverPublicKey = (await apiNotSecured.get("/key/public-key")).data
      .publicKey;
    Cookies.set("serverPublicKey", serverPublicKey!, {
      secure: true,
      sameSite: "strict",
    });
  }

  const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
  const keys = jsEncrypt.getKey();
  Cookies.set("clientPrivateKey", keys.getPrivateKey(), {
    secure: true,
    sameSite: "strict",
  });
  data.publicKey = keys.getPublicKey();
  data.sessionKey = sessionKey;

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
  const clientPrivateKey = Cookies.get("clientPrivateKey");

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

  return res;
});

const api = new Axios(config);

api.interceptors.request.use((req) => {
  setToken(req);
  const data = req.data;

  if (data) {
    const sessionKey = Cookies.get("sessionKey")!;
    const clientPrivateKey = Cookies.get("clientPrivateKey")!;
    const newData = JSON.stringify(data);

    const hash = CryptoJS.SHA256(newData).toString(CryptoJS.enc.Hex);
    const signer = new JSEncrypt();

    signer.setPrivateKey(clientPrivateKey);
    const signature = signer.sign(hash, (str: string) => str, "SHA256");
    const encryptedData = CryptoJS.TripleDES.encrypt(newData, sessionKey, {
      mode: CryptoJS.mode.ECB,
    }).toString();

    if (signature === false) {
      throw new Error("Failed to sign data");
    }

    req.data = JSON.stringify({ encryptedData, signature });
  }
  return req;
});

api.interceptors.response.use((res) => {
  const data = JSON.parse(res.data);

  const { encryptedData, signature } = data;
  if (encryptedData) {
    const sessionKey = Cookies.get("sessionKey")!;
    const decryptedData = CryptoJS.TripleDES.decrypt(
      encryptedData,
      sessionKey,
      {
        mode: CryptoJS.mode.ECB,
      }
    ).toString(CryptoJS.enc.Utf8);

    const serverPublicKey = Cookies.get("serverPublicKey")!;

    const hash = CryptoJS.SHA256(decryptedData).toString(CryptoJS.enc.Hex);

    const verifier = new JSEncrypt();
    verifier.setPublicKey(serverPublicKey);

    const isValid = verifier.verify(hash, signature, (str: string) => str);

    if (!isValid) {
      throw new Error("Invalid Signature");
    }

    res.data = JSON.parse(decryptedData);

    return res;
  } else {
    throw new Error(data.error ?? data.message ?? data.errors ?? "no data");
  }
});

export { apiAuth, api };
