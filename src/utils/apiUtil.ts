import { Axios, InternalAxiosRequestConfig } from "axios";
import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

import { generateSessionKey } from ".";

// تكوين الإعدادات الأساسية لAxios
const config = {
  baseURL: "https://localhost:3000", // العنوان الأساسي للapis
  headers: {
    "Content-Type": "application/json", // تحديد نوع المحتوى كـ JSON
  },
};

// تابع لإضافة التوكين إلى الطلب
const setToken = (req: InternalAxiosRequestConfig) => {
  const token = Cookies.get("token"); // استرجاع الرمز من الكوكيز
  req.headers.Authorization = "Bearer " + token; // إضافة الرمز إلى الترويسة
};

// إنشاء كائن Axios للطلبات غير المؤمنة (غير محمية)
// (لطلب المفتاح العام للسيرفر)
const apiNotSecured = new Axios(config);
apiNotSecured.interceptors.response.use((res) => {
  res.data = JSON.parse(res.data); // تحويل البيانات المستلمة إلى JSON
  return res;
});

// إنشاء كائن Axios للطلبات المؤمنة (المحمية)
const apiAuth = new Axios(config);

// إضافة إعدادات للطلبات الصادرة في الواجهة المؤمنة
apiAuth.interceptors.request.use(async (req) => {
  const data = req.data;

  // إنشاء مفتاح الجلسة وتخزينه في الكوكيز
  const sessionKey = generateSessionKey();
  Cookies.set("sessionKey", sessionKey, {
    secure: true, // تأمين الكوكيز
    sameSite: "strict", // منع الاستخدام عبر مواقع أخرى من أجل زيادة الأمان
  });

  // جلب المفتاح العام من الخادم أو الكوكيز
  let serverPublicKey = Cookies.get("serverPublicKey");
  if (!serverPublicKey) {
    serverPublicKey = (await apiNotSecured.get("/key/public-key")).data
      .publicKey;
    Cookies.set("serverPublicKey", serverPublicKey!, {
      secure: true,
      sameSite: "strict",
    });
  }

  // إنشاء مفاتيح RSA وتخزين المفتاح الخاص في الكوكيز
  const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
  const keys = jsEncrypt.getKey();
  Cookies.set("clientPrivateKey", keys.getPrivateKey(), {
    secure: true,
    sameSite: "strict",
  });

  // إضافة المفتاح العام ومفتاح الجلسة إلى البيانات
  data.publicKey = keys.getPublicKey();
  data.sessionKey = sessionKey;

  const newData = JSON.stringify(data);
  jsEncrypt.setPublicKey(serverPublicKey!);

  // تشفير البيانات باستخدام المفتاح العام للخادم على شكل أجزاء صغيرة
  const encryptedData = [];
  for (let i = 0; i <= Math.floor(newData.length / 100); i++) {
    const str = newData.slice(i * 100, (i + 1) * 100);
    const encStr = jsEncrypt.encrypt(str);
    if (encStr === false) {
      throw new Error("error while encryption data.");
    }
    encryptedData.push(encStr);
  }

  // استبدال البيانات الأصلية بالبيانات المشفرة
  req.data = JSON.stringify({ encryptedData });

  return req;
});

// إضافة تابع للريسبونس الواردة في الواجهة المؤمنة
apiAuth.interceptors.response.use((res) => {
  const data = JSON.parse(res.data);
  const { encryptedData } = data;

  const jsEncrypt = new JSEncrypt({ default_key_size: "2048" });
  const clientPrivateKey = Cookies.get("clientPrivateKey");
  jsEncrypt.setPrivateKey(clientPrivateKey!);

  // فك تشفير البيانات الواردة باستخدام المفتاح الخاص للعميل
  const decryptedData = [];
  for (const chunk of encryptedData) {
    const decStr = jsEncrypt.decrypt(chunk);
    if (decStr === false) {
      throw new Error("error while encryption data.");
    }
    decryptedData.push(decStr);
  }

  res.data = JSON.parse(decryptedData.join("")); // تحويل البيانات المفكوك تشفيرها إلى JSON
  return res;
});

// إنشاء واجهة Axios أخرى لمعالجة الطلبات المؤمنة بالرمز الرقمي
const api = new Axios(config);

// إضافة معترض للطلبات الصادرة
api.interceptors.request.use((req) => {
  setToken(req); // تعيين توكين في الطلب
  const data = req.data;

  if (data) {
    const sessionKey = Cookies.get("sessionKey")!;
    const clientPrivateKey = Cookies.get("clientPrivateKey")!;
    const newData = JSON.stringify(data);

    // إنشاء توقيع رقمي للبيانات
    const hash = CryptoJS.SHA256(newData).toString(CryptoJS.enc.Hex);
    const signer = new JSEncrypt();
    signer.setPrivateKey(clientPrivateKey);
    const signature = signer.sign(hash, (str: string) => str, "SHA256");

    // تشفير البيانات باستخدام Triple DES
    const encryptedData = CryptoJS.TripleDES.encrypt(newData, sessionKey, {
      mode: CryptoJS.mode.ECB,
    }).toString();

    if (signature === false) {
      throw new Error("Failed to sign data");
    }

    req.data = JSON.stringify({ encryptedData, signature }); // إرسال البيانات المشفرة والتوقيع
  }
  return req;
});

// إضافة تابع للريسبونس الواردة
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

    // التحقق من صحة التوقيع الرقمي باستخدام المفتاح العام للخادم
    const verifier = new JSEncrypt();
    verifier.setPublicKey(serverPublicKey);
    const isValid = verifier.verify(hash, signature, (str: string) => str);

    if (!isValid) {
      throw new Error("Invalid Signature");
    }

    res.data = JSON.parse(decryptedData); // تحويل البيانات المفكوكة إلى JSON
    return res;
  } else {
    throw new Error(data.error ?? data.message ?? data.errors ?? "no data");
  }
});

export { apiAuth, api };
