# Machel Montano — "King of Soca" × Brooklyn Public Library
## Website Design Specification (design.md)

> Production-ready design system for the exhibition partnership site (Aug 21 – Sep 11, 2026, Central Library + Little Caribbean branches). This document is the single source of truth for the front-end build. All hex values, type sizes, spacing, and component specs below are canonical — use them exactly.

---

## 1. Brand Overview & Design Principles

The identity is **bold, cinematic, editorial, and unapologetically Caribbean-premium**. It pairs the high-energy heat of soca and carnival with the gravitas of a 44-year cultural legacy and the institutional weight of a major public library. The deck reads as a luxury cultural campaign, not a flyer: black-dominant, surgically accented in one electric red, set in heavy distressed display caps over clean neutral body copy.

The web adaptation must feel like the deck *moving* — the same restraint, the same red discipline, the same big-numeral drama, now responsive and interactive.

### Design Principles

1. **Dark-first, light-section inversion.** Pure black (`#000000`) is the default canvas and the brand's resting state. Light/white sections are deliberate inversions used for dense content (timelines, tables, concept copy) — they create rhythm, not the baseline.
2. **One red, used like a scalpel.** A single brand red is the *only* chromatic accent. It marks eyebrows, rules, active states, key figures, and the logo — never large fields except on intentional "flip" moments (Impact, King of Soca hero blocks). If red appears everywhere, the system fails.
3. **Heavy caps display vs. quiet neutral body.** Hierarchy is driven by *weight and case contrast*: distressed/heavy uppercase headlines against light sentence-case gray body. Two type tiers, no in-between noise.
4. **Editorial structure, generous air.** Strong flush-left alignment spine, consistent safe-area frame (logo top-left, footer bottom-left, page/section marker bottom-right), and confident whitespace. Content slides breathe.
5. **The numeral as architecture.** Zero-padded section numbers (`01`, `02`, `2.1`) and giant ghosted background numerals are structural motifs, not decoration. They organize the IA and add cinematic depth.
6. **Premium energy, never busy.** Carnival heat comes through high-contrast photography, distressed type texture, and motion — not through clutter, gradients, or multiple accent colors.

---

## 2. Color System

The palette is **black + white + one red + one blush accent + a disciplined gray ramp**, plus a small set of light surfaces. Black is the primary background. The canonical brand red is **`#E0241B`** (the most-used red in the source content streams); the other reds are documented variants and must NOT be used interchangeably in code — pick the token, not a random hex.

### 2.1 Core (Black / White)

| HEX | Token role | Usage notes |
|---|---|---|
| `#000000` | Pure black | Dominant page background; primary text on light surfaces; logo knockout base. |
| `#0E0E0E` | Black (raised) | Optional near-black for full-bleed hero/divider grounds that need a hair of separation from pure black. |
| `#141414` / `#151515` | Panel black | Slightly-raised dark panels/cards on a black ground (e.g., table header rows, dark cards). |
| `#1A1A1A` | Surface black | Highest dark surface — elevated cards, sticky nav background on scroll, ghost-numeral fill tint. |
| `#FFFFFF` | White | Text on dark; light-section background; logo on dark. |

### 2.2 Brand Red (single accent — canonical + variants)

| HEX | Token role | Usage notes |
|---|---|---|
| **`#E0241B`** | **Brand Red (canonical)** | THE accent. Eyebrows, underline rules, active TOC ticks, key figures, links, primary buttons, footer wordmark, logo red colorway. Use this everywhere a red is needed. |
| `#ED1C24` | Red (bright variant) | Reference only — appears in source as a brighter scarlet. Do not mix into the same view as canonical; reserved if a slightly brighter hover/active is ever needed. |
| `#E1251D` | Red (near-dupe) | Source variant, effectively identical to canonical. Treat as `#E0241B`. |
| `#D62C1F` | Red (deep) | Source variant; acceptable as a **pressed/active** darkening of the canonical red if a token is desired. |
| `#E60000` | Red (saturated) | Source variant; reference only. |
| `#C5150D` | Red (ink, a11y) | **Accessibility token** (`--color-accent-ink`). Use for *small* red text (eyebrows, year labels) on **light** grounds, where canonical `#E0241B` is only ~4.0:1 (fails AA). `#C5150D` reaches ~5:1 on white. Large red display text on light may stay `#E0241B`. |
| `#EE4A3F` | Red (on-dark, a11y) | **Accessibility token** (`--color-accent-on-dark`). Use for *small* red text (eyebrows, waypoint labels) on **dark** grounds, where canonical `#E0241B` is only ~3.7–4.4:1 (fails AA). `#EE4A3F` clears ≥4.5:1 on `#000`/`#141414`/`#1A1A1A`. Large red display text on dark may stay `#E0241B`. |

> **Rule:** In CSS there is exactly one `--color-accent` (`#E0241B`). The variants exist only to document the source and to justify the chosen hover/pressed shades below.

### 2.3 Accent (Blush / Salmon)

| HEX | Token role | Usage notes |
|---|---|---|
| `#F0B6B2` | Blush | Soft secondary accent. ONLY used as the fill of callout/NB note boxes, speech-bubble annotations, and rounded pull-quote/"Our Goal" banners. Always carries dark/black text. Never a page background, never type color for primary content. |
| `#F3EDED` | Blush-white | *Derived* warm off-white (not in the source palette; the deck's light fields are `#FFFFFF` / `#F5F5F5` / `#EDEDED`). Optional softer light-section background when pure white feels too clinical. |

### 2.4 Neutral / Gray ramp (de-emphasis hierarchy)

| HEX | Token role | Usage notes |
|---|---|---|
| `#333333` | Gray 900 | Body text on light surfaces (primary dark-gray copy). |
| `#3C3C3C` | Gray 850 | Heading sub-tone on light; dense table body text. |
| `#595959` | Gray 700 | Secondary body / captions on light. |
| `#6B6B6B` | Gray 600 | Muted labels, table source notes. |
| `#8C8C8C` | Gray 500 | Inactive TOC items; secondary footer tagline; muted UI. |
| `#939393` | Gray 450 | Body/description text on **dark** backgrounds (secondary tier under white). |
| `#9A9A9A` | Gray 400 | Inactive nav/TOC on dark; subtitles on dark. |
| `#D2D2D2` | Gray 200 | Hairline dividers on dark; faint borders; disabled text on dark. |

### 2.5 Surfaces (light)

| HEX | Token role | Usage notes |
|---|---|---|
| `#F5F5F5` | Surface 1 (light) | Zebra-stripe row shade in tables; subtle section background on light pages. |
| `#EDEDED` | Surface 2 (light) | Alternate zebra row; card backgrounds on light. |
| `#E2E2E2` | Surface 3 (light) | Hairline borders / dividers on light; input borders. |

### 2.6 Semantic tokens (CSS custom properties)

```css
:root {
  /* Core */
  --color-bg:            #000000; /* dark-first default canvas */
  --color-bg-raised:     #0E0E0E;
  --color-surface:       #141414; /* dark panels/cards */
  --color-surface-2:     #1A1A1A; /* elevated dark surface */
  --color-text:          #FFFFFF; /* primary text on dark */
  --color-text-muted:    #9A9A9A; /* secondary text on dark */
  --color-text-faint:    #6B6B6B;

  /* Accent (single red) */
  --color-accent:        #E0241B; /* canonical brand red */
  --color-accent-hover:  #ED1C24; /* slightly brighter on hover */
  --color-accent-active:  #D62C1F; /* pressed / darker */
  --color-accent-ink:    #C5150D; /* small red text on LIGHT grounds (AA) */
  --color-accent-on-dark:#EE4A3F; /* small red text on DARK grounds (AA) */

  /* Secondary accent */
  --color-blush:         #F0B6B2; /* callouts only */
  --color-blush-white:   #F3EDED; /* warm light field */

  /* Light theme (inverted sections) */
  --color-bg-light:      #FFFFFF;
  --color-bg-light-warm: #F3EDED;
  --color-text-on-light:        #000000;
  --color-text-on-light-body:   #333333;
  --color-text-on-light-muted:  #595959;

  /* Neutral surfaces (light) */
  --color-surface-light-1: #F5F5F5;
  --color-surface-light-2: #EDEDED;
  --color-border-light:    #E2E2E2;

  /* Hairlines on dark */
  --color-border-dark:     #2A2A2A;
  --color-divider-dark:    #D2D2D2;
}
```

> **Theming pattern:** Set `--color-bg`, `--color-text`, etc. at the section level. A `.section--light` class re-maps the tokens (e.g., `--color-bg: var(--color-bg-light); --color-text: var(--color-text-on-light)`) so components inherit the right colors without per-element overrides.

### 2.7 Accessibility & contrast guidance

- **White on black** (`#FFFFFF` / `#000000`): ratio ~21:1. Use freely for all text sizes.
- **Muted gray on black** (`#9A9A9A` / `#000000`): ~6.4:1 — passes AA for normal text; fine for secondary copy. Do **not** go below `#8C8C8C` for body-size text on black.
- **Brand red on black** (`#E0241B` / `#000000`): ~4.4:1. **Passes AA for large text (≥24px / ≥18.66px bold) and UI components, but is borderline for small body text.** Use red for eyebrows, large figures, rules, icons, and bold labels — **avoid red for long-form body copy on black.** For small red text on black, bump weight to bold and size ≥14px, or prefer white.
- **Brand red on white** (`#E0241B` / `#FFFFFF`): only ~4.0:1 — **fails AA for small text.** On light sections, render small red text (eyebrows, year labels) in the darker **`--color-accent-ink` (`#C5150D`, ~5:1)** instead. Large red display words inside headings (`h1`/`h2`) may remain `#E0241B` (large-text 3:1 bar).
- **Small brand red on dark** (`#E0241B` on `#000`–`#1A1A1A`): ~3.7–4.4:1 — **fails/borderline AA for small text** (eyebrows are 13px). Render small red text on dark in **`--color-accent-on-dark` (`#EE4A3F`)**, which clears ≥4.5:1 on all dark surfaces. Large red display text on dark may remain `#E0241B`.
- **Text on red** (`#E0241B`): use **white** (`#FFFFFF`, ~4.5:1 — AA) or **black** (`#000000`, ~4.8:1 — AA). Both pass; the deck uses black on red for headings and white knockout for labels. Prefer **black on red for large display**, **white on red for small/UI labels**.
- **Black text on blush** (`#000000` / `#F0B6B2`): ~14:1 — excellent. Always use dark text inside blush callouts; never white.
- **Focus states** must never rely on color alone — pair red focus rings with a visible outline offset (see §8 buttons).
- Distressed/textured display type must still meet contrast as if solid; do not let texture erode legibility at small sizes (texture is display-only).

---

## 3. Typography

The deck used **Arial Black (display) + Arial (body)** as a Google-Slides fallback, with a distressed/stencil treatment on headlines. For the web, recommend a **heavy grotesque display** + **clean neutral sans body** pairing that captures the heavy-caps energy with better rendering.

### 3.1 Font recommendations

| Role | Primary recommendation | Fallback stack | Notes |
|---|---|---|---|
| **Display / Headlines** | **Anton** (Google Fonts) — single ultra-condensed-ish heavy weight, perfect for big uppercase title energy | `"Anton", "Archivo Black", "Arial Black", system-ui, sans-serif` | For a more "Druk/Druk Wide" editorial feel, **Archivo Black** or licensed **Druk** are alternates. Anton is free + loads fast. |
| **Display alt (wide impact)** | **Archivo Black** | `"Archivo Black", "Arial Black", sans-serif` | Use for short hero words / numerals where Anton feels too narrow. |
| **Body / UI** | **Inter** (Google Fonts) | `"Inter", "Helvetica Neue", Arial, system-ui, sans-serif` | Clean neutral grotesque; excellent at small sizes. **Archivo** (regular) is an alternative that harmonizes with Archivo Black. **Helvetica Now** if licensed. |
| **Numerals (big motif)** | Same as display (Anton/Archivo Black) | — | Tabular figures for tables: use Inter with `font-variant-numeric: tabular-nums`. |

> **Distressed texture:** The deck's eroded/stamped edge is a *texture*, not a font. Reproduce it sparingly on the **hero wordmark and big section numerals only**, via a subtle grain/displacement (SVG `feDisplacementMap` or a PNG roughen mask), kept off small UI text for legibility. Default builds may ship clean Anton; texture is an enhancement layer.

### 3.2 Type scale

Base = 16px = 1rem. Scale below assumes desktop; see responsive note. Letter-spacing in em.

| Token | Element | Size (px / rem) | Weight | Line-height | Letter-spacing | Case |
|---|---|---|---|---|---|---|
| `display` | Hero title | 96 / 6.0 (clamp 48→96) | Anton 400 (reads heavy) | 0.95 | -0.01em | UPPERCASE |
| `numeral-xl` | Giant ghost numeral | 280 / 17.5 (clamp 160→320) | Anton 400 | 0.8 | 0 | — |
| `h1` | Page / major section title | 56 / 3.5 (clamp 36→56) | Anton 400 | 1.0 | 0 | UPPERCASE |
| `h2` | Sub-section title | 40 / 2.5 (clamp 28→40) | Anton 400 | 1.05 | 0 | UPPERCASE |
| `h3` | Block heading | 28 / 1.75 | Anton 400 / Inter 800 | 1.1 | 0 | UPPERCASE |
| `h4` | Card / label heading | 20 / 1.25 | Inter 700 | 1.2 | 0 | Sentence or CAPS |
| `body-lg` | Lead paragraph | 20 / 1.25 | Inter 400 | 1.55 | 0 | Sentence |
| `body` | Default body | 16 / 1.0 | Inter 400 | 1.6 | 0 | Sentence |
| `small` | Secondary / dense | 14 / 0.875 | Inter 400 | 1.5 | 0 | Sentence |
| `caption` | Photo captions, source notes | 12 / 0.75 | Inter 400 (italic for quotes/captions) | 1.45 | 0.01em | Sentence |
| `eyebrow` | Red section label | 13 / 0.8125 | Inter 700 | 1.2 | **0.16em** | UPPERCASE |
| `stat-figure` | Big metric number | 64 / 4.0 (clamp 40→64) | Anton 400 / Inter 800 | 1.0 | -0.01em | — |
| `stat-label` | Metric caption | 12 / 0.75 | Inter 600 | 1.3 | 0.12em | UPPERCASE |

> **Responsive:** Use `clamp()` for `display`, `numeral-xl`, `h1`, `h2`, `stat-figure`. Body sizes stay fixed. Below 600px, drop hero `display` to ~13vw and reduce eyebrow tracking to `0.12em`.

### 3.3 Signature type patterns

**Eyebrow label (the core motif):** red, uppercase, bold, letter-spaced, sits *directly above* the title with a small gap, optionally followed by the red underline rule beneath the title.

```css
.eyebrow {
  font: 700 0.8125rem/1.2 "Inter", sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 12px;
}
```

**Big-numeral motif:** zero-padded (`01`, `02`, `2.1`). Two uses: (a) inline structural numbers in TOC/lists (red, heavy); (b) **giant ghosted watermark** behind divider titles — fill `#1A1A1A` on black (barely-lighter-than-bg), positioned to bleed off the right edge, `z-index` below the title, `aria-hidden="true"`.

**Weight/case contrast in a single line:** bold red or white keyword + lighter gray descriptive tail (agenda rows, stat blocks). Achieve with nested `<strong>` (heavy) + `<span class="muted">` (gray, regular).

---

## 4. Layout & Grid

### 4.1 Container & columns

- **Max content width:** `1280px` (`--container-max`). Wide hero/full-bleed sections break out to `100vw`.
- **Grid:** 12 columns, `24px` gutter on desktop, `16px` on tablet, single column on mobile (<640px).
- **Outer page margin (safe area):** `clamp(20px, 5vw, 80px)` left/right — mirrors the deck's ~4–5% inset. Logo top-left, footer bottom-left, page/section marker bottom-right all align to this same inset.
- **Left alignment spine:** eyebrow, title, rule, and body all share the left margin. This is the dominant alignment; avoid centering except inside callouts and CTA banners.

### 4.2 Spacing scale (4 / 8 base)

| Token | px | Use |
|---|---|---|
| `space-1` | 4 | Icon gaps, tight inline |
| `space-2` | 8 | Eyebrow-to-title, chip padding |
| `space-3` | 12 | Label gaps |
| `space-4` | 16 | Default element gap, card padding (sm) |
| `space-5` | 24 | Card padding, grid gutter |
| `space-6` | 32 | Block spacing |
| `space-8` | 48 | Sub-section spacing |
| `space-10` | 64 | Section inner padding |
| `space-12` | 96 | Section vertical rhythm (desktop) |
| `space-16` | 128 | Major section separation / hero |

### 4.3 Section rhythm

- Vertical section padding: `clamp(64px, 10vw, 128px)` top & bottom.
- Alternate **dark** (default) and **light** sections to pace the page (dividers dark; timeline/tables/concept light), exactly as the deck alternates.
- Each content section opens with the **eyebrow + title + red-rule** header block.

### 4.4 Section-divider pattern (signature)

Reusable two-zone divider (from deck p03/p07/p09/p12/p26/p29):

- Full-bleed dark background.
- **Left ~40%:** vertical TOC/agenda nav list. Active item: white text + red number + red vertical tick bar. Inactive: gray.
- **Right ~60%:** red `SECTION 0X` eyebrow → huge title → red rule → one-line gray summary.
- **Behind the right title:** giant ghosted numeral (`#1A1A1A`) bleeding off the right edge.
- On web, this becomes either a true full-viewport section between content blocks, or a sticky scrolly chapter marker. Logo top-left, footer + marker bottom corners.

---

## 5. Iconography & Graphic Motifs

The geometry is **predominantly rectilinear** (rules, vertical bars, dots, rounded callouts). The title slide adds **angled corner wedges** as a hero-only flourish. Use motifs sparingly and consistently.

| Motif | Spec | Web usage |
|---|---|---|
| **Red underline rule** | `width: 56px; height: 4px; background: var(--color-accent);` short, thick, directly under title/eyebrow. | The single most repeated element — place under every section title. Animate width 0→56px on scroll-reveal. |
| **Red vertical tick** | `width: 4px; height: 1em (or full row); background: var(--color-accent);` | Active-state marker left of current TOC/nav/list item. |
| **Giant ghost numeral** | Anton, `#1A1A1A` on black, bleeds off right edge, `aria-hidden`, behind title. | Section dividers and chapter markers for depth. |
| **Full-height left edge bar** | `width: 4–6px; height: 100%; background: var(--color-accent);` on far-left of dark statement sections. | Signature accent for "statement" dark sections (deck p08, p18). |
| **Colored top rule (stat cap)** | `height: 4px` bar above a stat block; color-coded (red / black / gray) for data series. | Stat blocks and funding/data viz legends. |
| **Hairline divider** | `1px` `--color-border-light` (light) / `--color-border-dark` (dark). | Table rows, list separators. |
| **Angled corner wedge** | Clean 45° black triangle clipped into hero corners (`clip-path`). | HERO ONLY — top-left, top-right, bottom. Do not scatter elsewhere. |
| **Outline square accent** | Thin-stroke empty rectangle, small. | Sparingly in margins of framed-photo blocks (King of Soca). Optional. |
| **Middot separator** | ` · ` between wordmark and tagline / in eyebrow date ranges. | Footer lockup, eyebrow meta. |
| **Bullet hierarchy** | filled disc `●` → hollow `○` → small square `■`. | Three-tier nested lists. |
| **Distressed texture** | grain/erosion mask. | Hero wordmark + big numerals only. |

> **Do NOT** introduce chevrons everywhere, gradients, drop-shadows on dark surfaces (shadows are reserved for blush callouts on light grounds), or diamond/star ornaments. The crown logo is the only ornamental mark.

---

## 6. Logo

**Primary mark:** the **"MM" Crown** — two stylized `M` letterforms whose peaks read as a crown (three points + baseline bar), drawn with rough/distressed brush edges to match the display type.

### 6.1 Color variants (same mark, three colorways)

| Context | Colorway |
|---|---|
| On dark backgrounds | **White** knockout (`#FFFFFF`) — default interior/nav usage. |
| On light/blush backgrounds | **Black** (`#000000`). |
| Poster / featured lockups | **Red** (`#E0241B`), or red-peaks + black base for the Foundation lockup. |

### 6.2 Placement & clear space

- **Persistent placement:** top-left corner, within the safe-area inset, at a consistent small size (nav height ~`28–32px` mark height).
- **Clear space:** minimum = the height of one crown peak on all sides; nothing intrudes.
- **Minimum size:** `24px` height (digital). Below this, legibility of the distressed edges fails — use a simplified clean version if needed.
- **Cover/partnership lockup:** crown (white) + `MACHEL MONTANO` wordmark, locked up with partner marks (Foundation for Greatness, Brooklyn Public Library) with generous, equal clear space between each. Keep partner logos visually separated; never merge.
- **Footer/text wordmark:** `MACHEL MONTANO` in **red bold caps** + middot + gray tagline `Vision & Alignment for Consideration` — a text-only secondary lockup, distinct from the crown symbol.
- **Secondary seal:** the ornate circular sunburst badge (deck p01) may be used as a rare premium accent (e.g., a "seal of the exhibition" watermark) — not a primary logo.

### 6.3 Don'ts
Don't recolor outside the three colorways, don't add effects/glows, don't stretch, don't place the white mark on light grounds, don't crowd it with text.

---

## 7. Imagery & Photography

The deck's hero/portrait photography is **color but treated dark, high-contrast, near-monochrome**; venue/reference photos are **natural full color**. Red enters via graphic blocks *beside/behind* photos, plus one true **B&W headshot + red block** pairing.

### 7.1 Treatment guidance

- **Hero & artist portraits:** high-contrast, desaturated/near-monochrome color (warm skin tones retained), or true **B&W**. Crop bold and confident — subject fills frame, cut at the bleed.
- **Red pairing, not red overlay:** prefer placing a B&W portrait against / overlapping a solid **red block** (King of Soca pattern) rather than tinting the photo. A **red duotone** is acceptable as an *optional* stylized hover/section treatment, but the default is high-contrast color or B&W + red block — never a heavy red wash over everything.
- **Venue / site-survey / reference photos:** keep **full natural color**, hard-edged rectangles (no rounded corners, no borders), arranged in 2-up / 3-up rows in the lower band of content sections. Optional small **red caption labels** beneath ("Indoor spaces", "Potential space for Trini catering").
- **Full-bleed heroes:** edge-to-edge imagery with **angled black corner wedges** and a **gradient scrim** for text legibility.

### 7.2 Legibility scrims

Over any photo carrying text, apply a scrim:

```css
.hero__scrim {
  position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(0,0,0,0.65) 0%,
    rgba(0,0,0,0.15) 45%,
    rgba(0,0,0,0.85) 100%);
}
```

Adjust direction to the text anchor. Target ≥4.5:1 effective contrast for overlaid body text.

### 7.3 Framed photo + red block component
Solid red field with a **white-bordered (4–6px) B&W inset portrait** overlapping it; optional thin outline-square accents floating in the margin. Used for "King of Soca" and any marquee artist feature.

---

## 8. Components

All components inherit semantic tokens; specs below give sizing, color tokens, states, radius, and motion.

### 8.1 Top Nav / Header
- **Layout:** crown logo (white) top-left at safe-area inset; horizontal nav links right; optional red "Support / Tickets" button far right.
- **Background:** transparent over hero; on scroll past hero, becomes `--color-surface-2` (`#1A1A1A`) with a `1px` `--color-border-dark` bottom hairline. Height `72px` (desktop), `56px` (mobile).
- **Links:** `body` size, Inter 600, `--color-text`; hover → `--color-accent` with a 2px red underline animating in (left→right, 180ms).
- **Active page:** red text + persistent red underline.
- **Mobile:** hamburger → full-screen black overlay menu, large uppercase Anton links, eyebrow section numbers in red.

### 8.2 Hero
- Full-bleed dark, photo + angled black corner wedges + scrim.
- Stack: red eyebrow → giant Anton title (`display`) possibly with keyword in red → short red rule → `body-lg` gray supporting line → CTA row (primary red + secondary outline).
- Optional full-height red left-edge bar.
- Crown + stacked wordmark lockup in a top-left black wedge.

### 8.3 Section Header (eyebrow + title + red rule)
The universal block. Markup:
```html
<header class="section-header">
  <p class="eyebrow">SECTION 02 · THE EXHIBITION</p>
  <h2 class="section-header__title">The Exhibition in NY</h2>
  <span class="rule rule--red"></span>
  <p class="section-header__lede body-lg muted">One-line summary sits here.</p>
</header>
```
- `.rule--red`: `56px × 4px`, `--color-accent`, `margin: 16px 0 24px`.
- Title color: white on dark, black on light. Case: uppercase for sections; sentence case allowed for softer titles (deck p07).

### 8.4 Stat / Metric Block
- Layout: optional colored **top rule** (4px) → big `stat-figure` (Anton or Inter 800) → `stat-label` (uppercase, tracked, gray) → optional small descriptor.
- Grids: 2-up, 3-up, or 4-up; hairline separators between cells.
- Figures (`50+`, `1.4MM+`, `$302,000`) in **white on dark** or **red for key/highlight figures**.
- Left red accent bar variant for "benefit cards" (3×2 grid): `4px` red left edge + bold title + gray description.

### 8.5 Timeline (Brooklyn Roots)
- Vertical spine: `2px` line (`--color-border-dark` on dark / `#000` on light).
- Each event: **red dot** marker (`12px` circle, `--color-accent`) on the spine + **right-aligned red year label** + bold event title + gray one-line description.
- Even baseline rhythm; supports `(1/2)`/`(2/2)` continuation.
- Scroll-reveal: dots pop + rows fade-up in sequence.
- Closing **blush callout banner** for the takeaway line.

### 8.6 Data / Budget Table
- **Header row:** solid black (`#000`/`#141414`) bar, white bold uppercase labels.
- **Body rows:** zebra striping — `#FFFFFF` / `#F5F5F5` (light) ; on dark use `#141414` / `#1A1A1A`.
- **Values:** dollar figures bold; **key totals in red**.
- **Total bar:** full-width black bar, white label left, **red figure** right.
- Hairline `1px` `--color-border-light` row separators; `tabular-nums`.
- Source/caption note below in gray italic `caption`.

### 8.7 Pricing / Sponsorship Tier Cards
- **Table form** (deck p31/p32): black header row (`Package | Investment | What you receive`), zebra body rows, named Soca/Carnival tiers, **bold red price ranges**.
- **Card form** (web upgrade): dark card (`--color-surface`, radius `8px`, `1px --color-border-dark`), eyebrow tier name → big red price → feature list (disc bullets) → CTA. Featured tier ("King of Soca") gets a red top rule + red border + subtle scale.
- Hover: border → red, lift `translateY(-4px)`, 200ms.

### 8.8 CTA Banner
- Full-width. Two variants:
  - **Red flip:** solid `--color-accent` background, black or white display text, white/black button — high-impact "Support" moment.
  - **Dark:** black background, red rule, white title, red primary button.
- Center or left-aligned; generous padding `space-12`.

### 8.9 Footer
- Dark (`#000`). Left: red bold `MACHEL MONTANO` wordmark + middot + gray tagline; partner logos row (white); nav links; legal in gray `caption`.
- Page/section marker bottom-right echoing the deck's page number.

### 8.10 Buttons

| Variant | Default | Hover | Active/Pressed | Focus | Disabled |
|---|---|---|---|---|---|
| **Primary (red)** | bg `--color-accent`, text `#FFF`, radius `4px`, padding `14px 28px`, Inter 700, uppercase, `0.04em` tracking | bg `--color-accent-hover`, `translateY(-1px)` | bg `--color-accent-active` | `2px` white outline + `2px` offset + red glow-free ring | bg `#3C3C3C`, text `#8C8C8C` |
| **Secondary (outline)** | transparent, `1.5px` `--color-text` border, text `--color-text` | border + text → `--color-accent` | bg `rgba(224,36,27,0.1)` | same focus ring | border/text `#6B6B6B` |
| **Ghost / link** | text `--color-accent`, no bg | underline animates in | — | underline + outline | `#6B6B6B` |

- Transitions: `all 180ms cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Radius standard `4px`; pills (`badges`) `999px`.

### 8.11 Badges / Pills / Callouts
- **Eyebrow chip:** red text, optional `1px` red border, uppercase tracked.
- **Date/status pill:** `999px`, `--color-accent` bg, white text, `small` size (e.g., `APR 2026`).
- **Blush callout / takeaway banner:** `--color-blush` bg, black text, radius `12px`, soft drop shadow (`0 8px 24px rgba(0,0,0,.15)`), bold underlined label + body. The deck's "Our Goal" / key-takeaway device (e.g. timeline closing bar, p11/p25). Speech-bubble variant adds a pointed tail. **Light grounds only** (shadows don't read on black).
- **"NB:" note box:** the deck's annotation device (p19–p23) — `1px dashed --color-accent` (red) border, **red text**, on white/very-pale fill, no shadow. Used for small editorial notes. Keep distinct from the blush takeaway banner.

---

## 9. Motion & Interaction

Energetic but premium — quick, confident, never bouncy-cartoonish.

- **Durations:** micro (hover/focus) `150–200ms`; entrances/reveals `400–600ms`; hero/large transitions `600–800ms`.
- **Easing:** standard `cubic-bezier(0.2, 0.8, 0.2, 1)` (decelerate); exits `cubic-bezier(0.4, 0, 1, 1)`. For *youthful* card hovers use `--ease-spring` (a gentle overshoot) — kept subtle, premium not bouncy.
- **Signature touches (subtle, premium):** card hovers lift with `--ease-spring`; red section rules draw in on reveal (`ruleGrow`); stat figures get a soft scale-bounce when revealed (`statPop`); the bridge marker leaves a faint lagging red trail (`.bridge__trail`, longer transition than the dot). All disabled under `prefers-reduced-motion`.
- **Scroll-reveal:** fade + `translateY(24px→0)`, stagger children by `60–80ms`. Red rules animate `width 0→56px`. Stat figures count up on first view. Timeline dots scale-in `0→1`.
- **Ghost numerals:** subtle parallax (slower scroll than foreground) for cinematic depth.
- **Hero:** slow scrim/scale (Ken Burns ~`1.0→1.06` over 12s) optional; corner wedges can wipe in on load.
- **Hover:** links red-underline wipe; cards lift `-4px` + border→red; buttons `translateY(-1px)`.
- **Page transitions (if SPA):** quick black wipe with a red rule sweep.
- **Respect `prefers-reduced-motion`:** disable parallax, count-ups, Ken Burns, and large translates; keep opacity fades only.

---

## 10. Suggested Site Structure / IA

Mapping the deck's IA (Legacy → Impact → Brooklyn roots → Concept/Spaces → Budget → Sponsorship) to web pages/sections.

| Page / Section | Source slides | Pattern |
|---|---|---|
| **Home / Hero** | p01, p08 | Full-bleed dark hero, crown lockup, eyebrow, giant title, red rule, partnership marks, CTA → Support. |
| **The King of Soca (Legacy)** | p03, p04, p06 | Dark; framed B&W portrait + red block; bio with red keywords; documentary feature card ("Like Ah Boss"). |
| **Impact / By the Numbers** | p05 | Inverted/blush stat section: stat grid (50+ shows, 1.4MM+ audience, 7×/12× titles, 45 albums) + social-stats list + device mockup; red date pill. |
| **Brooklyn Roots (Timeline)** | p10, p11 | Light; vertical red-dot timeline 1984→2026; blush takeaway callout. |
| **The Exhibition** | p09, p12, p13 | Section divider + light "Concept" content; red lead-in line + bullet list; blush "Our Goal" banner. |
| **Visit / Spaces & Branches** | p14–p23 | Light content; Central Library + Little Caribbean branch profiles; full-color reference photo rows with red captions; NB callouts; map/branch list. |
| **Strategic Opportunities / Considerations** | p24, p25 | Light; multi-level bullets; blush speech-bubble + "Our Goal" banner. |
| **Budget** | p26, p27, p28 | Divider + budget tables (zebra, black total bar, red figures) + funding-split stat row + bar chart (black/red/gray series). |
| **Support / Sponsorship** | p29–p32 | "Why Partner" stats + benefit cards; sponsorship tier cards/table (red prices); branch-level entry points; CTA banner (red flip). |
| **What Your Support Funds** | p33 | Numbered list (red 01–04) + full-width blush pull-quote bar. |
| **Partners** | p08 lockup | Foundation for Greatness + Brooklyn Public Library lockups, clear-spaced. |
| **Contact / Brochure** | p34 | CTA + downloadable brochure; contact form (dark, red accents). |
| **Global** | all | Sticky nav, footer wordmark + tagline, page/section markers, section dividers between major areas. |

---

## 11. Implementation Notes

### 11.1 Ready-to-paste `:root`

```css
:root {
  /* ============ COLOR ============ */
  /* Core */
  --color-bg:            #000000;
  --color-bg-raised:     #0E0E0E;
  --color-surface:       #141414;
  --color-surface-2:     #1A1A1A;
  --color-text:          #FFFFFF;
  --color-text-muted:    #9A9A9A;
  --color-text-faint:    #6B6B6B;

  /* Brand red (single accent) */
  --color-accent:        #E0241B;
  --color-accent-hover:  #ED1C24;
  --color-accent-active: #D62C1F;
  --color-accent-ink:    #C5150D; /* small red text on light grounds (AA) */
  --color-accent-on-dark:#EE4A3F; /* small red text on dark grounds (AA) */

  /* Secondary accent */
  --color-blush:         #F0B6B2;
  --color-blush-white:   #F3EDED;

  /* Light theme */
  --color-bg-light:        #FFFFFF;
  --color-bg-light-warm:   #F3EDED;
  --color-text-on-light:        #000000;
  --color-text-on-light-body:   #333333;
  --color-text-on-light-muted:  #595959;

  /* Surfaces / borders */
  --color-surface-light-1: #F5F5F5;
  --color-surface-light-2: #EDEDED;
  --color-border-light:    #E2E2E2;
  --color-border-dark:     #2A2A2A;
  --color-divider-dark:    #D2D2D2;

  /* Gray ramp */
  --gray-900: #333333;
  --gray-850: #3C3C3C;
  --gray-700: #595959;
  --gray-600: #6B6B6B;
  --gray-500: #8C8C8C;
  --gray-450: #939393;
  --gray-400: #9A9A9A;
  --gray-200: #D2D2D2;

  /* ============ TYPOGRAPHY ============ */
  --font-display: "Anton", "Archivo Black", "Arial Black", system-ui, sans-serif;
  --font-body:    "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;

  --fs-display:    clamp(3rem, 9vw, 6rem);
  --fs-numeral-xl: clamp(10rem, 24vw, 20rem);
  --fs-h1:         clamp(2.25rem, 6vw, 3.5rem);
  --fs-h2:         clamp(1.75rem, 4.5vw, 2.5rem);
  --fs-h3:         1.75rem;
  --fs-h4:         1.25rem;
  --fs-body-lg:    1.25rem;
  --fs-body:       1rem;
  --fs-small:      0.875rem;
  --fs-caption:    0.75rem;
  --fs-eyebrow:    0.8125rem;
  --fs-stat:       clamp(2.5rem, 6vw, 4rem);

  --lh-tight: 1.0;
  --lh-snug:  1.2;
  --lh-body:  1.6;
  --ls-eyebrow: 0.16em;
  --ls-label:   0.12em;

  /* ============ SPACING (4/8) ============ */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-8: 48px;  --space-10: 64px;
  --space-12: 96px; --space-16: 128px;

  --container-max: 1280px;
  --page-inset: clamp(20px, 5vw, 80px);
  --grid-gutter: 24px;

  /* ============ RADIUS ============ */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 999px;

  /* ============ SHADOWS (light grounds / callouts only) ============ */
  --shadow-callout: 0 8px 24px rgba(0,0,0,0.15);
  --shadow-card:    0 4px 16px rgba(0,0,0,0.20);

  /* ============ MOTION ============ */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in:  cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* gentle overshoot for youthful card hovers */
  --dur-micro: 180ms;
  --dur-reveal: 500ms;
  --dur-hero: 700ms;

  /* ============ MOTIF SIZES ============ */
  --rule-w: 56px;
  --rule-h: 4px;
  --tick-w: 4px;
}

/* Light section inversion: re-map tokens, components inherit */
.section--light {
  --color-bg:         var(--color-bg-light);
  --color-text:       var(--color-text-on-light);
  --color-text-muted: var(--color-text-on-light-muted);
  --color-surface:    var(--color-surface-light-1);
  --color-surface-2:  var(--color-surface-light-2);
  --color-border-dark: var(--color-border-light);
  background: var(--color-bg);
  color: var(--color-text);
}
.section--light-warm { --color-bg-light: var(--color-bg-light-warm); }
```

### 11.2 Tailwind token mapping

```js
// tailwind.config.js — theme.extend
export default {
  theme: {
    extend: {
      colors: {
        bg:        '#000000',
        'bg-raised':'#0E0E0E',
        surface:   '#141414',
        'surface-2':'#1A1A1A',
        accent: {
          DEFAULT: '#E0241B',  // brand red (canonical)
          hover:   '#ED1C24',
          active:  '#D62C1F',
        },
        blush:      '#F0B6B2',
        'blush-white':'#F3EDED',
        ink:        '#000000',
        paper:      '#FFFFFF',
        gray: {
          900:'#333333', 850:'#3C3C3C', 700:'#595959', 600:'#6B6B6B',
          500:'#8C8C8C', 450:'#939393', 400:'#9A9A9A', 200:'#D2D2D2',
        },
        surf: { 1:'#F5F5F5', 2:'#EDEDED', 3:'#E2E2E2' },
      },
      fontFamily: {
        display: ['Anton', 'Archivo Black', 'Arial Black', 'sans-serif'],
        body:    ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        display:  ['clamp(3rem,9vw,6rem)',   { lineHeight: '0.95' }],
        'num-xl': ['clamp(10rem,24vw,20rem)',{ lineHeight: '0.8' }],
        h1: ['clamp(2.25rem,6vw,3.5rem)',    { lineHeight: '1.0' }],
        h2: ['clamp(1.75rem,4.5vw,2.5rem)',  { lineHeight: '1.05' }],
        h3: ['1.75rem', { lineHeight: '1.1' }],
        h4: ['1.25rem', { lineHeight: '1.2' }],
        'body-lg': ['1.25rem', { lineHeight: '1.55' }],
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        caption: ['0.75rem', { lineHeight: '1.45' }],
        eyebrow: ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.16em' }],
        stat: ['clamp(2.5rem,6vw,4rem)', { lineHeight: '1.0' }],
      },
      letterSpacing: { eyebrow: '0.16em', label: '0.12em' },
      spacing: {
        1:'4px',2:'8px',3:'12px',4:'16px',5:'24px',6:'32px',
        8:'48px',10:'64px',12:'96px',16:'128px',
        'page-inset':'clamp(20px,5vw,80px)',
      },
      maxWidth: { container: '1280px' },
      borderRadius: { sm:'4px', md:'8px', lg:'12px', pill:'999px' },
      boxShadow: {
        callout:'0 8px 24px rgba(0,0,0,0.15)',
        card:'0 4px 16px rgba(0,0,0,0.20)',
      },
      transitionTimingFunction: {
        out:'cubic-bezier(0.2,0.8,0.2,1)',
        in:'cubic-bezier(0.4,0,1,1)',
      },
      transitionDuration: { micro:'180ms', reveal:'500ms', hero:'700ms' },
    },
  },
};
```

### 11.3 Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
```
Use `font-display: swap`; Arial Black / Arial are the metric-compatible system fallbacks matching the original deck.

### 11.4 Build checklist
- [ ] Black is the default `<body>` background; light sections opt in via `.section--light`.
- [ ] Exactly one accent red token in use (`#E0241B`); variants documented, not scattered.
- [ ] Every section header = eyebrow (red, tracked, caps) + title + 56×4 red rule.
- [ ] Red reserved for accents/large text/UI — never small body on black.
- [ ] Blush only inside callouts on light grounds (with shadow); never as page bg or body text.
- [ ] Crown logo: white on dark / black on light / red on poster; min 24px; clear space respected.
- [ ] Reference photos full-color, hard-edged, in rows; hero/portraits high-contrast B&W or color + red block.
- [ ] `prefers-reduced-motion` honored.
- [ ] Tables: black header, zebra rows, red key figures, black total bar.
- [ ] Ghost numerals `aria-hidden`; eyebrows are real text, not images.
```
