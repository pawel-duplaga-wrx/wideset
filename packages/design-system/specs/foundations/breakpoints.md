# Breakpoints

Wideset defines five breakpoint tokens for page layout; it does not register them as Tailwind
variants, and its components have no built-in responsive behaviour. Layout responsiveness is the
consumer's job: components fill the width they are given.

Source: `packages/design-system/src/styles/tokens/theme-base-tokens.css`

## Tokens

| Token                     | rem    | px   | Typical screen from this width |
| ------------------------- | ------ | ---- | ------------------------------ |
| `--ws-breakpoints-xsmall` | 0      | 0    | Phones                         |
| `--ws-breakpoints-small`  | 30.625 | 490  | Large phones, narrow windows   |
| `--ws-breakpoints-medium` | 48     | 768  | Tablets, split views           |
| `--ws-breakpoints-large`  | 65     | 1040 | Laptops                        |
| `--ws-breakpoints-xlarge` | 90     | 1440 | Wide desktops                  |

## Using them with Tailwind v4

Wideset never redefines Tailwind's `--breakpoint-*`, so `sm:`, `md:`, `lg:` keep Tailwind's own
values (40rem, 48rem, 64rem …), which are not Wideset's. Only `md` happens to match.

CSS variables cannot be read inside a media query, so use the literal value in an arbitrary
variant:

```tsx
<div className="gap-ws-9 grid grid-cols-1 min-[48rem]:grid-cols-2 min-[65rem]:grid-cols-3">…</div>
```

In plain CSS, write the same literal: `@media (min-width: 65rem) { … }`. The `--ws-breakpoints-*`
variables are for JavaScript (`getComputedStyle`) and `calc()`, not for `@media`.

If a project wants named variants, it defines them in its own Tailwind entry with a `ws` name
(never by overriding `--breakpoint-md`), using the literal values above.

## Component behaviour

- No component switches layout at a breakpoint: component source has no media queries or
  responsive variants. Anything that changes with screen size (Sidebar's `collapsed`, stacking a
  form) is your layout code driving the component's props.
- Size props (`size="sm"`) are density choices, not responsive ones. Do not swap them per
  breakpoint unless the design says so.
- Only desktop token values ship today (`theme-desktop-*`); there is no mobile density set.

## Banned

- Tailwind's `sm:`/`lg:`/`xl:` variants on the assumption they equal Wideset's breakpoints.
- `@media (min-width: var(--ws-breakpoints-large))`: invalid CSS, silently ignored.

How to lay a screen out across these widths (navigation, tables, touch targets):
[responsive](responsive.md).
