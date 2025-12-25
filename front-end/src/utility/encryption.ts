import CryptoJS from "crypto-js";
import * as crypto from "crypto";

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || "company";

export const encryptId = (id: string | number): string => {
  const stringId = id?.toString() || "";
  if (!stringId) return "";
  const encrypted = CryptoJS.AES.encrypt(stringId, SECRET_KEY);
  // Make URL safe
  return encrypted
    .toString()
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const decryptId = (encryptedId: string): string => {
  if (!encryptedId) return "";
  // Restore from URL safe format
  const restored = encryptedId.replace(/-/g, "+").replace(/_/g, "/");
  const decrypted = CryptoJS.AES.decrypt(restored, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const EncryptPassword = (password: string, key: string): string => {
  try {
    const secretKey = crypto.createHash("sha256").update(key).digest();
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      secretKey,
      Buffer.alloc(16, 0)
    );
    let encrypted = cipher.update(password, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
