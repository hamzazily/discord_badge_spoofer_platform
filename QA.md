# Validation record

Checked in Chromium through browser automation on October 27, 2026.

- All four final tiers update the image, name, metric, slider, and selected milestone.
- Badge tabs support arrows, Home, and End. The native slider supports keyboard operation.
- Apply-to-profile updates and reveals the selected badge on both previews, including mobile.
- Display names render as text; an HTML-shaped test string did not create markup.
- Banner themes, per-badge selectors, visibility checkboxes, all-hidden empty states, and reset work.
- FAQ expansion updates ARIA state; copy and editor expansion work.
- Clipboard success was observed in the browser. A manual selection fallback is implemented for unavailable clipboard access.
- Mobile navigation opens, closes on selection, and supports Escape and outside clicks.
- No page horizontal overflow at 320, 390, 768, 1024, or 1440 pixels after settling.
- Reduced motion changes animations to near-zero duration.
- Local asset checks cover all 40 PNGs. Console showed zero errors or warnings.

No Discord account was connected, no script was executed, and no real badge progression was tested or implied. Safari and Firefox were not separately tested. Full tier tables are community references rather than official guarantees. The optional Impeccable detector could not run because its engine is not installed; visual and interaction checks were performed directly in the browser.

## Featured-profile update

- The customization section HTML and shared stylesheet were compared against the previous deployed source and remain byte-for-byte unchanged.
- All four featured badge buttons open their intended tiers without applying them to the visitor's profile.
- Visitor name, banner, badge visibility, and reset controls still work and leave the featured identity and artwork unchanged.
- New WebP assets and the local Lilita One font load successfully. Avatar transparency is preserved.
- Fine-pointer parallax is active; reduced motion disables the added sunset and ember animations.
- Layout checked at 320, 390, 768, 1024, and 1440 pixels. No page overflow; the tablet floating badge was repositioned to keep the status readable.
- Browser console: zero warnings and errors in the update checks.

## Community script integration

The original 938-line, 34,982-byte Python file and the browser clipboard share SHA-256 `665eedc74102e15115cf6914797e78f4d50665d47b588cf2e0c7166387d472e2`. The Python program was not run and no account credentials were used. Full details are in `docs/script-review.md`.

The single existing editor displays all lines with escaped Python highlighting. Six numbered steps support mouse/touch, arrow keys, Home/End, and previous/next controls. Copy-script, command copy, expand/collapse, failed-source retry, and same-length tampering rejection passed. Missing/unverified source disables copy. Five responsive widths passed with no page overflow. The hero, badge gallery, progression, profile playground, FAQ, shared stylesheet, and featured-profile stylesheet are unchanged against the previous source. Legacy anchors resolve to the merged guide.

## Footer and script CTA update

The primary header action is “Get script” and targets the existing script editor. The footer displays “Made by Nameless” with an UnkindledOne link to the featured profile card. The requested attribution paragraph and bottom milestone banner are removed. The original Python source and MIT license remain unchanged. Production validation and all four source-viewer tests passed.
