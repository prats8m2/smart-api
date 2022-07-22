import CryptoJS from "crypto-js";

const DECRYPT = (encrypted: string) => {
  //get the master secret key
  const KEY =
    process.env.MASTER_SECRET_KEY ||
    "QUtJQTZITlYy02NVBBb1JONytHVnd1UGZhK0FEYUV5";
  return CryptoJS.AES.decrypt(encrypted, KEY).toString(CryptoJS.enc.Utf8);
};

export default DECRYPT;
