---
name: wideset-storybook-docs
description: Formatting and visual consistency rules for Wideset's Storybook MDX docs pages — page skeleton, headings, horizontal rules, typography, callouts, tables, code fences, shared docs-kit components. Use when creating or editing any .mdx page, or when asked to make the Storybook docs consistent. Covers form only, never the wording or the facts.
license: Apache-2.0
metadata:
  internal: true
  kit: src/stories/docs-kit.tsx
---

# Storybook docs: one look for every page

Every `src/…` path below is relative to `packages/design-system/`. Run root scripts from the
repository root; use `pnpm --filter @wideset/react exec …` for package-local tools.

Scope: `.mdx` docs pages (`src/stories/**`, `src/components/**/*.mdx`). Form only. Do not rewrite,
shorten or "improve" the text; if wording must change to fit a rule (a heading's case, a note moved
into a callout), keep the meaning identical. Component stories (`*.stories.tsx`) belong to the
`wideset-component-convention` skill. General documentation (installation, theming, foundations,
changelog, contributing) lives in `apps/docs`, not in Storybook; do not add those pages here.

## Page skeleton

```mdx
import { Meta } from '@storybook/addon-docs/blocks';

import { Callout, Lead } from '../stories/docs-kit'; // path relative to the page

<Meta title="Table/Sizing" />

# Sizing

<Lead>One to three sentences: what this page is for.</Lead>

Optional short intro paragraph.

---

## First section
```

1. Imports, blank line, `<Meta>`, blank line, content. Nothing else above the H1.
2. **Exactly one H1**, equal to the last segment of the `Meta` title. Only exception: Introduction,
   whose hero replaces the H1.
3. **One `<Lead>`** right under the H1. No second lead, no bold first paragraph instead of it.

## Rules

- **Headings.** `##` for sections, `###` inside them, nothing deeper. Sentence case, no trailing
  punctuation, no bold, no emoji, no code-only headings. Never skip a level.
- **Horizontal rule.** Exactly one `---` per page: between the intro block (H1, Lead, intro
  paragraph) and the first `##` (or the main body component when the page has no `##`, as in
  Changelog). Storybook already underlines every H2, so no `---` between sections, no `<hr />`,
  and no `---` at the end of the page.
- **Borders.** Boxes (callouts, cards) have a full, even 1px border and a token radius
  (`rounded-ws-container-md`). Never a one-sided coloured accent border (`borderLeft: 3px …`);
  tone is carried by the tinted background, the border tint and the coloured title.
- **Spacing.** Never `<br />`, empty paragraphs or `&nbsp;` for vertical space. The kit components
  carry their own margins; if something looks cramped, fix the component in the kit.
- **Shared components only.** `Lead`, `Callout`, `Card`, `Grid`, `Step`, `DocLink`, `DocTable`/`Th`/`Td` come
  from `src/stories/docs-kit.tsx`. A page must not define its own copy (`export const Lead = …`).
  A page-specific component is fine only when it is truly unique to that page (Introduction's
  hero); anything used on two pages moves to the kit.
- **No inline styling in pages.** No `style={{…}}` or font sizes in `.mdx` outside a page-specific
  component.
- **Colours and radius are Wideset tokens, applied as Tailwind utilities** (`className`), never hex,
  `rgb()`/`rgba()` or a raw `var(--…)` in an inline style (Tailwind only emits variables that a
  utility uses, so a bare `var()` can silently resolve to nothing). Mapping used by the kit:
  info → `bg-ws-semantic-info border-ws-semantic-info text-ws-semantic-info`; warning →
  `…-ws-semantic-notice`; brand badge → `bg-ws-non-semantic-brand-strong text-ws-non-semantic-brand-on-strong`;
  box and table borders → `border-ws-static-strong` / `border-ws-static-subtle`; subtle fill →
  `bg-ws-static-alpha-subtle`; muted text → `text-ws-static-subtle`; links → `text-ws-dynamic-primary-default`;
  radius → `rounded-ws-container-md`, `rounded-ws-control-sm`, `rounded-ws-control-full` for badges. Hex
  values inside code samples are content and stay.
- **Notes.** `<Callout tone="info" title="…">` for tips, `tone="warning"` for things that break.
  No Markdown blockquotes (`>`) for notes, no "**Note:**" paragraphs. Title in sentence case,
  no trailing colon.
- **Tables.** `<DocTable>` with normal `<thead>/<tbody>/<tr>` and `<Th>` / `<Td>` cells. No raw
  `<table>`, no `style` on cells, no pipe tables (GFM is not enabled in MDX here).
- **Code.** Every fence has a language: `bash`, `tsx`, `ts`, `css`, `ini`, `json`, `text`. Use
  `text` for bare class names or token lists so Prettier does not reformat them. No `$` prompts,
  no output mixed into a command block. Inline code for identifiers, props, file paths, commands,
  tokens and class names; never for emphasis.
- **Emphasis.** Bold for the one key term or UI label in a paragraph; italics sparingly; never
  bold a whole sentence; no ALL CAPS.
- **Lists.** `-` for bullets, `1.` for ordered; sentence case; either every item ends with a full
  stop or none does. Procedures with more than a line per step use `<Step n title tagline?>`.
  A checklist inside a callout is a Markdown list between blank lines, never `<strong>1.</strong>`
  lines glued with `<br />`.
- **Links.** Descriptive text, never "here" or a bare URL. Internal links use the Storybook path
  **without** `?path=`: `[Colors](/story/foundation-colors--primitives)`.
  Storybook adds `?path=` itself, so `/?path=/docs/…` becomes `?path=/?path=/…` and breaks. Inside
  JSX (Lead, Callout, table cells) use `<DocLink to="/docs/…">` from the kit, never a raw
  `<a href>`: that would load the whole Storybook UI inside the preview iframe. External links in
  JSX get `target="_blank" rel="noreferrer"`.
- **Live examples.** `<Canvas of={Stories.Name} />` from the component's stories; do not re-create
  a component demo with hand-written markup.

## Fixing existing pages

1. List deviations per file first (rule, line), so the change is reviewable.
2. Replace local helper definitions with imports from the kit; delete `headStyle` / `cellStyle`
   and convert raw tables to `DocTable` / `Th` / `Td`. Compare the page's text before and after
   (`git diff --word-diff`); a migration must not drop or add words.
3. Apply the heading, `---`, spacing, callout and code-fence rules. Leave the words alone.
4. `pnpm --filter @wideset/react exec prettier --write <file>` (package-relative path), then
   open the page in Storybook (`pnpm storybook`) and check it
   in light **and** dark theme. A page that does not render is worse than an inconsistent one.
5. If a rule cannot express what a page needs, extend the kit and this skill in the same change
   rather than adding a one-off.

## Quick audit

````bash
cd packages/design-system
rg -n '\?path=|<a href="/' src/stories src/components -g '*.mdx'   # broken internal links
rg -n '^export const|style=\{\{|border(Left|Right|Top|Bottom):|#[0-9a-fA-F]{3,8}|rgba?\(|<br|<hr|<table|^> ' src/stories src/components -g '*.mdx'
rg --files -0 src/stories src/components -g '*.mdx' | xargs -0 awk '/^---$/{count[FILENAME]++} FNR==1{count[FILENAME]+=0} END{for(file in count) print file ":" count[file]}'   # expect 1 per page, including files with zero rules
rg --files -0 src/stories src/components -g '*.mdx' | xargs -0 awk 'FNR==1{o=0} /^```/{o=!o; if(o && $0=="```") print FILENAME":"FNR": fence without language"}'
````
