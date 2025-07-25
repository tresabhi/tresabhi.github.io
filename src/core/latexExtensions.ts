import type { TokenizerAndRendererExtension } from "marked";

export interface LatexBlockToken {
  type: "latex_block";
  raw: string;
  formula: string;
}

export interface LatexInlineToken extends Omit<LatexBlockToken, "type"> {
  type: "latex_inline";
}

export const latexBlockExtension = {
  name: "latex_block",
  level: "block",

  start(src: string) {
    return src.match(/\$\$[^\$]/)?.index ?? -1;
  },

  tokenizer(src: string) {
    const match = /^\$\$([^\$]+)\$\$/.exec(src);

    if (match) {
      return {
        type: "latex_block",
        raw: match[0],
        formula: match[1],
      } satisfies LatexBlockToken;
    }
  },
} satisfies TokenizerAndRendererExtension;

export const latexInlineExtension = {
  name: "latex_inline",
  level: "inline",

  start(src) {
    return src.match(/\$[^\$]/)?.index ?? -1;
  },

  tokenizer(src: string) {
    const match = /^\$([^\$]+)\$/.exec(src);

    if (match) {
      return {
        type: "latex_inline",
        raw: match[0],
        formula: match[1],
      } satisfies LatexInlineToken;
    }
  },
} satisfies TokenizerAndRendererExtension;
