const HASH_SIZE = 8;

export async function hashContent(buffer: ArrayBuffer) {
  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Buffer.from(hash).toString("hex").slice(0, HASH_SIZE);
}
