# Chip

## When to use

- A row of quick filters the user toggles on and off ("Remote only", "Full time").
- Applied values the user can remove with one click ("Warsaw ×").
- Suggestions the user can apply with one click.

## When not to use

- A descriptive label with no action → `Tag`.
- A status of a record → `StatusBadge`.
- A filter that opens a list of options → `FilterButton`.
- A primary or form action → `Button`.
- Exactly one of a few views → `SegmentedControl`.

## Do / Don't

```tsx
// Do: a toggle filter that shows and announces its state
<Chip style={remote ? 'filled' : 'border'} aria-pressed={remote} onClick={() => setRemote(!remote)}>
  Remote only
</Chip>
```

- Don't put an `IconButton` or any other control inside a chip (nested interactive controls); the
  whole chip removes, with a trailing `Chip.Icon`.
- Don't use a chip as a read-only label → `Tag`.

## Gotchas

- `style` is a variant (`'filled' | 'border'`), not the HTML style attribute; inline styles are not
  accepted.
- The root is a `div` with `role="button"`, not a `<button>`: it never submits a form.
- `disabled` blocks clicks and keys; your `onClick` will not fire.
- DOM hooks: `data-slot="chip"`, `"chip-icon"`.
