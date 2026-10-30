# RadioButton

## When to use

- A choice of exactly one from two to a handful of options that should stay visible: shipping
  method, billing period, what happens when a project ends.
- The choice is saved with the form, not applied the moment it changes.

## When not to use

- The user may pick several, or none → `Checkbox`.
- Switching a view or mode that applies immediately → `SegmentedControl`.
- A long list, or options that need not be visible at once → `Select`.
- Options that need an icon, a title and a description as one big target → `Tile.Radio`.
- A single on/off setting → `Switch` (or `Checkbox` in a form).

## Do / Don't

```tsx
// Don't: a radio outside its group
<RadioButton value="annual" label="Annual billing" />
// Do
<RadioButtonGroup defaultValue="annual" aria-label="Billing period">
  <RadioButton value="annual" label="Annual billing" />
  <RadioButton value="monthly" label="Monthly billing" />
</RadioButtonGroup>
```

- Don't pass `checked` or `onCheckedChange` to a radio; selection is the group's `value`.
- Don't pass `label` and children together, or `description` without `label`.

## Gotchas

- `RadioButton` outside `RadioButtonGroup` (or `RadioButton.Group`) fails: the primitive needs the
  group's context.
- `RadioButton.Label` throws outside a `RadioButton`; it takes `htmlFor` from it.
- `className` lands on the radio circle, not on the row with the label.
- `ref` points at the radio control (`button` with `role="radio"`).
- DOM hooks: `data-slot="radio-button"`, `"radio-button-label"`, `"radio-button-description"`.
