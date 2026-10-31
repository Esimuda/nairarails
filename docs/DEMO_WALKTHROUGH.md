# NairaRails — screen-recording walkthrough

Record the **running app** (localhost or the deployed URL). Do **not** record slides.
Target length: ~75–90 seconds. Camera must stay on the browser UI the whole time.

## Before you hit record
1. Open the app: `npm run dev` → http://localhost:3000 (or the live URL from DEPLOY.md).
2. Hard-refresh so the pay card is on step 1 (category pick).
3. Optional: have MyNearWallet ready if you want a real Connect → Sign path; otherwise DEMO path is fine for the video.
4. Voice: Israel (calm, Lagos English). Speak the lines below as on-screen actions happen.

## What the camera must show
- Full browser chrome optional; **pay card on the right** must stay readable.
- Cursor clicks: Electricity → IKEDC → meter field → amount → Get USDC quote → Sign → receipt with prepaid token.
- When DEMO badge is visible, leave it in frame (honesty for judges).
- On receipt: zoom or pause 2s on the **20-digit prepaid token**.

---

## Numbered click path + Israel voiceover

### 1. Open home (0–10s)
**Do:** Land on `/`. Scroll so hero + pay card are both visible. Hover “Try the demo” then click into the pay card area (`#pay`).

**Say:**  
“Ada freelances in Yaba and gets paid in USDC. Her light is about to go off — and she doesn’t want another P2P desk hop.”

### 2. Pick Electricity / IKEDC (10–22s)
**Do:** On the pay card, tap **Electricity** (already selected is fine — click it anyway). Tap biller chip **IKEDC**. In **Meter number**, type or accept `4501 2238 917`. Click **Continue**.

**Say:**  
“Open NairaRails. Electricity. Ikeja Electric. Here’s her prepaid meter.”

### 3. Amount → USDC quote (22–40s)
**Do:** Set amount to **₦20,000** (tap the ₦20,000 chip). Click **Get USDC quote**. Wait for the quote panel: USDC total, rate, solver fee, intent id.

**Say:**  
“Twenty thousand naira. That’s a NEAR intent — solvers compete to deliver the naira. Rate, fee, intent id — all on NEAR Intents.”

**Camera:** Hold 2s on the USDC figure and the Intent row.

### 4. Connect / Sign (40–58s)
**Path A — DEMO (no wallet):** Leave DEMO badge visible. Click **Sign (demo)**. Wait for the signing spinner.

**Path B — Wallet connected:** Click **Connect** (nav or card). Pick **MyNearWallet** (or Here). After account id shows, click **Sign with NEAR wallet** and approve the message in the wallet popup.

**Say (either path):**  
“One signature from her NEAR account. If the solver doesn’t settle, the USDC comes back — atomic.”

### 5. Receipt + prepaid token (58–80s)
**Do:** On success, show **₦20,000 paid to IKEDC**, then the **Prepaid token** box. Click **Copy token** once.

**Say:**  
“Receipt: twenty thousand paid, and a twenty-digit prepaid token she can punch into the meter. No P2P desk. No bank hop.”

**Camera:** Prepaid token must be legible for ≥2 seconds.

### 6. Close (80–90s)
**Do:** Pan briefly to the footer line “Take NEAR out…” section or the hero tagline.

**Say:**  
“Take NEAR out and this product is gone. That’s NairaRails — Real-World Money track.”

---

## Cut checklist
- [ ] Running app only (no Figma / slides)
- [ ] Electricity → IKEDC → meter → ₦20,000 → quote → sign → token
- [ ] Intent id or solver row visible on quote step
- [ ] Prepaid token visible on receipt
- [ ] DEMO badge shown if wallet wasn’t used; account id shown if it was
- [ ] Audio: Israel lines above (or same meaning)

## After recording
1. Upload demo video (YouTube unlisted or X upload).
2. Draft X post is in the root README — attach the video / demo URL.
3. NEAR form (opens ~Nov 1): paste GitHub + demo URL + X post + your NEAR wallet address.
