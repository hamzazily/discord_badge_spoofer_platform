# Badgecraft

A complete static frontend for exploring Discord's evolving badges. Built for Sites with no runtime dependencies or account integrations.

## Run and build

Use Node.js 18+ for validation and Python 3 for the local static server.

```sh
npm run build
npm run dev
```

Open `http://127.0.0.1:4173`. The ready-to-host application is in `dist/`. Sites identity and static directory are declared in `.openai/hosting.json`. No package installation is necessary.

## Source structure

- `dist/index.html`: semantic page structure, metadata, guide, editor shell, credits, and navigation.
- `dist/style.css`: responsive design tokens, sections, interactions, and reduced-motion rules.
- `dist/featured-profile.css`: isolated amber community spotlight, leaving the editable playground's styles intact.
- `dist/data.js`: four collections, 40 community-documented levels, sources and FAQs.
- `dist/app.js`: reusable renderers, explorer, profile state, keyboard controls, and animation observers.
- `dist/community-tools.js` and `.css`: the merged six-step guide, safe Python highlighting, source loading/integrity verification, and complete-file copy handling.
- `dist/community/`: the unmodified Python source, checksum manifest, and original MIT license.
- `dist/assets/`: local badge artwork, original identity/avatar, fonts, licenses, and social preview.
- `scripts/validate.mjs`: static distribution checks.

## Data and artwork provenance

Official mechanics checked October 27, 2026:

- https://support.discord.com/hc/en-us/articles/44369363856663-Discord-Profile-Badges-What-Each-Badge-Means
- https://support.discord.com/hc/en-us/articles/44393096706583-How-to-Manage-Your-Discord-Profile-Badges
- https://support.discord.com/hc/en-us/articles/21865322754327-Data-Used-to-Personalize-Discord

The full ten-tier tables are **community documented**, not enumerated in Discord's official guide. Names and thresholds come from https://github.com/EliteZilla/Discord-Badges#experimental-tier-galleries and were cross-checked against https://communityone.io/en/servers/1247694722173108254/infinity-hub-tm/news/discord-evolving-profile-badges-explained-2026-09-02/. Game Time level nine uses the archive's spelling “Unshakeable.” Requirements and availability can change; the visitor's Badge Directory takes precedence.

Badge PNGs are Discord artwork mirrored from https://github.com/dev-hoehle/discord-badges/tree/main/png. The website does not claim ownership of Discord's marks. The custom avatar and Badgecraft identity are original unofficial SVG geometry. DM Sans and Space Grotesk are self-hosted Google Fonts; their OFL licenses are included in `dist/assets/`.

The hero now features UnkindledOne, adapted from the user's supplied Discord profile reference. Its panoramic sunset and transparent autumn avatar were created with the built-in image_gen tool; optimized WebP versions are local assets. Exact prompts and provenance are in `dist/assets/unkindled-artwork.json`. Lilita One supplies the hero nickname's rounded lettering, with its OFL license included. The fixed hero and editable playground have independent identity, banner, and badge state. Featured badge styles open the explorer without changing the visitor's selected levels. The “A profile that feels like you” section and its shared stylesheet were preserved byte-for-byte.

## Adding a collection or level

Add an entry in `badges` in `dist/data.js` with an ID, name, unit, theme, description, mechanic, and levels containing name, numeric threshold, and local image path. Adjust the validation count when intentionally changing the catalog. Current UI levels use ten steps. Keep threshold provenance visibly identified. Brand copy is ordinary text in the HTML and data module, ready for replacement.

## Community script viewer

The original `dist/community/spoofer.py` is the single source for display, download, and clipboard copying. `script-manifest.json` stores its SHA-256, byte count, and line count. A deliberately replaced source file must have its manifest regenerated and its documentation reviewed; the build rejects a mismatch. The browser also checks the manifest before enabling copy.

The Python program is never evaluated or launched by the website. It requires Python 3.10+, account credentials, network access, and a writable local folder when the visitor independently runs it. Its optional fingerprint generator needs Windows/PowerShell. The website contains no credential inputs or Discord API integration. See `docs/script-review.md` for the complete review, README discrepancies, plaintext credential storage, third-party request, and unverified claims.

The existing code box is retained, with Python highlighting, complete-file copying, a manual-copy fallback inside that same editor, loading/error states, source verification, and expansion. The old guide and tools section share one six-step guide while legacy anchors remain valid. `community-tools.css` is scoped to this experience except for a navigation visibility correction required by the merged menu.

## Verification

Desktop browser interaction checks covered all final tiers, tab and range keyboard controls, apply-to-profile, safe name rendering, banner changes, hidden badges and the empty state, reset, FAQ, code expansion, clipboard copying, and mobile navigation. Responsive widths: 320, 390, 768, 1024, and 1440 pixels. Reduced motion was verified. Browser console: no errors or warnings. See `QA.md` for limitations.

## Creator credit and navigation

The footer credits Nameless and links UnkindledOne to the existing featured profile card. The primary navigation CTA opens `#script-editor` directly. The former bottom milestone banner and verbose attribution paragraph under the editor have been removed; the original source and MIT license remain distributed unchanged.
