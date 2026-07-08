export const STAFF_AUTH_COOKIE = "staff_auth";

export async function staffAuthToken(): Promise<string> {
  const pin = process.env.STAFF_PIN ?? "";
  const data = new TextEncoder().encode(`rusagro-staff:${pin}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
