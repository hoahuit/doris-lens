# DORIS.LENS website

A Vite + React website for DORIS.LENS, using the Instagram screenshot crops supplied in the conversation.

## Run locally

Requirements: Node.js 18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` — page sections and interactions
- `src/styles.css` — responsive styling and animations
- `public/images/` — nine locally bundled image crops from the Instagram profile screenshot

## Before publishing

- Replace screenshot-cropped images with original high-resolution brand images.
- Confirm exact branch addresses and product names/specifications.
- Confirm the supplied contact number and add the official social links.
- Connect a real booking/order workflow if needed.

The booking/purchase flow is intentionally not fabricated. Contact buttons use the supplied phone number and Instagram profile.
