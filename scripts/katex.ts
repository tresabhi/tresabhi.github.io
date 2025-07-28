const SOURCE = "node_modules/katex/dist";
const TARGET = "public";

const fonts = new Bun.Glob("*").scan(`${SOURCE}/fonts`);

for await (const font of fonts) {
  const file = Bun.file(`${SOURCE}/fonts/${font}`);
  await Bun.write(`${TARGET}/fonts/${font}`, file);
}

const styles = await Bun.file(`${SOURCE}/katex.min.css`)
  .text()
  .then((text) => text.replaceAll("url(fonts/", `url(/fonts/`));
await Bun.write(`${TARGET}/styles/katex.css`, styles);

export {};
