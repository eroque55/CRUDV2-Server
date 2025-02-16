import crypto from "crypto";

export default function encryptPassword(password: string): string {
   return crypto.createHash("sha256").update(password).digest("hex");
}
