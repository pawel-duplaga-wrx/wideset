# ActionBar

## When to use

- Bulk actions on selected table rows, list items or files: Export, Download, Delete.
- The bar appears while something is selected and goes away when the selection is cleared.

## When not to use

- Actions that are always available, without a selection → `Button` / `IconButton` in the page
  or table header.
- Feedback after the bulk action ran → `Toast`.
- One default action with alternatives → `SplitButton`.

## Do / Don't

```tsx
// Do: keep it mounted and toggle isOpen, so it animates out
<ActionBar isOpen={selected.length > 0} … />

// Don't: unmount it on close (no exit animation)
{selected.length > 0 && <ActionBar isOpen … />}

// Don't: md / lg buttons inside
<ActionBar isOpen><Button>Delete</Button></ActionBar>   // use size="sm"
```

## Gotchas

- `isOpen` defaults to `false`; a bar without it renders invisible.
- `onClose` does not change anything by itself. Clear the selection (and so `isOpen`) in it.
- The bar is `position: fixed` to the viewport. A transformed ancestor becomes its containing
  block, which is how the docs keep it inside a preview box.
- Default copy is English ("`N` selected"); use the tuple form to translate.
- `NaN` as `amountSelected` hides the label.
