"use client";
import { useMemo, useState } from "react";
import {
  Zap,
  Smartphone,
  Tv,
  ArrowRight,
  Check,
  Loader2,
  ShieldCheck,
  Copy,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { BILLERS, CATEGORIES, type Category } from "@/lib/billers";
import type { Quote } from "@/lib/intents";
import { useNearWallet } from "@/context/NearWallet";

const ICON = { electricity: Zap, airtime: Smartphone, tv: Tv } as const;
const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
type Step = "pick" | "amount" | "quote" | "signing" | "receipt";

export default function PayFlow() {
  const { accountId, connect, signIntent, ready } = useNearWallet();
  const [cat, setCat] = useState<Category>("electricity");
  const [billerId, setBillerId] = useState("ikedc");
  const [account, setAccount] = useState("");
  const [ngn, setNgn] = useState(20000);
  const [step, setStep] = useState<Step>("pick");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [err, setErr] = useState("");
  const [signedBy, setSignedBy] = useState<string | null>(null);
  const [sigPreview, setSigPreview] = useState<string | null>(null);
  const biller = useMemo(() => BILLERS.find((b) => b.id === billerId)!, [billerId]);
  const token = useMemo(
    () =>
      quote
        ? (quote.intentId.replace(/\D/g, "") + "73019482615503")
            .slice(0, 20)
            .replace(/(\d{4})/g, "$1 ")
            .trim()
        : "",
    [quote],
  );
  const demoMode = !accountId;

  async function fetchQuote() {
    setErr("");
    setStep("quote");
    setQuote(null);
    const r = await fetch("/api/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ngn, billerId }),
    });
    const j = await r.json();
    if (!r.ok) {
      setErr(j.error);
      setStep("amount");
      return;
    }
    setQuote(j);
  }

  async function confirm() {
    if (!quote) return;
    setErr("");
    setStep("signing");
    try {
      if (accountId) {
        const signed = await signIntent({
          intentId: quote.intentId,
          ngn: quote.ngn,
          usdc: quote.usdc + quote.feeUsdc,
          billerId,
        });
        setSignedBy(signed.accountId);
        setSigPreview(signed.signature.slice(0, 18) + "…");
      } else {
        // DEMO path: no wallet — simulate solver settle
        await new Promise((r) => setTimeout(r, 1400));
        setSignedBy(null);
        setSigPreview(null);
      }
      setStep("receipt");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Signing cancelled");
      setStep("quote");
    }
  }

  function reset() {
    setStep("pick");
    setQuote(null);
    setAccount("");
    setSignedBy(null);
    setSigPreview(null);
    setErr("");
  }

  const steps: Step[] = ["pick", "amount", "quote", "receipt"];
  const idx = steps.indexOf(step === "signing" ? "quote" : step);

  return (
    <div className="card w-full max-w-[420px] p-5 sm:p-6" aria-live="polite">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`h-1 w-8 rounded-full ${i <= idx ? "bg-accent" : "bg-line"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {demoMode && (
            <span className="rounded-md border border-support/40 bg-support/10 px-2 py-0.5 font-mono text-[11px] text-support">
              DEMO
            </span>
          )}
          {accountId ? (
            <button
              type="button"
              onClick={connect}
              className="max-w-[140px] truncate rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent"
              title={accountId}
            >
              {accountId}
            </button>
          ) : (
            <button
              type="button"
              onClick={connect}
              disabled={!ready}
              className="inline-flex items-center gap-1 rounded-md border border-line px-2 py-0.5 text-[11px] text-mute hover:text-ink disabled:opacity-50"
            >
              <Wallet size={12} /> Connect
            </button>
          )}
        </div>
      </div>

      {step === "pick" && (
        <div className="mt-5">
          <p className="label">Pay a bill</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {CATEGORIES.map((c) => {
              const I = ICON[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCat(c.id);
                    setBillerId(BILLERS.find((b) => b.category === c.id)!.id);
                  }}
                  className={`tile ${cat === c.id ? "border-accent bg-accent/10 text-ink" : ""}`}
                >
                  <I size={18} />
                  <span className="mt-2 text-sm font-medium">{c.label}</span>
                  <span className="text-[11px] text-mute">{c.hint}</span>
                </button>
              );
            })}
          </div>
          <p className="label mt-5">Biller</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {BILLERS.filter((b) => b.category === cat).map((b) => (
              <button
                key={b.id}
                onClick={() => setBillerId(b.id)}
                className={`chip ${billerId === b.id ? "border-accent text-ink" : ""}`}
              >
                {b.short}
              </button>
            ))}
          </div>
          <label className="label mt-5 block" htmlFor="acct">
            {biller.field}
          </label>
          <input
            id="acct"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder={biller.placeholder}
            inputMode="numeric"
            className="input mt-2"
          />
          <button
            className="btn mt-5"
            onClick={() => {
              if (!account) setAccount(biller.placeholder);
              setStep("amount");
            }}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {step === "amount" && (
        <div className="mt-5">
          <p className="label">
            {biller.name} · {account}
          </p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl text-mute">₦</span>
            <input
              aria-label="Amount in naira"
              value={ngn.toLocaleString("en-NG")}
              onChange={(e) =>
                setNgn(Number(e.target.value.replace(/\D/g, "")) || 0)
              }
              className="w-full bg-transparent font-display text-5xl font-semibold tracking-tight outline-none"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {biller.presets.map((p) => (
              <button
                key={p}
                onClick={() => setNgn(p)}
                className={`chip ${ngn === p ? "border-accent text-ink" : ""}`}
              >
                {naira(p)}
              </button>
            ))}
          </div>
          {err && (
            <p role="alert" className="mt-3 text-sm text-red-400">
              {err}
            </p>
          )}
          <div className="mt-6 flex gap-2">
            <button className="btn-ghost" onClick={() => setStep("pick")}>
              Back
            </button>
            <button className="btn" onClick={fetchQuote}>
              Get USDC quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {(step === "quote" || step === "signing") && (
        <div className="mt-5">
          <p className="label">Intent quote · NEAR Intents</p>
          {!quote ? (
            <div className="mt-3 space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-9 animate-pulse rounded-lg bg-line/60" />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-3 font-display text-4xl font-semibold tracking-tight">
                {(quote.usdc + quote.feeUsdc).toFixed(2)}{" "}
                <span className="text-xl text-mute">USDC</span>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                {(
                  [
                    ["Biller receives", naira(quote.ngn)],
                    ["Rate", `₦${quote.rate.toLocaleString("en-NG")} / USDC`],
                    ["Solver fee", `${quote.feeUsdc.toFixed(2)} USDC`],
                    ["Solver", quote.solver],
                    ["Intent", quote.intentId.slice(0, 14) + "…"],
                  ] as const
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between border-b border-line/60 pb-2"
                  >
                    <dt className="text-mute">{k}</dt>
                    <dd className="font-mono text-[13px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-mute">
                <ShieldCheck size={14} className="text-accent" />
                Settles atomically or refunds to your NEAR account.
              </p>
              {!accountId && (
                <button
                  type="button"
                  onClick={connect}
                  className="btn-ghost mt-3 w-full justify-center"
                >
                  <Wallet size={14} /> Connect NEAR wallet for real signing
                </button>
              )}
              {err && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {err}
                </p>
              )}
              <div className="mt-5 flex gap-2">
                <button className="btn-ghost" onClick={() => setStep("amount")}>
                  Back
                </button>
                <button
                  className="btn"
                  disabled={step === "signing"}
                  onClick={confirm}
                >
                  {step === "signing" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Signing
                      intent
                    </>
                  ) : accountId ? (
                    <>Sign with NEAR wallet</>
                  ) : (
                    <>Sign (demo)</>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {step === "receipt" && quote && (
        <div className="mt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check size={20} />
          </div>
          <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
            {naira(quote.ngn)} paid to {biller.short}
          </p>
          <p className="text-sm text-mute">
            {(quote.usdc + quote.feeUsdc).toFixed(2)} USDC settled via NEAR
            Intents
          </p>
          {biller.category === "electricity" && (
            <div className="mt-4 rounded-xl border border-support/30 bg-support/5 p-4">
              <p className="label text-support">Prepaid token</p>
              <p className="mt-1 font-mono text-lg tracking-wider">{token}</p>
              <button
                onClick={() => navigator.clipboard?.writeText(token)}
                className="mt-2 flex items-center gap-1 text-xs text-mute hover:text-ink"
              >
                <Copy size={12} /> Copy token
              </button>
            </div>
          )}
          <dl className="mt-4 space-y-2 text-sm">
            {(
              [
                ["Account", account],
                ["Intent", quote.intentId.slice(0, 18) + "…"],
                [
                  "Signer",
                  signedBy ?? "demo (no wallet)",
                ],
                ...(sigPreview ? ([["Signature", sigPreview]] as const) : []),
                [
                  "Time",
                  new Date().toLocaleTimeString("en-NG", {
                    timeZone: "Africa/Lagos",
                  }) + " WAT",
                ],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-mute">{k}</dt>
                <dd className="max-w-[60%] truncate font-mono text-[13px]">{v}</dd>
              </div>
            ))}
          </dl>
          <button
            className="btn-ghost mt-5 w-full justify-center"
            onClick={reset}
          >
            <RotateCcw size={14} /> Pay another bill
          </button>
        </div>
      )}
    </div>
  );
}
