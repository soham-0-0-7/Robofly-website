import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = process.env.SECRET_KEY || "fallback-secret-key";

// Convert the secret key to a buffer of correct length (32 bytes for aes-256)
const key = crypto
  .createHash("sha256")
  .update(String(secretKey))
  .digest("base64")
  .substring(0, 32);

export const encrypt = (text: string): string => {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  } catch (error) {
    console.error("Encryption error:", error);
    // Return original text if encryption fails
    return text;
  }
};

export const decrypt = (hash: string): string => {
  // Debug logging
  console.log("Attempting to decrypt:", hash);
  
  // Check if the hash contains the IV separator - if not, it might be a plain password
  if (!hash || !hash.includes(":")) {
    console.log("Warning: Attempted to decrypt a non-encrypted password");
    return hash; // Return the original string if it's not in encrypted format
  }

  try {
    const [ivHex, encryptedHex] = hash.split(":");
    console.log("IV Hex:", ivHex);
    console.log("Encrypted Hex:", encryptedHex);
    
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]);

    const result = decrypted.toString();
    console.log("Decryption successful, result:", result);
    return result;
  } catch (error) {
    console.error("Decryption error:", error);
    // Return the original hash in case of error
    return hash;
  }
};

// Helper function to check if a password is encrypted
export const isEncrypted = (text: string): boolean => {
  if (!text) return false;
  
  const result = text.includes(":") && text.split(":").length === 2;
  console.log(`isEncrypted check for '${text.substring(0, 10)}...': ${result}`);
  return result;
};