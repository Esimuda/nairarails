// NEAR Intents (1Click API) quote layer. USDC on NEAR -> NGN settlement solver.
// Without NEAR_INTENTS_JWT we return a deterministic mocked quote (DEMO mode).
export const USDC_NEAR = "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1.omft.near";
export const NGN_RATE = 1545.6; // NGN per USDC, demo reference

export type Quote = {
  mode: "live" | "demo";
  ngn: number; usdc: number; rate: number; feeUsdc: number;
  depositAddress: string; intentId: string; expiresAt: number; solver: string;
};

export async function getQuote(ngn: number, billerId: string): Promise<Quote> {
  const jwt = process.env.NEAR_INTENTS_JWT;
  const usdc = +(ngn / NGN_RATE).toFixed(2);
  const fee = +Math.max(0.05, usdc * 0.004).toFixed(2);
  if (jwt) {
    const res = await fetch("https://1click.chaindefuser.com/v0/quote", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${jwt}` },
      body: JSON.stringify({
        dry: false, swapType: "EXACT_OUTPUT", slippageTolerance: 100,
        originAsset: USDC_NEAR, depositType: "INTENTS",
        destinationAsset: process.env.NGN_SETTLEMENT_ASSET ?? USDC_NEAR,
        amount: String(Math.round((usdc + fee) * 1e6)),
        refundTo: process.env.REFUND_ACCOUNT ?? "nairarails.near", refundType: "INTENTS",
        recipient: process.env.SETTLEMENT_ACCOUNT ?? "nairarails.near", recipientType: "INTENTS",
        deadline: new Date(Date.now() + 10 * 60_000).toISOString(),
        referral: `nairarails:${billerId}`,
      }),
    });
    if (res.ok) {
      const j = await res.json();
      return { mode: "live", ngn, usdc, rate: NGN_RATE, feeUsdc: fee, depositAddress: j.quote?.depositAddress ?? "", intentId: j.correlationId ?? "", expiresAt: Date.now() + 600_000, solver: "1Click" };
    }
  }
  const h = [...`${billerId}${ngn}`].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return { mode: "demo", ngn, usdc, rate: NGN_RATE, feeUsdc: fee, depositAddress: `intents.near/${h.toString(16)}`, intentId: `0x${h.toString(16)}${(h * 2654435761 >>> 0).toString(16)}`, expiresAt: Date.now() + 600_000, solver: "demo-solver.near" };
}
