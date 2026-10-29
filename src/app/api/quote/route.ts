import { NextResponse } from "next/server";
import { getQuote } from "@/lib/intents";
export async function POST(req: Request) {
  const { ngn, billerId } = await req.json();
  if (!ngn || ngn < 100 || ngn > 500000) return NextResponse.json({ error: "Amount must be ₦100 – ₦500,000" }, { status: 400 });
  return NextResponse.json(await getQuote(Number(ngn), String(billerId)));
}
