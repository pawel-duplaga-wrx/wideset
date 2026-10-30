# RadioButtonGroup

## When to use

- Every `RadioButton`. The group is mandatory: it holds the value, the keyboard model and the form
  `name`.

## When not to use

- Several options may be on at once → `CheckboxGroup`.
- A compact mode switch that applies immediately → `SegmentedControl`.
- Rich, card-like options → `Tile.RadioGroup` (same `value` / `onValueChange` contract).
- A long list → `Select`.

## Do / Don't

```tsx
// Do: controlled, value typed as string
const [period, setPeriod] = useState('annual');
<RadioButtonGroup value={period} onValueChange={setPeriod} aria-label="Billing period">
  <RadioButton value="annual" label="Annual" />
  <RadioButton value="monthly" label="Monthly" />
</RadioButtonGroup>;
```

- Don't use numbers or booleans as `value`; values are strings. Map them yourself.
- Don't nest other interactive controls between the radios; keep the group a flat list.

## Gotchas

- `RadioButton.Group` is the same component; the named `RadioButtonGroup` works in Server
  Components.
- `onValueChange` receives a string, not an event.
- `className` goes on the group element; spacing between options is built in.
- DOM hook: `data-slot="radio-button-group"`.
