# Deploying the Cosmolix Offer Letter app (free tiers)

This is a **Vite + React SPA** with client-side routing (`react-router-dom`). Static hosts must **rewrite all routes to `index.html`** so `/verify/...` works on refresh.

Build output: **`dist/`**  
Install/build (from this folder):

```bash
npm ci
npm run build
```

---

## Path prefix (`VITE_BASE_URL`)

- **Root domain** (e.g. `https://my-app.vercel.app/`): leave **`VITE_BASE_URL`** unset or empty in `.env.production`.
- **GitHub Pages project site** (e.g. `https://user.github.io/my-repo/`): set  

  `VITE_BASE_URL=/my-repo/`

  Then build: the QR codes and assets will use the correct `/my-repo/` prefix.

Create `.env.production` locally (do not commit secrets; base path is not secret):

```env
VITE_BASE_URL=/your-repo-name/
```

---

## Vercel (free)

1. Push the `cosmolix-offer-letter-system` folder to GitHub/GitLab/Bitbucket (or deploy with Vercel CLI).
2. In Vercel: **New Project** → import repo → set **Root Directory** to `cosmolix-offer-letter-system` if the repo contains multiple folders.
3. **Build Command:** `npm run build`  
   **Output Directory:** `dist`
4. The included **`vercel.json`** adds SPA rewrites. Deploy.

Environment variables: add **`VITE_BASE_URL`** only if the site is served under a subpath (unusual on Vercel’s default URL).

---

## Netlify (free)

1. **New site from Git** → same root directory note as above.
2. **Build command:** `npm run build`  
   **Publish directory:** `dist`
3. The included **`netlify.toml`** sets SPA redirects. The **`public/_redirects`** file is also copied into `dist` by Vite for Netlify.

---

## Cloudflare Pages (free)

1. Connect the repo; **Build command:** `npm run build`  
   **Build output directory:** `dist`
2. **Workers / Pages** → your project → **Settings** → **Build** → add a **Single Page Application** rule (or **Redirects**): send `/*` to `/index.html` with **200** (not 301).  
   (Wording varies; goal is SPA fallback.)

---

## GitHub Pages (free)

GitHub Pages serves from `https://<user>.github.io/<repo>/` for project sites, so you **must** set a base path.

1. In `cosmolix-offer-letter-system`, create `.env.production`:

   ```env
   VITE_BASE_URL=/YourRepoName/
   ```

   Use your **exact** repository name, case-sensitive, with leading and trailing slashes as shown.

2. Build and deploy `dist` to the `gh-pages` branch (e.g. with `npm install gh-pages --save-dev` and a `deploy` script), or use **GitHub Actions** to run `npm ci && npm run build` and upload `dist`.

3. In the repo **Settings → Pages**: source = branch/folder you use for static files.

---

## Replace branding PNGs

Put your files here (names must match imports):

| File | Purpose |
|------|---------|
| `src/assets/logo/logo.png` | Company logo |
| `src/assets/stamps/stamp2.png` | Seal / stamp (imported in `OfferLetter.jsx`; to use `stamp1.png` instead, change the import path) |
| `src/assets/signatures/signature.png` | Signature image |

Use **PNG with transparent background** where possible. After swapping files, run `npm run build` to verify.

---

## Post-deploy checklist

- Open the live URL and confirm the **dashboard** loads.
- Fill the form and open a **verification** link from the QR target URL (copy from browser devtools if needed).
- **Export PDF** once and confirm download works over **HTTPS** (required for some browsers’ download APIs).

If verification links 404 on refresh, the host’s SPA rewrite is missing—fix redirects per sections above.
