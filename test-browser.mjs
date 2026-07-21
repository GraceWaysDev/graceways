import fs from "node:fs";
import vm from "node:vm";
import { Window } from "happy-dom";

const html = fs.readFileSync("index.html", "utf8");
const body = html.match(/<body>([\s\S]*)<script src="app\.js"><\/script>[\s\S]*<\/body>/)?.[1];
if (!body) throw new Error("Could not extract document body");

const window = new Window({ url: "http://graceways.test" });
window.document.body.innerHTML = body;
Object.assign(globalThis, {
  window,
  document: window.document,
  localStorage: window.localStorage,
  confirm: () => true
});
let copiedText = "";
Object.defineProperty(globalThis, "navigator", {
  configurable: true,
  value: { clipboard: { writeText: async value => { copiedText = value; } } }
});

const app = fs.readFileSync("app.js", "utf8") + "\n;globalThis.__gracewaysTest={makeZip,markdown,values,applyData,demo,mediaPath};";
vm.runInThisContext(app, { filename: "app.js" });

document.querySelector("#loadDemo").click();
if (document.querySelectorAll(".form-section").length !== 11) throw new Error("Universal form sections missing");
if (document.querySelector("#previewTitle").textContent !== "Sissi") throw new Error("Demo profile did not load");
if (document.querySelector("#id").value !== "EL-SC-BC-007") throw new Error("Automatic profile ID failed");
for (const id of ["image_uploadDropZone", "video_uploadDropZone", "audio_uploadDropZone"]) if (!document.querySelector(`#${id}`)) throw new Error(`Missing drop zone ${id}`);

document.querySelector("#copyMarkdown").click();
await new Promise(resolve => setTimeout(resolve, 0));
if (copiedText !== document.querySelector("#markdownPreview").textContent) throw new Error("Markdown clipboard copy failed");
if (!document.querySelector("#copyMarkdown").textContent.includes("Kopiert")) throw new Error("Clipboard confirmation missing");

const usedMediaPaths = new Set();
const duplicatePathOne = globalThis.__gracewaysTest.mediaPath("Sissi Bild.jpg", "image", usedMediaPaths);
const duplicatePathTwo = globalThis.__gracewaysTest.mediaPath("Sissi Bild.jpg", "image", usedMediaPaths);
if (duplicatePathOne !== "images/sissi-bild.jpg") throw new Error(`Unexpected first media path: ${duplicatePathOne}`);
if (duplicatePathTwo !== "images/sissi-bild-2.jpg") throw new Error(`Duplicate media path was not made unique: ${duplicatePathTwo}`);

const files = [
  { name: "sissi.md", data: new TextEncoder().encode(globalThis.__gracewaysTest.markdown(globalThis.__gracewaysTest.values())) },
  { name: duplicatePathOne, data: new Uint8Array([1, 2, 3, 4]) },
  { name: duplicatePathTwo, data: new Uint8Array([5, 6, 7, 8]) }
];
const zip = globalThis.__gracewaysTest.makeZip(files);
fs.writeFileSync("test-export.zip", new Uint8Array(await zip.arrayBuffer()));
console.log(JSON.stringify({ sections: 11, profile: "Sissi", id: "EL-SC-BC-007", dropZones: 3, clipboard: "passed", duplicateMediaPaths: [duplicatePathOne, duplicatePathTwo], zipBytes: zip.size }));
