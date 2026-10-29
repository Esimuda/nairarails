import Nav from "@/components/Nav";
import PayFlow from "@/components/PayFlow";
import { RECENT } from "@/lib/billers";
import Link from "next/link";

const STEPS = [
  ["01", "Pick the bill", "IKEDC, EKEDC, AEDC, MTN, Airtel, Glo, DStv, GOtv. Enter the meter, phone or smartcard."],
  ["02", "Quote in USDC", "NairaRails publishes an intent. NEAR Intents solvers compete to deliver the naira at the best rate."],
  ["03", "Sign once, get the token", "One signature from your NEAR account. The solver settles the biller, or your USDC comes back."],
];

export default function Home() {
  return (<main>
    <Nav />
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
      <div>
        <p className="label text-accent">Real-World Money · NEAR Intents</p>
        <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">Your USDC.<br />Lagos light bill.<br /><span className="text-mute">Paid.</span></h1>
        <p className="mt-6 max-w-[52ch] text-lg text-mute">Nigerian freelancers earn in dollars and pay bills in naira. NairaRails skips the P2P desk: one NEAR intent turns USDC into a prepaid meter token in under a minute.</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href="#pay" className="btn flex-none px-6">Try the demo</a><Link href="/docs" className="btn-ghost">Read the docs</Link></div>
        <div className="mt-12 border-t border-line pt-5">
          <p className="label">Live on the rails</p>
          <ul className="mt-3 space-y-2 font-mono text-[13px]">{RECENT.map((r) => (
            <li key={r.who} className="grid grid-cols-[1fr_auto_auto] gap-4 text-mute"><span><span className="text-ink">{r.who}</span> · {r.what}</span><span>₦{r.ngn.toLocaleString("en-NG")} ← {r.usdc} USDC</span><span className="w-8 text-right">{r.ago}</span></li>))}</ul>
        </div>
      </div>
      <div id="pay" className="flex justify-center lg:justify-end"><PayFlow /></div>
    </section>
    <section className="border-y border-line bg-panel/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">{STEPS.map(([n, t, d]) => (
        <div key={n}><p className="font-mono text-sm text-support">{n}</p><h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{t}</h3><p className="mt-2 max-w-[40ch] text-mute">{d}</p></div>))}</div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="max-w-[24ch] font-display text-3xl font-semibold tracking-tight">Take NEAR out and there is no product.</h2>
      <p className="mt-4 max-w-[65ch] text-mute">The quote, the solver competition, the atomic settle-or-refund and the user&apos;s account all live on NEAR Intents. NairaRails is only the front door and the biller catalogue.</p>
    </section>
    <footer className="border-t border-line"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 py-8 text-sm text-mute"><span>NairaRails · built in Lagos for the NEAR Hackathon 2026</span><span className="flex gap-5"><Link href="/docs">Docs</Link><a href="https://github.com/Esimuda/nairarails">Repo</a></span></div></footer>
  </main>);
}
