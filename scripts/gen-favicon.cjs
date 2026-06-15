// Génère les icônes du site à partir du monogramme (book + plume).
// Usage : node scripts/gen-favicon.cjs  — puis supprimable.
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "images", "logo-monogram.webp");
const APP = path.join(__dirname, "..", "src", "app");

// ensureAlpha() force un PNG RGBA 32 bits (requis par le décodeur ICO de Turbopack,
// sinon sharp encode l'image N&B en niveaux de gris/palette → build error).
async function png(size) {
  return sharp(SRC).resize(size, size, { fit: "cover" }).ensureAlpha().png({ palette: false }).toBuffer();
}

// Construit un .ico multi-tailles avec des entrées PNG (supporté par tous les navigateurs modernes).
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  const datas = [];
  entries.forEach((e, i) => {
    const b = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 0); // width
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, b + 1); // height
    dir.writeUInt8(0, b + 2); // palette
    dir.writeUInt8(0, b + 3); // reserved
    dir.writeUInt16LE(1, b + 4); // color planes
    dir.writeUInt16LE(32, b + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, b + 8); // size of data
    dir.writeUInt32LE(offset, b + 12); // offset
    offset += e.data.length;
    datas.push(e.data);
  });
  return Buffer.concat([header, dir, ...datas]);
}

(async () => {
  // Icône moderne + apple touch icon (conventions Next.js App Router)
  await sharp(SRC).resize(512, 512, { fit: "cover" }).ensureAlpha().png({ palette: false }).toFile(path.join(APP, "icon.png"));
  await sharp(SRC).resize(180, 180, { fit: "cover" }).ensureAlpha().png({ palette: false }).toFile(path.join(APP, "apple-icon.png"));

  // favicon.ico multi-tailles (16/32/48)
  const sizes = [16, 32, 48];
  const entries = [];
  for (const s of sizes) entries.push({ size: s, data: await png(s) });
  fs.writeFileSync(path.join(APP, "favicon.ico"), buildIco(entries));

  console.log("OK → icon.png (512), apple-icon.png (180), favicon.ico (16/32/48)");
})().catch((e) => { console.error(e); process.exit(1); });
