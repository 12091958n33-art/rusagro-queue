import { createHash } from "node:crypto";

export const STAFF_AUTH_COOKIE = "staff_auth";

export function staffAuthToken(): string {
  const pin = process.env.STAFF_PIN ?? "";
  return createHash("sha256").update(`rusagro-staff:${pin}`).digest("hex");
}
