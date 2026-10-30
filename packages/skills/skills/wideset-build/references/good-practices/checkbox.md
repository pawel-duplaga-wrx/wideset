# Checkbox

## When to use

- Opting in or out of something that is applied when the user submits ("Email me about product updates").
- Picking any number of options from a short, visible list (inside `CheckboxGroup`).
- Selecting rows in a table, with a "Select all" parent that turns indeterminate.

## When not to use

- A setting that takes effect the moment it flips → `Switch`.
- Exactly one option from a set → `RadioButton` in `RadioButtonGroup`.
- Options that need an icon, a title and a description as one big target → `Tile.Checkbox`.
- A long list of options → `MultiSelect`.
- Toggling a filter in a row of short values → `Chip`.

## Do / Don't

```tsx
// Do: "Select all" derived from its children
const all = ['inv-1', 'inv-2', 'inv-3'];
const state =
  selected.length === 0 ? false : selected.length === all.length ? true : 'indeterminate';

<Checkbox
  label="Select all invoices"
  checked={state}
  onCheckedChange={(checked) => setSelected(checked === true ? all : [])}
/>;
```

```tsx
// Don't: an immediate setting as a checkbox
<Checkbox label="Dark mode" onCheckedChange={applyTheme} />
// Do
<Switch label="Dark mode" onCheckedChange={applyTheme} />
```

- Don't pass `label` and children together, or `description` without `label`: the types reject it.
- Don't pass `checked` without `onCheckedChange`; the box will not move.

## Gotchas

- The change handler is `onCheckedChange`, not `onChange`, and the value is
  `boolean | 'indeterminate'`, not a string.
- `className` lands on the box itself, not on the row with the label. Lay out the row with a
  wrapper.
- `ref` points at the checkbox control (a `button` with `role="checkbox"`), not at the row.
- `Checkbox.Label` throws outside a `Checkbox`; it takes its `htmlFor` and disabled state from it.
- A `Checkbox` in `CheckboxGroup` still owns its own state; the group holds none.
- DOM hooks: `data-slot="checkbox"`, `"checkbox-label"`, `"checkbox-description"`.
