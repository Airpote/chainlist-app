# ChainList App

Static, serverless ChainList UI for [chainlist.amichain.org](https://chainlist.amichain.org/). Chain metadata ships in the browser bundle via [`@amichain/chainlist`](https://www.npmjs.com/package/@amichain/chainlist); no custom backend is required for the website.

Optional TVL sorting loads from [DefiLlama](https://defillama.com/) in the browser. If that request fails or is blocked, the full chain list still renders.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Output is written to `build/` and can be served by any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel static, nginx, etc.).

For GitHub project pages (`https://<user>.github.io/<repo>/`), set the base path when building:

```bash
BASE_PATH=/chainlist-app npm run build
```

## Deploy

### GitHub Pages

Push to `main`. The [Deploy static site](.github/workflows/deploy-pages.yml) workflow builds and publishes `build/` to GitHub Pages. Enable Pages for this repo (Settings → Pages → GitHub Actions).

### Vercel / other static hosts

- **Build command:** `npm run build`
- **Output directory:** `build`
- **Install command:** `npm ci`

No server, environment variables, or API proxy are needed for chain data.

## Architecture

| Data | Source |
|------|--------|
| Chains (RPC, explorers, etc.) | `@amichain/chainlist` npm package (bundled at build time) |
| Extra L1 subnets | `ava-labs/builders-hub` JSON on GitHub |
| TVL (optional) | `https://api.llama.fi/v2/chains` (client-side) |
| Icons | Chain `icon` URL or [Amichain/chain-icons](https://github.com/amichain/chain-icons) on jsDelivr |

The legacy `chainlist-api` Express service on a VPS only mirrored the npm package for REST clients; this app does not call it.

## Scripts

- `npm run dev` — development server
- `npm run build` — production static build
- `npm run preview` — preview production build
- `npm run check` — TypeScript / Svelte checks
