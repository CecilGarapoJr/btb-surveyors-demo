# BTB Surveyors — Website Redesign Drafts

Static HTML/CSS mockups for **client sign-off**. This is **not** the WordPress theme — it's the
design + structure to approve *before* we build the theme. Everything is hand-coded (one stylesheet,
one small JS file), so it's fast, accessible, and trivial to convert later.

## How to view
Just open `proposal.html` in a browser (double-click). No server or build step needed.

- **`proposal.html`** ← start here. The client-facing pitch: the opportunity, current → proposed
  sitemap, look & feel, links to every page draft, build roadmap, and the WordPress plan.
- **`index.html`** ← the homepage demo with the **working instant-quote calculator** (the key
  conversion feature — try it).

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage + interactive instant-quote calculator (hero) |
| `surveys.html` | Surveys: Level 2, Level 3, snagging, defect + compare table |
| `valuations.html` | Valuations: Help to Buy, probate/IHT, matrimonial, shared ownership |
| `areas.html` | "Areas we cover" — local-SEO landing-page engine (30+ towns) |
| `reviews.html` | Social-proof wall + rating summary |
| `guides.html` | Guides hub (replaces the blog) — organic content engine |
| `about.html` | About + named, credentialled RICS surveyors |
| `contact.html` | Phone / WhatsApp / email + callback form |
| `proposal.html` | The visual proposal document |

## Design system
- **Brand-faithful:** BTB's existing yellow `#fdd215` on near-black `#1f1f1f`, warm cream `#f2eadf`,
  trust-green `#185d3b`.
- **Type:** Bricolage Grotesque (display) + Inter (body — BTB's current font).
- **Files:** `assets/styles.css` (all styling, design tokens at the top), `assets/app.js`
  (mobile nav, scroll reveals, quote calculator).
- The quote calculator pricing is **illustrative** — real figures + postcode/regional logic get
  wired up in the build stage.

## What's a mockup vs. real
- ✅ Real: layout, look & feel, navigation, content structure, working calculator UI, responsive design.
- 🔌 Stubbed (no backend yet): form submissions, live reviews feed, real pricing, area pages.

---

## From draft → WordPress (the easy part)

Because the design is already locked in clean HTML + one CSS file, the WordPress stage is mostly
templating and plumbing — **not** redesign. Recommended path:

1. **Approve** the sitemap + look from these drafts (cheap to change now).
2. **Build** as either a lightweight custom block theme generated from this CSS, or a clean builder
   (Bricks / GeneratePress) styled to match — both reuse this exact design.
3. **Wire dynamic bits:**
   - Quote calculator → a survey CRM (Survey Booker or I Need Leads) for the **15-minute callback**
     / speed-to-lead automation.
   - Reviews → live Google + Trustpilot feed.
   - Areas & Guides → editable templates the BTB team can add to themselves.
4. **Launch Phase 1**, instrument conversion + speed-to-lead, then iterate (Phases 2–3).

> Build in phases: **Phase 1 (conversion core)** is ~80% of the revenue upside — ship it first and
> let real data justify the rest.
