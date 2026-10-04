# COPY.md — Approved Copy (VERBATIM — do not rewrite, paraphrase, or "improve")

Every string on every page comes from this file.
HARD RULE: NO EMOJIS ANYWHERE IN THE ENTIRE BUILD. Not in copy, not in buttons, not in
placeholders, not in meta tags, not in code comments. Where a visual marker is needed,
use the lucide icons specified in DESIGN.md. Zero exceptions.
HARD RULE: NO EM DASHES in any user-facing copy. Use periods or commas. If you ever
generate or adjust a string, it must contain no em dashes and no emojis.

---

## PAGE 1 — LANDING `/`

Single page. The registration form is embedded in the hero (`#hero-form`), not a
separate qualification step. All CTAs on the page scroll to the hero form.

### Meta
- Page title: `Kano Synthetic Trading Summit '26 | Weltrade`
- Meta description: `Free live trading event in Kano. Saturday October 17, 2026. Live market analysis, copy trading access, and networking with serious traders.`

### Hero
- Chip: `LIVE TRADING EXPERIENCE`
- H1: `Kano, It's Your Turn.` (gradient span on "It's Your Turn.")
- Subhead: `The Kano Synthetic Trading Summit '26 is here. One room. Hundreds of traders. Live market action.`
- Support line: `Benin came out. Port Harcourt came out. Jos, Ibadan, Ghana, Lagos, Enugu, Abuja and Kaduna came out. Now the biggest synthetic trading event in the region lands in Kano.`
- Detail strip (3 items, each with its lucide icon per DESIGN.md — Calendar / Clock / MapPin): `Saturday, October 17` | `9:00 AM` | `Central Hotel, No 1, Bompa Road by AA Rano, Kano`
- Countdown: counts down to October 17, 2026, 9:00 AM West Africa Time
- Scarcity line: `Entry is 100% FREE. Seats are not. Once the hall is full, the doors close.`

### Hero form card (embedded, `#hero-form`)
- H2: `Reserve Your Free Seat`
- Subline: `9:00 AM, Saturday October 17. Central Hotel, Bompa Road, Kano.`
- Duplicate Prevention Notice (see below), placed directly above the fields, inside the form card
- Fields: `First name` (required), `Email address` (required), `Phone number` (required, tel input)
- Consent checkbox: `I agree to the Privacy Policy and Terms, and consent to being contacted about this event by Telegram and email.`
- Second Duplicate Prevention Notice line (short form, see below), placed directly above the submit button
- Submit button: `RESERVE MY SEAT & JOIN ON TELEGRAM` (disabled until consent checked)
- Submitting state: `Reserving your seat...`
- Microcopy under button: `Free entry. You will be taken to our Telegram community instantly.`
- On successful submit: fire Meta Pixel `Lead`, then redirect to `VITE_TELEGRAM_URL`

### Section 2 — Who This Is For
- Chip: `WHO THIS IS FOR`
- H2: `If you trade, or you want to, this room was built for you.`
- Lines (4 stacked rows, each ends bold):
  1. `You started trading last week and you're still finding your feet? Come.`
  2. `You've been trading for months but your results keep swinging up and down? Come.`
  3. `You're already deep in synthetic indices and you want to sharpen your edge? Come.`
  4. `You have capital and you're looking for where smart money is moving? Definitely come.`
- CTA button: `RESERVE MY FREE SEAT →`

### Section 3 — What Happens Inside (negatives vs positives layout)
- Chip: `WHAT HAPPENS INSIDE`
- H2: `Forget everything you know about "seminars."` (gradient span on `"seminars."`)
- Intro: `Nobody is reading PowerPoint slides to you for four hours. This is a LIVE Trading Experience. Charts open. Markets moving. Real analysis happening in front of you, in real time.`

**Left column (cross icons) — "Trading alone looks like:"**
1. `Guessing the market and hoping for the best`
2. `Inconsistent results with nobody to ask why`
3. `Watching strangers flex profits online with zero proof`
4. `Learning from random videos with no real strategy`

**Right column (check icons) — "October 17 looks like:"**
1. `Live market breakdowns from experienced analysts, in real time`
2. `A room full of your people. The network that determines your trading level`
3. `Access to the Weltrade Copy Trading Platform, even if you opened your first chart yesterday`
4. `Real giveaways: phones, power banks, refreshments`
- CTA button: `I'M COMING. SAVE MY SEAT →`

### Section 4 — Gallery
- Chip: `PROOF, NOT PROMISES`
- H2: `We've done this before. Many times.`
- Caption chips: `Benin` `Port Harcourt` `Jos` `Ibadan` `Ghana` `Lagos` `Enugu` `Abuja` `Kaduna`
- Line under gallery: `Packed halls. Live sessions. Traders connecting. This is what's coming to Kano on October 17.`

### Section 5 — Final Push
- H2: `One Saturday. One room. Zero excuses.`
- Body: `The venue is on Bompa Road. The entry is free. The date is set. The only question left is whether your seat will have you in it, or someone else.`
- Detail block (lucide MapPin / Calendar / Clock icons): `Central Hotel, No 1, Bompa Road by AA Rano, Kano` / `Saturday, October 17, 2026` / `9:00 AM prompt`
- CTA button: `RESERVE MY FREE SEAT NOW →`
- Microcopy: `Free entry. Limited seats. First come, first seated.`

### Footer
- Line: `Weltrade · Central Hotel, No 1, Bompa Road by AA Rano, Kano · © 2026 Weltrade`
- Links: `Privacy` · `Terms`

---

## DUPLICATE PREVENTION NOTICE

Some traffic reaches this event through more than one funnel (for example, a
separate media buyer's funnel promoting the same event), which causes the same
person to register twice and creates duplicate leads. Every city rebuild of this
funnel carries this notice by default.

- Placement 1 (callout box, directly above the registration form fields, inside
  the form card, above the fold on mobile, not in the footer or fine print):
  `Already registered for this event? Please do not register again. Registering
  more than once causes duplicate entries and can affect your seat confirmation.`
  First sentence bold, second sentence regular weight.
- Placement 2 (short line, directly above the submit button):
  `Only register once. Duplicate entries will be merged.`
  First sentence bold, second sentence regular weight.
- Styling: distinct callout, `--wt-gold` / warm amber tint background with a
  bold border (not red, this is not an error state), paired with a small
  warning/info lucide icon.

---

## ENV VARS AND WEBHOOK PAYLOAD

- `VITE_N8N_WEBHOOK_URL` — n8n webhook endpoint, set in Railway, no default
- `VITE_META_PIXEL_ID` — Meta Pixel ID, set in Railway, no default. Fires `PageView` on every route change and `Lead` on successful registration only.
- `VITE_TELEGRAM_URL` — Telegram bot link for this city, set in Railway per media buyer. Example placeholder: `FILL_IN_KANO_BOT_LINK`

Payload shape (POST JSON to `VITE_N8N_WEBHOOK_URL` on submit, before redirect):
```json
{
  "name": "...",
  "email": "...",
  "phone": "...",
  "consent": true,
  "consent_timestamp": "ISO 8601",
  "status": "qualified",
  "timestamp": "ISO 8601",
  "source": "weltrade-kano-summit"
}
```
If the webhook fails, retry once in the background but never block the redirect.

---

## LEGAL PAGES

### `/privacy` — Privacy Policy
- Who we are: registration platform collects data for the Kano Synthetic Trading Summit '26, hosted by Weltrade. Contact for data matters: `support@weltrade.com`.
- What we collect: First name, email address, and phone number.
- Why we collect it: to reserve your seat, send event updates and reminders by Telegram and email, and plan the event experience. Lawful basis: your consent, given at registration.
- What we never do: we do not sell your data, and we do not share it with third parties outside the event organizers and the service providers that power this registration (hosting, data storage, email delivery).
- Retention: registration data is kept for the event and up to 12 months after, then deleted.
- Rights under the Nigeria Data Protection Act 2023: access, correct, withdraw consent, or request deletion at any time by contacting `support@weltrade.com`.
- Cookies and tracking: this site uses Meta Pixel to measure advertising performance. No tracking identifies you personally on this site.

### `/terms` — Terms of Use
- The event is free to attend. Registration reserves a seat but entry is first come, first seated, subject to hall capacity.
- Registration answers must be truthful. The organizers may decline entry where registration information is inaccurate.
- The summit provides trading education and live market demonstrations. Nothing at the event or on this site is financial advice. Trading involves risk, and decisions you make are your own responsibility.
- Giveaways are subject to physical attendance and the organizers' draw process on the day.
- The organizers may photograph and record the event for promotional use. Attendance implies acceptance unless you object on the day.
