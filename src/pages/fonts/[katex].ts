import type { APIContext, GetStaticPaths } from "astro";
import { readFile } from "fs/promises";

const glob = import.meta.glob("../../../node_modules/katex/dist/fonts/*");

export const getStaticPaths: GetStaticPaths = async () => {
  return Object.keys(glob).map((key) => ({
    params: {
      katex: key.replace("../../../node_modules/katex/dist/fonts/", ""),
    },
    props: {
      path: key.replace("../../../", ""),
    },
  }));
};

export async function GET({ props }: APIContext<{ path: string }>) {
  const buffer = await readFile(props.path);
  return new Response(buffer);
}
