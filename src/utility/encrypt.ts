import CryptoJS from "crypto-js";

const ENCRYPT = (decrypted: string) => {
  //get the master secret key
  const KEY =
    process.env.MASTER_SECRET_KEY ||
    "QUtJQTZITlYy02NVBBb1JONytHVnd1UGZhK0FEYUV5";
  return CryptoJS.AES.encrypt(decrypted, KEY).toString();
};

export default ENCRYPT;
