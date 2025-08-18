import { readdir, readFile } from "fs/promises";
import { lexer, type Context } from "./lexer";

const ROOT = "src/content";

const files = await readdir(ROOT);
export const content: Context[] = [];

for (const file of files) {
  const path = `${ROOT}/${file}`;
  const source = await readFile(path, "utf-8");
  const context = await lexer(path, source);

  content.push(context);
}
