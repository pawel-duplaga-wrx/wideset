# CheckboxGroup

## When to use

- Several related, independent options under one heading: notification channels, permissions,
  features to include.

## When not to use

- Only one option may be picked → `RadioButtonGroup`.
- A single checkbox → `Checkbox` on its own.
- A long list that would not fit on screen → `MultiSelect`.
- Options that need an icon and a title as a large target → `Tile.Checkbox` in a grid.

## Do / Don't

```tsx
// Do: collect the selection yourself, one handler per option
const [channels, setChannels] = useState<string[]>(['email']);
const toggle = (value: string) => (checked: boolean | 'indeterminate') =>
  setChannels((prev) => (checked === true ? [...prev, value] : prev.filter((v) => v !== value)));

<CheckboxGroup aria-label="Notification channels">
  <Checkbox label="Email" checked={channels.includes('email')} onCheckedChange={toggle('email')} />
  <Checkbox label="SMS" checked={channels.includes('sms')} onCheckedChange={toggle('sms')} />
</CheckboxGroup>;
```

```tsx
// Don't: expect the group to own the value
<CheckboxGroup value={channels} onValueChange={setChannels}>
  …
</CheckboxGroup>
```

- Don't go horizontal with descriptions or long labels; the row wraps unpredictably.

## Gotchas

- There is no `value`, `onValueChange`, `name` or `disabled` on the group. Set them on each
  `Checkbox` (`name` and `value` come from the checkbox primitive).
- Adding `role="group"` yourself is redundant; only the name is missing by default.
- DOM hook: `data-slot="checkbox-group"`.
