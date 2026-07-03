<p align="center" width="100%">
    <img src="https://github.com/crappyrules/gondolasite/blob/master/assets/banner.jpg">
</p>

# Gondola

https://gondola.lol

A static landing page for the GONDOLA token — plain HTML, hand-written CSS, and vanilla JavaScript. There is no framework and no build step.

## Project layout

- `index.html` — the entire page
- `css/` — `base.css` (shared reset, design tokens, fonts, animations, scroll-reveal helpers) plus one stylesheet per section (`hero`, `links`, `about`, `tokens`, `community`)
- `js/` — `app.js` (scroll reveals, contract-address copy, video playback) and `image-diagnostics.js`
- `assets/` — images, SVGs, and video
- root static files — `favicon.ico`, `logo192.png`, `logo512.png`, `manifest.json`, `robots.txt`, `ordinarygondola.png`
- `nginx.conf` — Nginx server config (gzip, cache headers, security rules, SPA fallback)

## Preview locally

No tooling required — serve the folder with any static file server:

```bash
python3 -m http.server 8099
```

Then open http://localhost:8099.

## Deploy

### Option A — bind-mount into an Nginx container (no image build)

Clone the repo on the server and mount it into a stock Nginx container:

```bash
git clone https://github.com/crappyrules/gondolasite.git
cd gondolasite
docker run -d --name gondola-site -p 80:80 \
  -v "$PWD:/usr/share/nginx/html:ro" \
  -v "$PWD/nginx.conf:/etc/nginx/conf.d/default.conf:ro" \
  nginx:1.23-alpine
```

Pull updates with `git pull` and the container serves the new files immediately — no rebuild. `nginx.conf` denies dotfiles, so the bind-mounted `.git` directory is not served.

### Option B — self-contained image

```bash
docker build -t gondola-site .
docker run -d -p 80:80 --name gondola-site gondola-site
```

Pushing to `master` also builds this image and publishes it to GHCR via `.github/workflows/container.yml`.
