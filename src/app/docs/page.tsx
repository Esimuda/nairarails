import Nav from "@/components/Nav";
export const metadata = { title: "Docs — NairaRails" };
const S = [
  ["Overview", "NairaRails lets anyone holding USDC on NEAR pay Nigerian utility, airtime and cable bills. Each payment is a NEAR intent: the user states the naira outcome, solvers quote the USDC cost, and settlement is atomic."],
  ["Flow", "1. Pick category and biller. 2. Enter amount in NGN. 3. POST /api/quote builds a 1Click quote request (EXACT_OUTPUT, USDC nep141 origin, depositType INTENTS). 4. User signs the intent with their NEAR wallet. 5. Solver pays the biller aggregator and the receipt shows the token."],
  ["Demo mode", "If NEAR_INTENTS_JWT is unset, quotes come from a deterministic mock solver and the UI shows a DEMO badge. Wallet signing is simulated. Set the env vars in .env.example to go live."],
  ["API", "POST /api/quote { ngn: number, billerId: string } → { mode, ngn, usdc, rate, feeUsdc, depositAddress, intentId, expiresAt, solver }. Amount range ₦100 – ₦500,000."],
  ["Billers", "Electricity: IKEDC, EKEDC, AEDC. Airtime: MTN, Airtel, Glo. Cable: DStv, GOtv. Catalogue lives in src/lib/billers.ts."],
  ["Why NEAR", "Intents give us solver competition on the FX leg, chain-abstracted USDC deposits, and refund-on-failure without us custodying funds. Without NEAR, NairaRails would have to become a licensed FX desk."],
];
export default function Docs() {
  return (<main><Nav /><article className="mx-auto max-w-3xl px-5 py-12">
    <p className="label text-accent">Documentation</p><h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">How NairaRails works</h1>
    {S.map(([h, b]) => <section key={h} className="mt-10 border-t border-line pt-6"><h2 className="font-display text-xl font-semibold">{h}</h2><p className="mt-3 max-w-[70ch] leading-relaxed text-mute">{b}</p></section>)}
  </article></main>);
}
