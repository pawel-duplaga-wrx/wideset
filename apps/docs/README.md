# @wideset/docs

The Wideset documentation site. Astro 7, static output, React only in islands; styled with the
design system's own tokens; component data read from the library at build time.

```bash
pnpm docs:dev        # dev server on http://localhost:4321 (builds the library first)
pnpm docs:build      # static build into apps/docs/dist
pnpm docs:preview    # serve the build
pnpm --filter @wideset/docs test   # the generators' output (controls, catalogue, descriptions)
pnpm typecheck       # includes `astro check` for this app (run from the repo root)
pnpm lint            # ESLint for this app too (rules shared from the root .eslintrc.json)
pnpm prettier        # one Prettier for the workspace, this app included
```

The site renders the library from its source, one copy for every page: `@wideset/react`
resolves to `packages/design-system/src/index.ts` (`astro.config.mjs`), as it does in Storybook,
Vitest and tsc. Only the stylesheets come from the built package (`@wideset/react/styles`,
`/theme`), which Turborepo builds first.

## How a page is made

```
scripts/generate.mjs           runs before dev, build, typecheck and test → src/generated/*.json (git-ignored)
  gen-catalog.mjs              one entry per public component's *.stories.tsx (TypeScript API, not regexes)
  gen-props.mjs                prop tables from the TypeScript types (cva unions, defaults, JSDoc),
                               and controls.json: the unions and booleans the playgrounds switch
  gen-graph.mjs                which components use or appear with which (from imports)
  gen-registry.mjs             the registry items `npx wideset add` installs (Install → Manual)
  gen-light-scope.mjs          the light tokens as a `.docs-light` scope (per-example theme switch)
  generate.test.mjs            node:test checks on what the generators wrote
src/lib/catalog.ts             the generated data as the pages read it
src/pages/components/[id].astro   one page per catalogue entry
src/lib/examples.ts            a page's examples: the library's examples/<id>/ files, in index.ts order
src/lib/playground.tsx         the playgrounds: the library's examples/<id>/default.tsx + src/playgrounds/<id>.tsx
src/playgrounds/<id>.tsx       optional tuning of a playground (labels, hidden props, dark stage, …)
src/content/docs/*.mdx         guide pages; the file name is the URL (/docs/<name>)
```

A component has a page when `src/index.ts` exports it and it has a stories file: title and
description (the first sentence of the stories meta's `parameters.docs.description.component`),
the playground, install, anatomy (table and picture), examples, props per part, related
components, links, the version it shipped in (git) and a Markdown version. Everything a page
shows is in the library; the docs add only playground tuning. The `wideset-component-docs`
skill (`.agents/skills/`) walks through it.

## Examples

Every example is a file in the library,
`packages/design-system/src/components/<folder>/examples/<id>/<name>.tsx`, and the same file is a
story in Storybook (`exampleStory()` in the stories file). The page renders it and prints it as
written; its leading JSDoc is the description; `index.ts` next to it lists the examples in
reading order. `src/lib/examples.ts` fails the build on an example missing from `index.ts`, a
name without a file or a file without a description, and the library's
`src/__tests__/examples.test.tsx` checks the same in CI, plus that each renders and is a story.

**Which subjects:** the visual axes, side by side (only the ones the component has). The
playground shows one value at a time; an example shows them all at once, so the reader can
compare. Code patterns (`asChild`, routing, a form around it) and dev cases are stories of their
own in Storybook, not examples.

**Descriptions:** they must say what the title and preview do not: the rule behind the picture,
when to pick which, what happens that you cannot see (keyboard, screen readers, layout), or
where to go instead. Never a sentence that repeats the title or describes what is visible.

## Playgrounds

Every page opens on one, built from the component's `examples/<id>/default.tsx` (one typical
instance whose root takes `{...props}`): the controls are every string-literal union (a select)
and boolean (a switch) of the root props type in `src/generated/controls.json`, with the
component's own default, so a new variant shows up without touching anything; the Code tab
prints the JSX `default.tsx` returns with the chosen props. `src/playgrounds/<id>.tsx` is optional
tuning: `playground({...})` from `src/lib/playground-kit.ts` with `hide`, `labels` (`preset` is
already "Style"), `order`, `optional` (a "None" choice), `defaults`, `stage(values)` (the dark
stage for `inverse`), `preview()` (an overlay drawn open for the gallery card), `anatomy()` (a
composition with every part), or its own `render(values, { props })` / `code(values, { attrs })`
with `content` controls when the stage needs more than the types say. The Anatomy picture draws
`anatomy()`, the preview or the stage, and finds each part by its `data-slot` (every part of
every component sets one); how it lays out and looks, and how to audit it on every page, is the
`wideset-component-anatomy` skill. The gallery tile size is in `src/lib/gallery.ts`.

The stage renders on the server at the defaults, so a page opens on it before any JavaScript;
`clientOnly: true` draws it only in the browser, for a component that reads `document` while
rendering or opens on today's date (Calendar). The browser loads only the playgrounds a page names
with `data-playground` (the component page's stage, each gallery card), and every island that
reads one waits for them before it hydrates. Do not suspend during hydration instead:
`@astrojs/react` calls `root.render` straight after `hydrateRoot`, which makes React drop the
server HTML of a suspended boundary and draw it again, and React streams a boundary with a large
stage out of line; both make the stage blink.

## Adding things

- **A guide page:** `src/content/docs/<name>.mdx` with `title`, `description`, `order` in the
  frontmatter. It appears in the left column by `order`.
- **A component page:** export the component, give it a stories file, then its
  `examples/<id>/` folder (see the skill).
- **An area in the top bar:** `AREAS` in `src/lib/nav.ts` plus a page under `src/pages/<area>/`.

## Chrome

- `src/layouts/DocsLayout.astro` — the frame: top bar, left navigation, a reading column centred
  between the left column and the right rail (equal whitespace on both sides), the optional `toc`
  and `rail` slots (component pages use both). The rail is `fixed` and the column keeps its room
  with a margin, so the column does not jump when the rail, last in the HTML, arrives. "On this
  page" takes no width: a column of ticks in the column's right margin that opens into a panel on
  hover or focus. Theme and radius are applied before first paint
  from `localStorage` (`src/lib/theme.ts`, `src/lib/radius.ts`).
- `src/components/` — islands and Astro parts: `TopBar`, `SideNav`, `SearchPalette` (⌘K, on the
  system's `Modal` + `Search`), `ThemeToggle`, `Example`, `CodeBlock` (shiki, github-light/dark),
  `Playground` + `PlaygroundCode` + `PropertiesPanel` (one shared store), `ThemePanel`,
  `AnatomyDiagram`, `RelationshipGraph`, `OnThisPage`.
- `src/styles/docs.css` — Tailwind plus `@import '@wideset/react/theme'`, so the chrome is
  written in `ws` classes (`bg-ws-static-container`, `text-ws-static-subtle`, …) and follows
  light and dark with the system. Inter from `@fontsource-variable/inter`.

## Rules

- No component library code is copied here. Use `@wideset/react`; if the docs need something
  the system lacks, that is a library issue first.
- Chrome uses `ws` token classes only (same rule as the library); no raw palette classes.
- Islands cannot receive React components as props (they do not serialise). Pass a key and look
  the thing up on the client (`Example` and `Playground` do this).
- `src/generated/` is never committed; the generators are the contract with the library. When
  a story or a type changes shape, fix the generator, not the page.

## Automation hooks

- **CI:** the root `pnpm typecheck`, `pnpm prettier`, `pnpm build` and `pnpm test` run this app
  through Turborepo, so a broken generator, page or example fails the PR.
- **Hosting:** static output in `dist/`, served by a Cloudflare Worker (`wrangler.jsonc`) and
  deployed by the `deploy` job in `.github/workflows/build.yaml`. See `RELEASING.md`.
- **Changelog, search index, llms.txt:** not built yet; they read the same generated data and
  `CHANGELOG.md`, and belong in `scripts/`.
