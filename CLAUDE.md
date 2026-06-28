# Machel Montano — "King of Soca" × Brooklyn Public Library — Website

## ⚠️ Design rule (always)

**Before creating, generating, or modifying ANY design, UI, page, component, layout, style, or visual asset for this project, READ [`design.md`](design.md) first and follow it.**

`design.md` is the single source of truth for the brand and design system. It was reverse-engineered from the client's pitch deck, and its color hex values and fonts were extracted programmatically (exact, not eyeballed). Do not invent colors, fonts, spacing, or component patterns that contradict it.

Quick reference (full detail in `design.md`):
- **Dark-first**: black `#000000` is the default canvas; white sections invert for dense content.
- **One accent red**: `#E0241B` only. Documented variants are not interchangeable in code.
- **Blush `#F0B6B2`**: callout / takeaway banners only — never a page background or body text.
- **Type**: heavy uppercase grotesque display (Anton / Archivo Black) + Inter body.
- **Signature**: red eyebrow label → title → 56×4 red underline rule; giant ghost numerals; red-dot timeline.
- Use the paste-ready `:root` CSS variables and Tailwind token config in `design.md` §11 rather than hardcoding values.

If `design.md` ever conflicts with a new request, surface the conflict instead of silently diverging — and update `design.md` if the change is intentional.
