import { createRequire } from 'module';
import { readFileSync } from 'fs';
const req = createRequire(import.meta.url);
const puppeteer = req('C:/Users/ajsta/AppData/Local/Temp/node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js');

// Encode shield logo as base64 so the standalone HTML can use it
const shieldB64 = readFileSync('./brand_assets/pcs_logo_shield.png').toString('base64');
const logoSrc = `data:image/png;base64,${shieldB64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Cinzel:wght@400;600&family=Lora:ital@0;1&display=swap" rel="stylesheet"/>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #1B4332;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    position: relative;
  }
  /* Grain texture */
  body::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    opacity: 0.35;
    pointer-events: none;
  }
  /* Vignette */
  body::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
    pointer-events: none;
  }
  /* Gold border frame */
  .frame {
    position: absolute; inset: 20px;
    border: 1.5px solid rgba(201,168,76,0.35);
    pointer-events: none;
  }
  .frame-corner {
    position: absolute; width: 24px; height: 24px;
    border-color: #C9A84C; border-style: solid; border-width: 0;
  }
  .frame-corner.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
  .frame-corner.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
  .frame-corner.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
  .frame-corner.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }

  .card {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center;
    gap: 0;
    text-align: center;
  }
  .logo {
    width: 170px; height: 170px;
    object-fit: contain;
    filter: drop-shadow(0 6px 24px rgba(0,0,0,0.5));
    margin-bottom: 28px;
  }
  .eyebrow {
    font-family: 'Cinzel', serif;
    font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 14px;
  }
  .title {
    font-family: 'Playfair Display', serif;
    font-size: 64px; font-weight: 800; line-height: 1.05;
    color: #F5EDD8;
    text-shadow: 0 2px 24px rgba(0,0,0,0.4);
    margin-bottom: 18px;
  }
  .divider {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 18px;
  }
  .divider-line { width: 90px; height: 1px; background: #C9A84C; opacity: 0.6; }
  .divider-diamond {
    width: 6px; height: 6px; background: #C9A84C;
    transform: rotate(45deg);
  }
  .tagline {
    font-family: 'Lora', serif;
    font-size: 19px; font-style: italic;
    color: rgba(245,237,216,0.78);
    letter-spacing: 0.01em;
    max-width: 560px;
    line-height: 1.55;
  }
  .location {
    margin-top: 22px;
    font-family: 'Cinzel', serif;
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(201,168,76,0.7);
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="frame-corner tl"></div>
    <div class="frame-corner tr"></div>
    <div class="frame-corner bl"></div>
    <div class="frame-corner br"></div>
  </div>
  <div class="card">
    <img class="logo" src="${logoSrc}" alt="PC's Paddock shield logo" />
    <div class="eyebrow">Est. 2007 · Poughkeepsie, NY</div>
    <div class="title">PC's Paddock</div>
    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-diamond"></div>
      <div class="divider-line"></div>
    </div>
    <div class="tagline">Upscale comfort food in a renovated 1840s barn.<br>Award-winning wings &amp; onsite smoker.</div>
    <div class="location">273 Titusville Rd · 845-454-4930</div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/ajsta/.cache/puppeteer/chrome/win64-146.0.7680.66/chrome-win64/chrome.exe',
  args: ['--no-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: 'brand_assets/social_preview.png' });
await browser.close();
console.log('saved brand_assets/social_preview.png');
