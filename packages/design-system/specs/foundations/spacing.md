# Spacing

All padding, gaps, margins and sizes use Wideset's own `ws` spacing scale, whose step numbers are
indices, not multiples of 4px. Control and form heights have semantic tokens so a custom element
lines up with Wideset's buttons and inputs.

Source: `packages/design-system/src/styles/tokens/theme-desktop-semantic.css` (`--spacing-ws-*`),
values from `theme-desktop-tokens.css` (`--ws-size-*`) and `theme-base-tokens.css`
(`--ws-space-*`).

## `p-4` is not `p-ws-4`

`p-4` is Tailwind's default scale: 1rem. `p-ws-4` is Wideset step 4: 0.375rem. Both compile, so
the mistake is silent. Every spacing class in Wideset UI carries `-ws-`: `p-ws-*`, `px-ws-*`,
`gap-ws-*`, `m-ws-*`, `size-ws-*`, `h-ws-*`, `w-ws-*`, and `min-w-ws-*`. Wideset never
redefines Tailwind's own `--spacing`, so a consumer's `p-4` keeps meaning 1rem.

## Scale

| Step | rem    | px  | Step | rem  | px  |
| ---- | ------ | --- | ---- | ---- | --- |
| 0    | 0      | 0   | 15   | 2.25 | 36  |
| 1    | 0.0625 | 1   | 16   | 2.5  | 40  |
| 2    | 0.125  | 2   | 17   | 2.75 | 44  |
| 3    | 0.25   | 4   | 18   | 3    | 48  |
| 4    | 0.375  | 6   | 19   | 3.5  | 56  |
| 5    | 0.5    | 8   | 20   | 4    | 64  |
| 6    | 0.625  | 10  | 21   | 4.5  | 72  |
| 7    | 0.75   | 12  | 22   | 5    | 80  |
| 8    | 0.875  | 14  | 23   | 5.5  | 88  |
| 9    | 1      | 16  | 24   | 6    | 96  |
| 10   | 1.125  | 18  | 25   | 7    | 112 |
| 11   | 1.25   | 20  | 26   | 8    | 128 |
| 12   | 1.5    | 24  | 27   | 9    | 144 |
| 13   | 1.75   | 28  | 28   | 10   | 160 |
| 14   | 2      | 32  |      |      |     |

There is no step above 28. For a one-off value outside the scale use an arbitrary value
(`w-[22rem]`), not a Tailwind scale class.

## Control and form sizes

| Class suffix     | rem  | px  | Use for                                        |
| ---------------- | ---- | --- | ---------------------------------------------- |
| `ws-control-xs`  | 0.75 | 12  | Smallest indicator box                         |
| `ws-control-sm`  | 1    | 16  | Checkbox, helper-text icon                     |
| `ws-control-md`  | 1.25 | 20  | Default icon / indicator box                   |
| `ws-control-lg`  | 1.5  | 24  | Large icon box                                 |
| `ws-control-xl`  | 1.75 | 28  |                                                |
| `ws-control-xxl` | 2    | 32  |                                                |
| `ws-forms-xs`    | 1.5  | 24  | `size="xs"` Button height                      |
| `ws-forms-sm`    | 2    | 32  | `size="sm"` Button / TextInput / Select height |
| `ws-forms-md`    | 2.5  | 40  | `size="md"` Button / TextInput / Select height |
| `ws-forms-lg`    | 3    | 48  | `size="lg"` Button / TextInput / Select height |

Use them with any sizing utility: `size-ws-control-md`, `h-ws-forms-md`, `min-w-ws-forms-sm`.
A custom element placed in a row with a `size="md"` Button or TextInput takes `h-ws-forms-md`.

## Rules

- Gap over margins: lay out siblings with `flex` / `grid` and `gap-ws-*`; avoid `space-x-*` and
  per-child margins.
- Steps the components use most, and good defaults to match them:
  - `gap-ws-2`–`gap-ws-4` (2–6px): tightly coupled parts (icon to label inside a control, a
    segmented row).
  - `gap-ws-5` (8px): inline controls side by side, label to helper text.
  - `gap-ws-7`–`gap-ws-9` (12–16px): fields in a form, items in a toolbar.
  - `gap-ws-12` (24px): sections inside a card or panel.
  - `gap-ws-16` and up (40px+): page-level sections.
- Inner padding of a container is usually `p-ws-9` to `p-ws-11` (16–20px); Card uses `p-ws-11`.
- Do not pad a component from outside to change its size; use its `size` prop.
- Raw variables (`var(--ws-size-9)`) are for CSS and `calc()`; in markup use the class.

## Banned

- Tailwind scale classes: `p-4`, `gap-2`, `w-64`, `h-10`, `mt-6`, `space-y-4`.
- Pixel values that a step already covers (`gap-[8px]` → `gap-ws-5`).

## Light and dark

Spacing does not change with the theme. Only desktop values exist today (`theme-desktop-*`).
