---
name: "Badgecraft"
description: "A midnight collector gallery for evolving Discord badges and simulated profiles."
colors:
  bg: "#0d0e16"
  surface: "#151620"
  raised: "#1b1c29"
  line: "#292a3a"
  text: "#f0eff8"
  muted: "#a5a5b9"
  faint: "#85859d"
  accent: "#a89cff"
  blurple: "#5865f2"
  banner: "#8072d7"
  variety: "#6ce2ce"
  streaming: "#ef9edc"
  account-age: "#f3ca7b"
  banner-ocean: "#4e88b8"
  banner-rose: "#b7749f"
  banner-forest: "#518e82"
  banner-ember: "#ae8053"
  white: "#fff"
  focus: "#b5a8ff"
  button-hover: "#6a76ff"
  quiet-bg: "#1a1b28"
  quiet-text: "#dddced"
  field-bg: "#11121a"
  field-text: "#ddd6eb"
  tab-selected-bg: "#292438"
  tab-selected-text: "#d3c7ff"
  profile-bg: "#20202d"
  badge-card-bg: "#15151f"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(46px,4.85vw,68px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.1em"
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 700
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "11px"
    lineHeight: 2
rounded:
  micro: "4px"
  check: "5px"
  chip: "6px"
  field: "7px"
  button: "8px"
  milestone: "9px"
  card: "12px"
  panel: "14px"
  floating: "16px"
spacing:
  micro: "4px"
  compact: "8px"
  control-gap: "12px"
  card-gap: "18px"
  card-inset: "20px"
  section-heading-gap: "28px"
  section-heading-bottom: "34px"
  workbench-gap: "80px"
  section-top: "100px"
components:
  button-primary:
    backgroundColor: "{colors.blurple}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "12px 23px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-quiet:
    backgroundColor: "{colors.quiet-bg}"
    textColor: "{colors.quiet-text}"
    rounded: "{rounded.button}"
    padding: "12px 23px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "#ded7ff"
    rounded: "{rounded.button}"
    padding: "12px 23px"
  name-input:
    backgroundColor: "{colors.field-bg}"
    textColor: "{colors.field-text}"
    rounded: "{rounded.field}"
    padding: "12px 43px 12px 15px"
  navigation:
    height: "82px"
  badge-card:
    backgroundColor: "{colors.badge-card-bg}"
    rounded: "{rounded.card}"
  badge-tab-selected:
    backgroundColor: "{colors.tab-selected-bg}"
    textColor: "{colors.tab-selected-text}"
    rounded: "{rounded.field}"
    padding: "14px 12px"
  progression-slider:
    height: "3px"
    rounded: "{rounded.micro}"
  profile-card:
    backgroundColor: "{colors.profile-bg}"
    rounded: "{rounded.card}"
    width: "340px"
  outline-tag:
    textColor: "#b7aecf"
    rounded: "{rounded.chip}"
    padding: "7px 10px"
---

# Design System: Badgecraft

## Overview

**Creative North Star: "The Midnight Collector Gallery"**

Badgecraft presents real badge artwork as collectible objects on midnight charcoal surfaces. Blurple actions, lavender hierarchy, and family-specific cyan, pink, and amber accents give the gallery its gaming character without overwhelming the artwork. Space Grotesk headings establish a geometric voice; DM Sans carries the smaller controls and explanations.

Depth is restrained and local: outlined panels organize the page, while soft lighting supports badge artwork and profile previews. The progression slider and editable profile playground are the signature interactions. Profiles remain clearly labelled simulations, consistent with PRODUCT.md.

**Key Characteristics:**
- Real badge artwork anchors the visual hierarchy.
- Charcoal surfaces with blurple actions and localized colored light.
- Geometric headings paired with compact, readable controls.
- Responsive explorer and profile preview with explicit selected states.

This is an implementation scan of `dist/style.css`, `dist/index.html`, `dist/app.js`, and the family colors in `dist/data.js`. Frontmatter names map to shipped CSS properties or recurring literal values; they do not claim an existing centralized spacing scale. No design comp was the source of authority.

## Colors

### Primary

**Discord Blurple** (`blurple`) supplies primary action fills. **Collector Lavender** (`accent`) supplies active navigation, the default Game Time family, range accents, and small highlights. **Twilight** (`banner`) is the default customizable profile banner.

### Secondary

**Game Variety Cyan** (`variety`), **Streaming Pink** (`streaming`), and **Account Age Amber** (`account-age`) follow the selected badge family. Banner swatches additionally offer Ocean, Rose, Forest, and Ember. These are actual interaction choices, not a replacement page palette.

### Neutral

**Midnight Charcoal** (`bg`) is the page ground; **Panel Charcoal** (`surface`) and **Raised Charcoal** (`raised`) are supporting surfaces. `line` defines low-contrast dividers. `text` is the primary reading color, `muted` supports prose, and `faint` supports tertiary information. Specialized field, card, tab, and profile surfaces retain their frontmatter values.

**The Local Light Rule.** Colored gradients and glows belong around artwork and preview stages; panel structure comes from borders and tonal contrast.

## Typography

**Display Font:** Space Grotesk, sans-serif. **Body Font:** DM Sans, sans-serif. Both ship as local font assets. The code preview uses the system monospace stack.

- **Display:** the frontmatter display role is the default desktop hero. It changes at the documented breakpoints: desktop compact uses `clamp(42px,4.9vw,64px)`, tablet uses (46px), mobile uses `clamp(35px,8.2vw,55px)` with (1.12) line height, narrow mobile uses (32px), and wide desktop uses (72px).
- **Headline:** section headings use the headline role; tablet reduces them to (32px), mobile section headings to (29px), and narrow mobile to (27px). Intro headings have intentional local sizes from (31px) to (42px).
- **Title:** the title role describes collection card headings; profile names deliberately use DM Sans at (22px) with (1.4) line height.
- **Body:** base prose uses the body role. Hero supporting text uses (17px) with (1.75) line height; descriptions and explanatory content use locally tuned sizes from (10px) to (15px).
- **Label:** tracked uppercase metadata is compact. Preserve its hierarchy relative to headings; ordinary controls remain sentence case. Milestone values and tier counters use tabular numerals.

## Layout

The default centered wrapper is `min(1220px,calc(100% - 96px))`. At (1500px) and wider it becomes `min(1280px,calc(100% - 120px))`; at (1150px) and below its outer allowance is (64px), at (720px) and below (40px), and at (370px) and below (32px). The sticky header is (82px) tall on desktop and (68px) on mobile.

The desktop hero uses a (1.2fr / 1fr) grid. Collection cards use four equal columns with the frontmatter card gap; at (940px) and below they become two columns, retained on mobile with (13px) gaps. The explorer uses (210px / 1fr / 230px); below (940px) its action moves onto a full-width row and below (720px) the artwork/content pair uses (132px / 1fr). Its ten-tier timeline keeps a (510px) minimum width on mobile and scrolls horizontally.

The profile workbench uses two equal columns with the frontmatter workbench gap. It, the guide, tool area, and FAQ become single-column layouts at (720px). The profile preview remains width-constrained, never viewport-wide. Sections use (100px) top spacing by default, (83px) below (940px), and (66px) below (720px); distinct profile and guide sections preserve their own measured padding. Spacing is compositional rather than a rigid base-unit system.

## Elevation & Depth

The system combines tonal separation, fine borders, and localized ambient lighting. The sticky header has a translucent charcoal fill and (20px) backdrop blur. Profile cards cast `0 26px 55px #0004`; floating artwork tiles cast `0 14px 25px #0003` and use (10px) backdrop blur. Primary button hover uses `0 8px 22px #3e43cc33`. The toast uses `0 10px 35px #0006`. Family-colored artwork drop shadows and milestone glows remain tied to the current badge family.

## Shapes

Buttons use softly squared corners; inputs, chips, cards, and panels follow the frontmatter radius roles. Avatars, status dots, swatches, orbital lines, and lighting stages use circles. Card artwork stays contained and undistorted. Borders are generally (1px); keyboard focus uses an offset (2px) outline in `focus`, with default offset (5px). Do not flatten the distinctions between card, panel, and circular artwork geometry.

## Components

### Buttons and chips

Primary, quiet, and outline buttons share inline-flex alignment, (12px) gaps, and (50px) default minimum height. Small buttons use (39px) minimum height and (9px 14px) padding. Hover lifts buttons by (2px); quiet buttons use an inset border, while outlined buttons use a visible purple-gray stroke. Disabled buttons use (.45) opacity and the default cursor. Text actions change text color on hover. Outline tags use a fine stroke and compact frontmatter padding.

### Collection cards and panels

Collection cards are bordered containers with a distinct artwork stage and a separated content area. Desktop art stages are (171px) high, artwork is (86px) square, and content padding is the frontmatter card inset. Hover lifts the container by (6px), colors its border from the badge family, and moves, scales, and rotates the artwork. Generic panels use the panel radius and surface token.

### Fields and profile controls

The display-name field uses a dark recessed surface, a subtle purple border, and a decorative trailing edit icon. Focus changes its border to `#9d89d3` and retains the visible keyboard outline. Tier selects use (6px) corners and a custom chevron; visibility checkboxes use (5px) corners and a check glyph when selected. Banner swatches are circular, grow to (1.12) on hover, and show an outer ring plus check when selected. There is no shipped field-error variant.

### Navigation

The sticky navigation uses compact DM Sans links; hover and current-section states use lavender. At (940px), two secondary links hide. At (720px), navigation becomes an explicit menu below the header and restores every link in a two-column grid. Escape, outside click, and navigation selection close the menu. Keyboard focus remains visible.

### Progression explorer

Family tabs use `aria-selected` to drive a purple selected surface and inset stroke. A ten-step timeline distinguishes future artwork (.48 opacity), visited artwork (.8 opacity), and the selected tier (full opacity, family border, glow, and 1.1 scale). The range track is (3px) tall and its filled portion follows the current family color; a bordered circular thumb provides a distinct drag target. Changing a tab or range value updates the artwork, tier text, threshold, and next milestone. The apply action sends that tier to the simulated profile.

### Featured community profile

The hero's UnkindledOne spotlight uses a scoped amber/umber composition in `featured-profile.css`, separate from the editable playground. The banner and transparent autumn-decorated avatar are generated from the user-supplied reference. Local surfaces run from (#181511) to (#302619); the name is (#ffb51b), with Lilita One at (30px), stepping down to (24–27px) on smaller screens. The Japanese status is native text, the DND marker is CSS, and the four badge buttons open their illustrated tiers. The bio is an excerpt from the reference. No image contains interface text or controls.

The fixed identity never consumes playground state. The banner eases on hover; sunset light and tiny embers animate for two iterations only. Reduced motion disables those effects and the inherited tilt. The tablet floating badge sits above the status bubble, and mobile retains its own position. Assets and exact prompts are documented in `dist/assets/unkindled-artwork.json`.

### Profile playground

The profile card is a compact social-profile composition: a gradient banner, overlapping circular avatar, dark inset badge row, personal details, and a simulation disclosure. Its default width is the frontmatter profile width; the workbench preview uses (300px) at tablet and (318px) at mobile, capped at available width. Display-name, banner, tier, and visibility changes update the preview immediately; reset restores defaults. Badge artwork in the preview is also an explorer action.

### Supporting states and motion

FAQ disclosure animates grid rows over (.38s), rotates its plus icon (45deg), and synchronizes `aria-expanded`. Copy success changes the code button to green with an explicit label. A fixed toast fades and rises for local actions and hides after (2800ms).

The shared easing is `cubic-bezier(.16,1,.3,1)`. Standard hover transitions run (.2–.35s), artwork transformation runs (.5s), profile hover runs (.6s), section arrival runs (.8s), and hero entry runs (.9s / 1.1s). Card arrivals stagger by (.07s). Decorative stars twinkle for two (5s) iterations. Fine-pointer hero tilt is requestAnimationFrame-driven, up to (7deg) horizontally and (5deg) vertically. With reduced motion, CSS durations become (.01ms) with one iteration and automatic scrolling; hero/floating transforms are removed. JavaScript skips reveal, swap, and pointer-tilt animation and chooses instant scrolling.

## Do's and Don'ts

### Do:
- Do preserve real badge artwork and its attribution.
- Do use blurple for primary actions and lavender for active navigation and focus.
- Do use each badge family’s color consistently in its card, explorer, timeline, and range control.
- Do keep selected states visible through borders, checks, labels, or artwork opacity as well as color.
- Do preserve keyboard focus and the reduced-motion branch.

### Don't:
- Don’t replace the shipped charcoal palette with a light theme.
- Don’t spread the artwork glows across ordinary text or every panel.
- Don’t replace the geometric heading and DM Sans pairing with a different visual voice.
- Don’t shrink the mobile milestone timeline to force ten tiers into the viewport; preserve horizontal scrolling.
- Don’t remove the visible simulation labels from profile previews.

## Community guide extension

The former explanation and placeholder tools sections now form one guide, using the existing typography, muted lavender controls, panel radius, and code-editor shell. `community-tools.css` scopes the addition. Six numbered tab controls sit above one visible instruction panel; previous/next controls and the live step label provide orientation. The wide layout pairs the guide and existing editor at (.95fr / 1.25fr); below (860px), they stack. A concise amber risk panel and compact prerequisite line precede the guide. Code remains within the original scrollable editor, with Python highlighting, a read-only manual-copy fallback, and explicit loading/error/verified states. Copying a guide action scrolls to and briefly highlights that same editor. Reduced motion disables the new transitions and highlight. No unrelated section or shared stylesheet was redesigned.
