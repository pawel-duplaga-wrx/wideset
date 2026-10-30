# FilterButton

## When to use

- Filter bars and table toolbars: Status, Owner, Region, each as its own `FilterButton`.
- The user may pick several values and wants to see the choice summarised on the trigger.

## When not to use

- A multi-value field inside a form → `MultiSelect`.
- Free-text filtering → `Search`.
- Acting on selected rows rather than filtering them → `ActionBar`.

## Do / Don't

```tsx
// Do: one size for the whole filter row
<FilterButton size="md" label="Status" … />
<FilterButton size="md" label="Owner" … />

// Don't: a form field
<form><FilterButton label="Countries" … /></form>   // → MultiSelect
```

## Gotchas

- `onChange` is required, also in uncontrolled mode, and receives the whole array, not the
  toggled value.
- Pass `value` as an array; `undefined` switches to uncontrolled mode.
- Native button props (`className`, `aria-*`, `ref`) land on the trigger, not the wrapper.
- There is no single-select mode; every option is a checkbox.
