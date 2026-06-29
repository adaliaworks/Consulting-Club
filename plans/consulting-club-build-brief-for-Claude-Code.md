# Consulting Club — Build Brief for Claude Code

*Paste this whole file into Claude Code as the project spec. It describes a complete static website to be built in one pass, ready for a soft launch to founding members.*

---

## 0. How to use this brief

Build a complete, hand-editable static website — **no build step, no framework, no package manager**. Plain HTML, one shared CSS file, and minimal vanilla JS only where it removes real drudgery (see §5). The site must be deployable by zipping the folder and dropping it into a GitHub Pages repo. Every page must be something a non-developer can open and edit by hand.

Build **all** pages and **all** library content in this pass. This is a first full draft for soft launch, not a skeleton — the existing club members will use it to prepare for their second gathering, so the library content must be real and substantive, not placeholder text.

---

## 1. Project summary

**Consulting Club** is a recurring, low-stakes practice arena where experienced professionals exercise consulting muscles they don't use in their day jobs. Monthly, one member plays the *Client* with a real problem; the others form an ad hoc *Consulting Team* and deliver a ~90-minute engagement, closing with a 15-minute debrief and a candid "*Would I hire these people?*" round. The purpose is developmental and fun, not transactional — and for some members, a zero-risk way to test-drive a possible pivot into consulting or advisory work.

The site has two jobs: **invite the right people in**, and **house the practice library** members work from.

---

## 2. Goals & success criteria

- **MVP definition:** a fully functional static site that existing members can refer to as they prepare for the next gathering.
- **Two calls to action, in priority order:**
  1. **Express interest** (hero CTA) — the "Learn More" contact form (§9).
  2. **Browse the library** (secondary CTA) — entry into the content library.
- The library is **open / free** — no paywall, no login, no accounts in this version.
- Content must be accurate, attributed, and genuinely useful on day one.

---

## 3. Audience & voice

- **Primary audience (who the copy addresses):** mid-career professionals — the "1990s college-grad" cohort, rich in expertise, curious about what's next, drawn to encore careers and advisory work.
- **Actual first readers:** the founding members, who will give feedback. So the tone can be warm and a little insider, not cold-pitch.
- **Voice:** intelligent, confident, lightly witty; executive-credible but human. No hype, no growth-hack breathlessness, no em-dash-laden AI throat-clearing. Write like a sharp colleague explaining something they're genuinely excited about.

---

## 4. Brand & domain

- **Name:** Consulting Club
- **Domain:** `cc.adaliaadvisors.com` (GitHub Pages custom subdomain — include a `CNAME` file containing exactly `cc.adaliaadvisors.com`).
- **Palette / type:** no locked brand yet. Choose a restrained, professional palette (one ink/near-black, one accent, generous whitespace) and a clean, readable type pairing (a tasteful serif or grotesque for headings, a workhorse sans for body). Keep it editable from one `style.css`. Leave clear CSS custom properties (`--color-accent`, etc.) at the top so the owner can re-theme without hunting.

---

## 5. Tech stack & constraints

- **Static HTML only.** No React/Vue/Svelte, no bundlers, no Tailwind build, no npm.
- **One shared `style.css`.** Inline CSS only for genuine one-offs.
- **Shared header/footer without a build step.** The library is 40+ pages; do **not** hand-duplicate nav markup 40 times. Use a tiny vanilla-JS include: a single `nav.js` that injects a consistent header and footer into a `<div id="site-header"></div>` / `<div id="site-footer"></div>` on every page via `fetch('/partials/header.html')`. Keep the partials trivially hand-editable.
  - *Caveat to honor:* `fetch()` of partials fails over the `file://` protocol, so the site previews correctly only when served over HTTP (GitHub Pages, or a local `python3 -m http.server`). Note this in the README. If the owner prefers zero-JS, the fallback is duplicated markup — but default to the JS include.
- **Analytics:** GoatCounter (§10).
- **Mobile-responsive**, accessible (semantic HTML, alt text, sufficient contrast, keyboard-navigable).
- **No external runtime dependencies** beyond the GoatCounter script and the web3forms form action.

---

## 6. Information architecture

```
/                         Home
/about/                   The Concept (format, purpose, "Would I hire" round, lineage)
/library/                 Content Library landing — lists the 6 categories
  /library/scoping-diagnosis/
  /library/analysis-frameworks/
  /library/strategy-planning/
  /library/execution-change/
  /library/synthesis-communication/
  /library/session-kit/     Ready-to-run session artifacts (see §8) — 6th category
        └ each category page lists its content pages (see §7) and links to them
/library/<category>/<page>/   individual content pages (the full set in §7)
/learn-more/              Express-interest form (the "Learn More" CTA target)
```

Use clean directory-style URLs (`/library/analysis-frameworks/porters-five-forces/` with an `index.html` in each folder). Persistent top nav: **Home · The Concept · Library · Learn More** (Session Kit lives inside the Library, so it's reached from the Library landing rather than the top nav). The hero "Learn More" CTA and a secondary "Browse the Library" CTA appear on the home page.

---

## 6a. Build protocol (READ FIRST — how to build without thinning out)

This site has 30+ content pages. Do **not** attempt to generate everything in a single pass — that is how pages get stubbed and quality decays. Work in ordered phases and **stop at each checkpoint to report before continuing**.

**Review-in-Markdown workflow.** The owner reviews content as Markdown, not raw HTML. So for every content phase, the loop is:
1. **Draft the phase's content as a single Markdown file** deposited into a `/_review/` folder in the repo — e.g. `/_review/phase-3-analysis-frameworks.md` containing every content page for that category in full, following the §7a template.
2. **Stop. Checkpoint.** The owner reads the `.md`, marks it up or replies **"move along."**
3. **On approval, render that category's approved Markdown into the final HTML pages** under `/library/<category>/...`, then update the manifest.

This keeps the owner's review ergonomic (Markdown, in-repo, diff-able) and means HTML is only ever generated from approved content — no wasted HTML rebuilds.

**Phase 0 — Scaffold.** Build `style.css`, `nav.js`, `partials/header.html`, `partials/footer.html`, `CNAME`, `404.html`, `robots.txt`, `README.md`, the `/_review/` folder, and the empty folder structure for every page in §6 and §7. Create `BUILD-MANIFEST.md` listing every page with three status checkboxes each: `MD drafted [ ]` / `approved [ ]` / `HTML built [ ]`. **Checkpoint: show the manifest and confirm the structure before writing content.**

**Phase 1 — Shell pages.** Home, The Concept, Library landing, the 6 category landing pages, Learn More + thanks page. (These are short/structural — draft as MD to `/_review/phase-1-shell.md` for approval, then build HTML.) **Checkpoint.**

**Phases 2–7 — One library category per phase**, following the review-in-Markdown loop above. One category per phase keeps each page at full depth. **Checkpoint after each.**

**Phase 8 — Session Kit** (§8), same MD-first loop → `/_review/phase-8-session-kit.md`.

**Phase 9 — QA pass.** Re-read §7b. Verify: (a) no placeholder/stub text anywhere — every content section is real prose; (b) every framework attributed to the correct originator; (c) no invented ASINs — all Amazon links use the tagged-search format with `tag=adaliaworks-20`; (d) the Associates disclosure is in the footer; (e) nav/header/footer render consistently; (f) the form has the redirect field. Fix what fails. **Checkpoint: report the QA results.**

**Hard rules for the whole build:**
- **No placeholders, ever.** If you are running low on room or focus, *stop and say so* — leave the manifest honest rather than filling a page with `[Add overview here]` or one-paragraph stubs. A half-built site with honest status beats a "complete" site full of hollow pages.
- **Depth is the spec, not a nice-to-have.** Each content page is 500–900 words of real content matching the worked example in §7c.
- **Keep the manifest current** after every page so progress survives across sessions.
- If accuracy on a specific date/citation is uncertain, attribute at the confidence level you have (see §7b) — do not invent specifics to fill the template.

> *Note to the owner: because this is a multi-phase build, expect to run Claude Code over several turns/sessions, nudging it through the phases. The `/_review/` Markdown files are your review surface; the manifest is your tracking sheet. Plan to spot-check finished pages for date/attribution accuracy and click a few Amazon links — those are the two things most worth a human eye. The `/_review/` folder can stay in the repo as a content source of truth, or be deleted before going live; either is fine.*

---

## 7. The content library — full page list

Build a page for **every** item below. Category landing pages introduce the category (2–3 sentences) and link to their content pages in this order.

**A. Scoping & Diagnosis** — *getting to the real problem before solving the wrong one*
1. Problem Framing ("the question behind the question")
2. The Double Diamond (diverge/converge, twice: discover→define, develop→deliver)
3. Issue Trees & MECE
4. Hypothesis-Driven Approach
5. Stakeholder Mapping
6. Root-Cause Tools (5 Whys, Ishikawa / fishbone)
7. Scoping the Engagement (objectives, deliverables, out-of-scope)

**B. Analysis & Frameworks** — *the classic toolkit for making sense of a situation*
1. SWOT
2. Porter's Five Forces
3. PESTEL
4. Value Chain Analysis
5. BCG Growth-Share Matrix & GE/McKinsey Nine-Box
6. Ansoff Matrix
7. McKinsey 7S
8. Marketing Mix (4Ps / 7Ps) & Jobs-to-be-Done
9. Profit / Profitability Tree
10. Market Sizing & Estimation

**C. Strategy & Planning Methodologies** — *from analysis to a coherent direction*
1. OKRs
2. Balanced Scorecard
3. OGSM
4. Blue Ocean Strategy
5. Three Horizons
6. Scenario Planning
7. Wardley Mapping
8. Business Model Canvas

**D. Execution, Process & Change** — *because a recommendation no one can implement is worthless*
1. RACI
2. Kotter's 8 Steps & ADKAR
3. Lean / Value-Stream Mapping & Six Sigma (DMAIC)
4. Prioritization (Impact/Effort Matrix, MoSCoW, Weighted Scoring)

**E. Synthesis & Communication** — *often the difference between a good team and one you'd hire*
1. The Pyramid Principle (Minto)
2. Executive-Summary Discipline (the one-slide / one-page recommendation)
3. Storyboarding the Deck
4. The "So What?" Test

---

## 7a. Content page template (required structure for every framework page)

Each content page must follow this structure. Aim for a thorough, accurate overview — roughly 500–900 words — not a stub:

1. **Title + one-line definition.**
2. **Overview** — what it is, and its origin/attribution (who developed it, when, where it was first published). Get the attribution right.
3. **When to use it** — which engagement phase, what kinds of problems it fits, when *not* to reach for it.
4. **How it works** — the actual mechanics/steps, with any standard components named correctly.
5. **Running it in a Consulting Club session** — the practical, exercise-ready application: how a team would actually use this in the 90-minute format. This is what makes the library *ours* and not a textbook.
6. **Common pitfalls** — where people misuse it.
7. **References & further reading** — citations and links to authoritative sources (original papers/HBR articles, the originator's own work, reputable explainers). See §7b on accuracy.
8. **Recommended books** — 1–3 real, relevant books linked to Amazon with the affiliate tag (§7b).

Keep the structure visually consistent across all pages (shared CSS classes for the section headers, the "Run it in a session" callout box, and the references list).

---

## 7b. Accuracy, citations & Amazon affiliate links — important

- **Do not fabricate.** Attribute each framework to its real originator (e.g., Porter; Kaplan & Norton for the Balanced Scorecard; Kim & Mauborgne for Blue Ocean; Barbara Minto for the Pyramid Principle; Simon Wardley for Wardley Mapping; Osterwalder for the Business Model Canvas; etc.). If you are not confident of a specific date or citation, state the attribution at the level you're sure of rather than inventing specifics.
- **No invented quotes** and no invented ISBNs/ASINs.
- **Amazon affiliate code: `adaliaworks-20`.** Append it as a `tag` parameter to every Amazon link.
  - Preferred, breakage-proof format when you don't have a verified product URL: a tagged search link, e.g.
    `https://www.amazon.com/s?k=competitive+strategy+michael+porter&tag=adaliaworks-20`
  - If you reference a specific known edition by title, a product-search link in the format above is safer than guessing an ASIN. **Never** hard-code an ASIN you're not certain of.
- **Note for the owner (put in README):** Amazon's Operating Agreement requires an affiliate disclosure. Add a short disclosure line in the site footer, e.g. *"As an Amazon Associate, Consulting Club earns from qualifying purchases."*

---

## 7c. Worked example (match this depth & shape)

Use this as the quality/format bar for every content page. (Prose trimmed here for the brief; real pages should be fuller.)

> ### Porter's Five Forces
> *A framework for assessing the competitive intensity — and therefore the profit potential — of an industry.*
>
> **Overview.** Developed by Harvard Business School professor Michael E. Porter, introduced in a 1979 *Harvard Business Review* article and expanded in his 1980 book *Competitive Strategy*. It argues that industry profitability is shaped not just by direct rivals but by five forces collectively.
>
> **When to use it.** Early analysis, when a client asks "is this a good market to be in / stay in / enter?" Best for industry- or market-level questions; less useful for single-firm operational problems.
>
> **How it works.** Assess five forces: (1) competitive rivalry, (2) threat of new entrants, (3) threat of substitutes, (4) bargaining power of suppliers, (5) bargaining power of buyers. Rate each, then read the overall picture: many strong forces → structurally low profitability.
>
> **Running it in a session.** Assign each force to a team member for a timed 10-minute deep dive, then reconvene and force a single "structurally attractive / unattractive" verdict with a one-line "so what" for the Client. Resist letting the team list facts without reaching a judgment.
>
> **Common pitfalls.** Treating it as a static checklist; ignoring how forces interact; forgetting complements (the so-called "sixth force").
>
> **References & further reading.** Porter, "How Competitive Forces Shape Strategy," *HBR* (1979); Porter, *Competitive Strategy* (1980). [link to the HBR piece / reputable explainer]
>
> **Recommended books.**
> - *Competitive Strategy* — Michael E. Porter — `https://www.amazon.com/s?k=competitive+strategy+porter&tag=adaliaworks-20`
> - *Understanding Michael Porter* — Joan Magretta — `https://www.amazon.com/s?k=understanding+michael+porter+magretta&tag=adaliaworks-20`

---

## 8. Session Kit (`/library/session-kit/`)

The Session Kit is the **6th category inside the Library**. Its category page houses the reusable artifacts that make a session run. Build real first-draft content for each:

- **Client Brief Template** — a fill-in structure for the member playing Client to present a clean problem statement.
- **Role Cards** — Client, Lead Consultant, Analyst, Skeptic, Scribe (rotating); one short card each.
- **Starter Cases** — a small set (start with 4–6) of sanitized practice cases varied across industry and problem type, so a chapter never lacks material.
- **Timekeeper / Agenda Card** — the 90-minute structure broken into beats, plus the 15-minute debrief.
- **Debrief & "Would I Hire You?" Scorecard** — a light rubric across structure, insight, communication, teaming, presence.
- **Facilitator's Guide** — how to run a great room, common failure modes, how to keep it both safe and candid.

Make these printable/copyable (clean print CSS is a plus). Each artifact can be a sub-page under `/library/session-kit/` (mirroring how frameworks sit under their categories) or, where short, grouped onto the category page — use judgment, but keep the Starter Cases and Facilitator's Guide as their own sub-pages since they'll grow.

---

## 9. The "Learn More" CTA & contact form

The hero CTA ("Learn More" / "Express interest") points to `/learn-more/`, which contains the owner's web3forms form. Use this markup (his access key — note it is, by web3forms' design, public in the page source; that's expected):

```html
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="066147e1-8bd0-4135-add3-9ba1b2205a2c">
  <!-- recommended additions: -->
  <input type="hidden" name="subject" value="New Consulting Club interest">
  <input type="hidden" name="from_name" value="Consulting Club site">
  <!-- spam honeypot (web3forms convention) -->
  <input type="checkbox" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">

  <label>Name
    <input type="text" name="name" required>
  </label>
  <label>Email
    <input type="email" name="email" required>
  </label>
  <label>What interests you about Consulting Club?
    <textarea name="message" required></textarea>
  </label>
  <button type="submit">Learn More</button>
</form>
```

- Style the submit button as the primary CTA. Keep the honeypot hidden and the subject/from_name hidden fields (quality-of-life additions; remove if undesired).
- **On success, redirect to a thank-you page.** Add a hidden field `<input type="hidden" name="redirect" value="https://cc.adaliaadvisors.com/learn-more/thanks/">` so submission lands on `/learn-more/thanks/index.html` (a simple, friendly confirmation page with a link back to the Library). No JS required; degrades gracefully.

---

## 10. Analytics

Add the GoatCounter snippet to every page (inject it via the shared footer partial so it lives in one place). Leave the site code with a clearly marked placeholder for the GoatCounter site URL, e.g.:

```html
<script data-goatcounter="https://YOURCODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

Flag in the README that the owner must drop in his GoatCounter code.

---

## 11. Design direction

Clean, editorial, professional, calm. Strong typographic hierarchy, generous whitespace, comfortable line length (~65–75ch) on content pages. A simple, sticky-or-static top nav; a quiet footer with the Amazon disclosure and a copyright line. Library category pages can use a simple card grid; content pages are reading-first (single column). One accent color used sparingly for links and the primary CTA. No carousels, no modals-for-modals'-sake, no stock-photo clutter.

---

## 12. Repo / file structure & deployment

```
/
├── index.html
├── about/index.html
├── library/index.html
│   ├── scoping-diagnosis/index.html  (+ one folder per framework)
│   ├── analysis-frameworks/...
│   ├── strategy-planning/...
│   ├── execution-change/...
│   ├── synthesis-communication/...
│   └── session-kit/index.html        (+ sub-pages: starter-cases/, facilitators-guide/, etc.)
├── learn-more/index.html
│   └── thanks/index.html
├── partials/header.html
├── partials/footer.html
├── _review/         (per-phase Markdown drafts for owner review; not part of published site)
├── BUILD-MANIFEST.md
├── assets/style.css
├── assets/nav.js
├── CNAME            (contains: cc.adaliaadvisors.com)
├── 404.html
├── robots.txt
└── README.md        (deploy steps, GoatCounter setup, file:// caveat, affiliate disclosure note)
```

**Deployment (document in README):** zip the folder → upload/overwrite into the GitHub Pages repo → confirm `CNAME` present → GitHub Pages serves at `cc.adaliaadvisors.com`. Note that local preview needs `python3 -m http.server` (not `file://`) because of the partial includes.

---

## 13. Explicitly out of scope (do not build)

- **"Start your own chapter"** flow/CTA — deferred to a later version.
- **Sponsorship / advertising** of any kind — none, for the foreseeable future.
- **Payments, memberships, accounts, logins, paywalled/premium content** — none. The library is open.
- **Multi-chapter management, scaling tooling, facilitator certification** — future discussion, not now.
- **CMS / build step / framework** — none.

---

## 14. Assumptions to confirm (owner)

1. Library is **open and free** in v1 (no gating). ✅ confirmed
2. **Session Kit** sits **inside the Library as the 6th category**. ✅ confirmed
3. Form success **redirects to `/learn-more/thanks/`**. ✅ confirmed
4. Default header/footer via **vanilla-JS includes** (with the `file://` caveat), not hand-duplicated markup. ⬜ confirm
5. Amazon links default to **tagged search URLs** to avoid dead ASINs. ⬜ confirm
