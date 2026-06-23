# Consulting Club

Static website for Consulting Club, served at **cc.adaliaworks.com**.

## Local preview

`nav.js` loads the shared header and footer via `fetch()`, which requires HTTP — not `file://`. To preview locally:

```
cd "Consulting Club"
python3 -m http.server 8080
```

Then open **http://localhost:8080**. The nav and footer will render correctly.

## Deployment (GitHub Pages)

1. Push the repo to GitHub (or copy contents into your GitHub Pages repo).
2. Confirm `CNAME` contains exactly `cc.adaliaworks.com`.
3. In the repo Settings → Pages, set source to the `main` branch root.
4. GitHub Pages will serve the site at `cc.adaliaworks.com` once DNS propagates.

## Before launch — two things to configure

### GoatCounter analytics

Already configured. The script in `partials/footer.html` points to `https://consultingclub.goatcounter.com/count` and will fire on every page once the site is live.

### Amazon affiliate tag

Book links use tagged Amazon search URLs with the tag `tmiller0e-20`. This tag is already embedded in every book link across the library. No changes needed unless you want to update the tag — if so, find-and-replace `tmiller0e-20` across all HTML files.

**Affiliate disclosure** (required by Amazon's Operating Agreement) is already in the site footer via `partials/footer.html`.

## File structure

```
assets/style.css     All styles. Edit :root custom properties to re-theme.
assets/nav.js        Injects shared header/footer on every page via fetch().
partials/            header.html and footer.html — edit once, applies everywhere.
_review/             Markdown drafts used during the content build process.
                     Safe to delete before going live, or leave as content source.
BUILD-MANIFEST.md    Per-page build status tracker.
CNAME                GitHub Pages custom domain — do not edit.
```

## Re-theming

All colors and fonts are CSS custom properties at the top of `assets/style.css`. Change the values in `:root` to re-theme the entire site without touching any HTML.
