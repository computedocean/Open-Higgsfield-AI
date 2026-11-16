# Deploy Open Higgsfield AI

This fork has two front ends. Vercel should run the **Next.js studio** (`npm run build`). That is the Open Higgsfield image, video, lip-sync, and cinema UI. The Vite app (`npm run vite:dev`) is the separate MATAI client and stays behind a content-factory sign-in.

## What you are deploying

- **Framework:** Next.js 15 (App Router) and React 19
- **Styling:** Tailwind CSS v4, compiled with `@tailwindcss/postcss`
- **Shared UI:** `packages/studio` (npm workspace `studio`)
- **Build command:** `npm run build` (`next build`)
- **Output:** Next.js default (`.next`). Do not set a static `dist` output directory.
- **Install command:** `npm ci`
- **Node:** 18 or newer (this repo was verified on Node 22)

`vercel.json` already sets the framework, install command, and build command so Vercel does not pick the Vite app instead.

## API key

No API key is required to build the site or to open the UI.

The studio is bring-your-own-key. The first screen asks for a **kie.ai** API key, saves it in the browser as `kie_key`, and sends it from the browser to `https://api.kie.ai` as `Authorization: Bearer <key>`.

That is client-side on purpose. Do not put the key in `NEXT_PUBLIC_*` or `VITE_*`. Those are copied into the JavaScript bundle.

This fork does **not** call muapi.ai. The original Open Higgsfield project did. A muapi.ai key will not work here. Create a kie.ai key at [https://kie.ai/api-key](https://kie.ai/api-key) and paste it into the app after deploy. Nothing in the repository should contain that key.

## Deploy on Vercel

1. Push this branch and open [https://vercel.com/new](https://vercel.com/new).
2. Import the GitHub repository `computedocean/Open-Higgsfield-AI`.
3. Framework preset: **Next.js**. If the form is blank, the committed `vercel.json` supplies it.
4. Leave these settings as they are (they match `vercel.json`):
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: empty (Next.js default)
   - Root directory: repository root
5. Environment variables: **none** for the studio. Do not add the kie.ai key. See `.env.example` for the optional Netlify content-factory variables, which this Next.js deploy does not read.
6. Deploy. Open the site. You should land on `/studio` and see the API key screen. Paste a kie.ai key to open Image, Video, Lip Sync, and Cinema.

Production URLs are served by Vercel. Generation requests go from the visitor's browser straight to `https://api.kie.ai`, so the browser must be allowed to call that host (kie.ai CORS). The app does not proxy those calls.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `/` redirects to `/studio`.

Production mode, closer to Vercel:

```bash
npm ci
npm run build
npm run start
```

Again open [http://localhost:3000](http://localhost:3000).

## MATAI / Vite client (not the Vercel app)

```bash
npm run vite:dev
```

Dev server: [http://localhost:5173](http://localhost:5173).

`npm run vite:build` writes a static site to `dist/`. Netlify already builds that via `netlify.toml`. The page does not show the studios until `/.netlify/functions/session` accepts a content-factory account. Those functions need the server variables listed in `.env.example` (`COMPOSIO_API_KEY`, `AUTOM8_AIRTABLE_BASE_ID`, `MATAI_SESSION_SECRET`, and the account's own kie.ai key stored in Airtable). Set those in the host's dashboard. Do not commit them.

## What you still do yourself

- Import the repo in Vercel and click Deploy (the agent cannot attach your Vercel account).
- Create a kie.ai API key and enter it in the deployed UI. Do not commit it.
- For the MATAI sign-in, library, and credits, provision the content-factory env vars and an Airtable account. The Next.js Vercel deploy does not use them.
