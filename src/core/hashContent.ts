const HASH_SIZE = 8;

export async function hashContent(src: string | ArrayBuffer) {
  let buffer: ArrayBuffer;

  if (typeof src === "string") {
    const response = await fetch(src);
    buffer = await response.arrayBuffer();
  } else buffer = src;

  const hash = await crypto.subtle.digest("SHA-256", buffer);
  return Buffer.from(hash).toString("hex").slice(0, HASH_SIZE);
}
