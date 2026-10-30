# Switch

## When to use

- Settings pages and panels where each change applies immediately: notifications, feature
  toggles, visibility.
- Turning a single feature on or off in a toolbar or table row.

## When not to use

- A choice submitted later with a form (consent, opt-in) → `Checkbox`.
- More than two states, or two named modes ("List" / "Board") → `SegmentedControl`.
- A switch look inside a selectable tile → `Tile.Indicator` in `Tile.Checkbox`, never a real
  `Switch`.

## Do / Don't

```tsx
// Do: apply immediately
<Switch
  label="Email notifications"
  checked={settings.email}
  onCheckedChange={(email) => saveSettings({ ...settings, email })}
/>
```

```tsx
// Don't: a switch behind a Save button
<Switch label="Accept the terms" />
<Button>Save</Button>
// Do
<Checkbox label="I accept the terms" />
```

## Gotchas

- `className` lands on the row container (switch plus label), unlike `Checkbox`, where it styles
  the box. `ref` still points at the switch control (`button` with `role="switch"`).
- `label` wins over children: pass one or the other.
- There is no `variant` and no description part. Put supporting text in the composed children, or
  near the switch.
- `Switch.Label` throws outside a `Switch`; it takes `htmlFor` from it.
- DOM hooks: `data-slot="switch"`, `"switch-label"`.
