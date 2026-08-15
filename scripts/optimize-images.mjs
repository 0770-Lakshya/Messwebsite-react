// Converts every JPG/PNG under public/images to .webp (same pixel dimensions),
// then removes the original raster file. Run: node scripts/optimize-images.mjs
import { readdir, stat, rm } from 'node:fs/promises'
import { join, extname, dirname, basename } from 'node:path'
import sharp from 'sharp'

const ROOT = join(process.cwd(), 'public', 'images')
const RASTER = new Set(['.jpg', '.jpeg', '.png'])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else if (RASTER.has(extname(entry.name).toLowerCase())) {
      yield full
    }
  }
}

let converted = 0
let saved = 0

for await (const file of walk(ROOT)) {
  const webpPath = join(dirname(file), basename(file, extname(file)) + '.webp')

  // Keep original dimensions — never resize.
  await sharp(file).webp({ quality: 82 }).toFile(webpPath)

  const before = (await stat(file)).size
  const after = (await stat(webpPath)).size
  await rm(file)

  converted += 1
  saved += before - after
  const pct = before > 0 ? Math.round(((before - after) / before) * 100) : 0
  console.log(`${pct}%  ${basename(file)} -> ${basename(webpPath)}  (${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`)
}

console.log(`\nConverted ${converted} images, saved ${(saved / 1024 / 1024).toFixed(1)} MB total.`)
