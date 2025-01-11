import { Axios } from "axios";
import { JSEncrypt } from "jsencrypt";

const api = new Axios({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((req) => {
  const data = req.data;
  req.data = JSON.stringify(data);
  req.headers.Authorization = "Bearer " + localStorage.getItem("token");
  //  const clientPrivateKey = localStorage.getItem("clientPrivateKey");
  //  const decryptor = new JSEncrypt();
  //  decryptor.setPrivateKey(clientPrivateKey!);
  //  const newData = decryptor.decrypt(data);
  //  if (newData === false) {
  //    throw new Error("Cannot decrypt data.");
  //  }
  //  req.data = newData;
  return req;
});
//
//api.interceptors.response.use((req) => {
//  const data = req.data;
//  const serverPublicKey = localStorage.getItem("serverPublicKey");
//  const encryptor = new JSEncrypt();
//  encryptor.setPublicKey(serverPublicKey!);
//  const newData = encryptor.encrypt(data);
//  if (newData === false) {
//    throw new Error("Cannot encrypt data.");
//  }
//  req.data = newData;
//  return req;
//});

export { api };
