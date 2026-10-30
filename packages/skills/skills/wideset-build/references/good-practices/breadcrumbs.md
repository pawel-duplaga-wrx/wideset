# Breadcrumbs

## When to use

- Pages nested two or more levels deep (Projects › Wideset › Settings), above the page title.
- File and folder paths.

## When not to use

- Switching between sibling sections of the same page → `Tabs`.
- Primary app navigation → `Sidebar`.
- A single "back to …" link → `LinkButton`.
- Progress through ordered steps → `ProgressStepper`.

## Do / Don't

```tsx
// Do: one source of dividers
<Breadcrumbs separator="slash">…</Breadcrumbs>

// Don't: separator plus manual dividers draws two between every pair
<Breadcrumbs separator="arrow">
  <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
  <Breadcrumbs.Divider separator="arrow" />
  <Breadcrumbs.Item>Wideset</Breadcrumbs.Item>
</Breadcrumbs>
```

- Don't set `aria-current` or `disabled` on the last item yourself.
- Don't put an icon on every crumb.

## Gotchas

- The last child is treated as the current page, whatever it is. Never end the list with a
  `Breadcrumbs.Divider`.
- `Breadcrumbs.Divider` with neither `separator` nor children renders nothing.
- With `asChild`, layout of the child's content (icon + text) is yours; the item styles still
  apply to the child.
