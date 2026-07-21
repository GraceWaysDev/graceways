import { readFile, writeFile } from "node:fs/promises";

const [html, css, js, heroImage] = await Promise.all([
  readFile("index.html", "utf8"),
  readFile("styles.css", "utf8"),
  readFile("app.js", "utf8"),
  readFile("assets/graceways-water-animals.jpg")
]);

const heroImageData = `data:image/jpeg;base64,${heroImage.toString("base64")}`;

const bundledCss = css.replaceAll(
  "assets/graceways-water-animals.jpg",
  heroImageData
);

const standalone = html
  .replace('<link rel="stylesheet" href="styles.css">', `<style>\n${bundledCss}\n</style>`)
  .replace('src="assets/graceways-water-animals.jpg"', `src="${heroImageData}"`)
  .replace('<script src="app.js"></script>', `<script>\n${js}\n</script>`);

await writeFile("GraceWays-Universalmaske.html", standalone, "utf8");
