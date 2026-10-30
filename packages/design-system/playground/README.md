# Scaffolding playground

A real consumer app: Vite + React + Tailwind v4, set up with the shadcn CLI, with Wideset components
scaffolded into it from this repo's registry. The scaffolded code is committed, exactly as it would
be in a consumer's repo, so you can read what a consumer gets without running anything.

## How this app was made

Every step is what a developer does in their own project:

```bash
npx shadcn init                                                        # writes components.json, src/lib/utils.ts
npx shadcn registry add @wideset=http://127.0.0.1:4000/r/{name}.json   # once; not needed after public release
npx shadcn add @wideset/button @wideset/icon-button @wideset/tag @wideset/text-input \
  @wideset/select @wideset/checkbox @wideset/switch @wideset/tabs @wideset/modal
```

The last command wrote 100 files: the nine items, the items they depend on (`dropdown`, `list-item`,
`search`, `status-badge`), `src/lib/wideset/utils.ts` and `src/styles/wideset.css`. Then one manual
line in `src/main.tsx`, which the CLI prints: `import '@/styles/wideset.css'`. `src/App.tsx` uses the
components.

## Run it

```bash
pnpm playground            # from the repo root
```

Builds the library and the registry, serves the registry on :4000, re-adds the demo items with
`--overwrite`, and starts Vite on http://localhost:5174. While it runs, add more from `playground/`:

```bash
npx shadcn add @wideset/tooltip
```

`pnpm playground --all` adds every registry item; `--items a,b` adds a subset; `--no-dev` stops
after installing.

## After changing a component in the repo

Run `pnpm playground --no-dev`, then `git diff -- packages/design-system/playground` from the
repository root. The diff is exactly what a consumer
would receive on a fresh `shadcn add`. Commit it with the component change. Do not edit the copies
under `src/components/ui/wideset` by hand: they are output, the repo's `src/components` is the source.
