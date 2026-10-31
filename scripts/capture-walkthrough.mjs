#!/usr/bin/env node
/**
 * Capture NairaRails DEMO click path from localhost:3000 → PNG frames at 1280×720.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FRAMES = path.join(ROOT, "docs/demo/frames");
const BASE = process.env.DEMO_URL || "http://127.0.0.1:3000";
const W = 1280;
const H = 720;

fs.mkdirSync(FRAMES, { recursive: true });

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function shot(page, name) {
  const dest = path.join(FRAMES, name);
  await page.screenshot({ path: dest, type: "png" });
  console.log("shot", name, fs.statSync(dest).size);
  return dest;
}

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage", "--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(25000);

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await sleep(900);
  await shot(page, "01-home.png");

  const tryBtn = page.locator('a[href="#pay"]');
  await tryBtn.hover();
  await sleep(350);
  await shot(page, "02-hover-try.png");
  await tryBtn.click();
  await sleep(500);
  await page.locator("#pay").scrollIntoViewIfNeeded();
  await sleep(450);
  await shot(page, "03-pay-card.png");

  await page.locator("button.tile", { hasText: "Electricity" }).click();
  await sleep(280);
  await shot(page, "04-electricity.png");

  await page.locator("button.chip", { hasText: "IKEDC" }).click();
  await sleep(220);
  await shot(page, "05-ikedc.png");

  const meter = page.locator("#acct");
  await meter.click();
  await meter.fill("");
  await meter.type("4501 2238 917", { delay: 35 });
  await sleep(350);
  await shot(page, "06-meter.png");

  await page.locator("#pay button.btn", { hasText: "Continue" }).click();
  await sleep(550);
  await shot(page, "07-amount.png");

  await page.locator("#pay button.chip", { hasText: "₦20,000" }).click();
  await sleep(280);
  await shot(page, "08-amount-20k.png");

  await page.locator("#pay button.btn", { hasText: "Get USDC quote" }).click();
  // Wait until quote numbers appear (USDC total + Solver fee row)
  await page.locator("#pay >> text=Solver fee").waitFor({ state: "visible", timeout: 15000 });
  await page.getByText("DEMO", { exact: true }).waitFor({ state: "visible" });
  await sleep(700);
  await shot(page, "09-quote.png");
  await sleep(500);
  await shot(page, "10-quote-hold.png");

  await page.locator("#pay button.btn", { hasText: "Sign (demo)" }).click();
  await sleep(350);
  try {
    await page.locator("#pay >> text=Signing").waitFor({ timeout: 1200 });
    await shot(page, "11-signing.png");
  } catch {
    console.log("signing spinner skipped");
  }

  await page.locator("#pay >> text=paid to IKEDC").waitFor({ state: "visible", timeout: 10000 });
  await page.locator("#pay >> text=Prepaid token").waitFor({ state: "visible" });
  await sleep(600);
  await shot(page, "12-receipt.png");

  await page.locator("#pay button", { hasText: "Copy token" }).click();
  await sleep(450);
  await shot(page, "13-receipt-copy.png");

  await page.locator("text=Take NEAR out and there is no product").scrollIntoViewIfNeeded();
  await sleep(550);
  await shot(page, "14-close-section.png");

  await browser.close();
  console.log("capture done");
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
