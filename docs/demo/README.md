# NairaRails — demo assets (NEAR Hackathon 2026)

## Walkthrough video (this folder)

| File | Notes |
|---|---|
| [`nairarails-walkthrough.mp4`](./nairarails-walkthrough.mp4) | Real UI walkthrough — **1280×720** H.264, ~81s. Captured from the running Next.js app on `localhost:3000` (DEMO path). |
| [`frames/`](./frames/) | Source stills (raw + captioned) used to compose the MP4. |
| [`concat.txt`](./concat.txt) | ffmpeg concat demuxer list + per-frame durations. |

### What’s in the video
1. Title card — **NairaRails — NEAR Real-World Money** / Israel (~4s)
2. Home → Try the demo → pay card (`#pay`)
3. Electricity → IKEDC → meter `4501 2238 917` → Continue
4. ₦20,000 → **Get USDC quote** (rate, fee, intent id, DEMO badge)
5. **Sign (demo)** → signing spinner → receipt with **20-digit prepaid token** + Copy token
6. Close on “Take NEAR out…” section
7. End card — `github.com/Esimuda/nairarails`

On-screen captions carry the Israel voice lines from [`../DEMO_WALKTHROUGH.md`](../DEMO_WALKTHROUGH.md). Edge TTS (`en-NG-AbeoNeural`) returned 403 in this environment, so the cut is **silent with captions** (real UI footage preferred over voice).

### Live deploy
**Still pending** one Vercel one-click deploy from [`../../DEPLOY.md`](../../DEPLOY.md). Do not treat this MP4 as a substitute for the live URL on the NEAR form — attach both when the deploy URL exists.

### Rebuild locally

```bash
cd nairarails
npm run build && npm run start   # http://localhost:3000
node scripts/capture-walkthrough.mjs
# (re)apply caption overlays + title/end via the compose steps in scripts/, then:
cd docs/demo
ffmpeg -y -f concat -safe 0 -i concat.txt \
  -vf "scale=1280:720,fps=30,format=yuv420p" \
  -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  nairarails-walkthrough.mp4
```
