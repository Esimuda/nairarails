# Deploy NairaRails

## Live demo

**Production:** https://nairarails-ten.vercel.app

Hosted as a Vercel Hobby project under Olabowale Babalola's projects (esimuda). Runs in **DEMO mode** (`NEAR_INTENTS_JWT` empty → deterministic mock quotes, DEMO badge).

To deploy your own copy, use one of the free options below. Prefer **Vercel** (Next.js 15).

## Option A — Vercel one-click (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEsimuda%2Fnairarails&env=NEAR_INTENTS_JWT,NEXT_PUBLIC_NEAR_NETWORK,NEXT_PUBLIC_NEAR_CONTRACT_ID,SETTLEMENT_ACCOUNT,REFUND_ACCOUNT&envDescription=Leave%20NEAR_INTENTS_JWT%20empty%20for%20DEMO%20quotes.%20Network%20defaults%20to%20mainnet.&project-name=nairarails&repository-name=nairarails)

Or from a terminal (after `npx vercel login`):

```bash
git clone https://github.com/Esimuda/nairarails.git
cd nairarails
npx vercel          # preview
npx vercel --prod   # production
```

### Environment variables
| Name | Required | Notes |
|------|----------|--------|
| `NEAR_INTENTS_JWT` | No | Empty → DEMO quotes. Set for live 1Click. |
| `NEXT_PUBLIC_NEAR_NETWORK` | No | `mainnet` (default) or `testnet` |
| `NEXT_PUBLIC_NEAR_CONTRACT_ID` | No | Default `intents.near` |
| `SETTLEMENT_ACCOUNT` | No | Default `nairarails.near` |
| `REFUND_ACCOUNT` | No | Default `nairarails.near` |
| `NGN_SETTLEMENT_ASSET` | No | Only for live Intents destination asset |

## Option B — Netlify

```bash
npx netlify deploy --build --prod
```

Build command: `npm run build`  
Publish directory: `.next` (use `@netlify/plugin-nextjs`).

## Option C — Local / tunnel for judges
```bash
npm install && npm run build && npm start
# then cloudflared / ngrok if you need a public URL
```

## Post-deploy smoke
1. Open `/` — pay card loads, **Connect** visible.
2. Electricity → IKEDC → ₦20,000 → **Get USDC quote** → DEMO badge if no JWT.
3. **Sign (demo)** → receipt with prepaid token.
4. Optional: Connect MyNearWallet → **Sign with NEAR wallet**.
