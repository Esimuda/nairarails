# NairaRails

Pay Nigerian bills (electricity tokens, airtime, DStv/GOtv) with USDC through **NEAR Intents**. NEAR Hackathon 2026, Real-World Money track.

**The problem:** Nigerian freelancers get paid in USDC and pay their bills in naira. Today that means a P2P desk, a bank transfer, then a VTU app: three hops and a spread at each one.
**What NairaRails does:** you sign one NEAR intent and get a prepaid meter token back.

## Why it needs NEAR
The quote, the solver competition on the USDC→NGN leg, atomic settle-or-refund, and the user account all run on NEAR Intents (1Click API). Take NEAR out and NairaRails would have to become a licensed FX desk holding user funds.

## Run
```bash
npm install
cp .env.example .env.local   # leave NEAR_INTENTS_JWT empty for DEMO mode
npm run dev                  # http://localhost:3000
npm run build && npm start
```
If no Intents JWT is set, quotes come from a deterministic mock solver and the UI shows a **DEMO** badge. With `NEAR_INTENTS_JWT` set, `/api/quote` calls `https://1click.chaindefuser.com/v0/quote` (EXACT_OUTPUT, USDC nep141 origin, INTENTS deposit).

## Structure
- `src/lib/billers.ts`: seeded billers (IKEDC, EKEDC, AEDC, MTN, Airtel, Glo, DStv, GOtv)
- `src/lib/intents.ts`: quote layer (live 1Click, or demo)
- `src/app/api/quote/route.ts`: quote endpoint
- `src/components/PayFlow.tsx`: category → amount → USDC quote → sign intent → receipt
- `/docs`: in-app documentation

## Wallet
Connect via **MyNearWallet** or **HERE Wallet** (`@near-wallet-selector`). Connected → Sign uses a real NEP-413 message. Not connected → **DEMO** badge and simulated settle only. Quotes still use live 1Click when `NEAR_INTENTS_JWT` is set.

## Live demo
**https://nairarails-ten.vercel.app** — Vercel Hobby (esimuda), DEMO mode (`NEAR_INTENTS_JWT` empty).

## Screen-recording demo
Full click path + Israel voiceover: [`docs/DEMO_WALKTHROUGH.md`](docs/DEMO_WALKTHROUGH.md). Deploy: [`DEPLOY.md`](DEPLOY.md).

## Demo script (75s)
1. (0–10s) "Ada freelances in Yaba and gets paid in USDC. Her light is about to go off."
2. (10–25s) Open NairaRails, pick Electricity, then Ikeja Electric, and enter the meter number.
3. (25–40s) Type ₦20,000 and tap *Get USDC quote*. "That's a NEAR intent. Solvers compete to deliver the naira." Point at the rate, fee and intent ID.
4. (40–55s) Tap *Connect* (optional) then *Sign with NEAR wallet* / *Sign (demo)*. "One signature. If the solver doesn't settle, the USDC comes back."
5. (55–70s) Receipt: ₦20,000 paid and a 20-digit prepaid token. Copy the token.
6. (70–75s) "No P2P desk, no bank hop. Take NEAR out and the product is gone."

## Draft X post
> Built NairaRails for @NEARProtocol #NEARHackathon: Nigerian freelancers pay IKEDC light, MTN airtime and DStv straight from USDC. One NEAR Intent, solvers compete on the naira rate, and it settles or refunds. Real-World Money track.
> github.com/Esimuda/nairarails

## Roadmap
VTU aggregator (e.g. VTpass) as the solver's payout leg, then SMS token delivery.
