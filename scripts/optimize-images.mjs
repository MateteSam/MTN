import sharp from 'sharp';
import fs from 'fs';

async function ensureDir(path) {
  const dir = path.split('/').slice(0, -1).join('/');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processImage(srcPath, baseName, sizes) {
  const meta = await sharp(srcPath).metadata();
  const { width = 1920, height = 1080 } = meta;
  console.log(`Processing ${srcPath} (detected ${width}x${height})`);

  // 1x (original) - avif & webp
  await sharp(srcPath)
    .avif({ quality: 60 })
    .toFile(`public/${baseName}.avif`);
  await sharp(srcPath)
    .webp({ quality: 80 })
    .toFile(`public/${baseName}.webp`);

  // 2x - scale up to double width but cap to 3840 to avoid huge files
  const w2 = Math.min(width * 2, 3840);
  await sharp(srcPath)
    .resize({ width: w2 })
    .avif({ quality: 50 })
    .toFile(`public/${baseName}@2x.avif`);
  await sharp(srcPath)
    .resize({ width: w2 })
    .webp({ quality: 70 })
    .toFile(`public/${baseName}@2x.webp`);

  console.log(`Wrote public/${baseName}.{avif,webp,@2x.*}`);
}

(async () => {
  try {
    // Desktop banner
    await processImage('public/banner.png', 'banner');

    // Mobile banner - use provided mobile.png if present
    if (fs.existsSync('public/mobile.png')) {
      await processImage('public/mobile.png', 'mobile');
    } else {
      console.warn('public/mobile.png not found — skipping mobile variant');
    }

    console.log('Image optimization finished');
  } catch (err) {
    console.error('Image processing error', err);
    process.exit(1);
  }
})();