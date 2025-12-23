Performance recommendations and quick wins

✅ Caching & CDN
- Use a CDN (Cloudflare / Fastly / CloudFront) for static assets.
- For fingerprinted assets and static images (AVIF/WebP/PNG/JPG/MP4), set: `Cache-Control: public, max-age=31536000, immutable`.
- For HTML (index.html), set `Cache-Control: public, max-age=0, must-revalidate` or `no-cache` so browsers fetch latest HTML but can still cache assets.
- Netlify: the included `netlify.toml` demonstrates header rules. Vercel: use `vercel.json` or `headers` in `vercel` platform settings.

✅ Images
- Prefer AVIF/WebP for modern browsers (already added via `scripts/optimize-images.mjs`).
- Preload LCP image using AVIF and `imagesrcset` (done in `index.html`).
- Generate mobile variants and serve via `<picture>` with `sizes` and correct `srcset` (done in `Hero.tsx`).
- Consider an image CDN (imgix/Cloudinary/Thumbor/Imgproxy) for on-the-fly resizing and modern formats.

✅ JavaScript / Bundling
- Code-split large components (Book3D split to its own chunk via `React.lazy` + `IntersectionObserver`).
- Keep main bundle small (consider replacing heavy libraries or using lighter alternatives if needed).

✅ Media
- Defer or lazy-load videos, use `preload="none"` and poster images to avoid LCP regressions (done for `/3D.mp4`).
- Replace autoplaying large videos with lightweight animated placeholders where possible.

✅ Next steps / Monitoring
- Run Lighthouse (or WebPageTest) and measure LCP, FCP, TBT; iterate on the top blocking assets.
- Add automated performance checks in CI (Lighthouse CI) and budget thresholds.

If you want, I can implement any of the above next (e.g., inline critical CSS, add a `vercel.json`, or set up Lighthouse CI).