# SplitButton

## When to use

- There is a clear most-common action and a few variations of it: Publish / Save as draft /
  Schedule for later; Save / Save as template.

## When not to use

- No default action, only a list of equal choices → `DropdownMenu` with a `Button` trigger.
- A single action → `Button`.
- Actions for selected rows → `ActionBar`.

## Do / Don't

```tsx
// Do: border split next to a filled primary
<Button>Continue</Button>
<SplitButton preset="border" icon={RiArrowDownSLine} menuContent={items}>Save</SplitButton>

// Don't: ghost preset (not supported; the halves would not read as one control)
<SplitButton preset="ghost" … />

// Don't: pass the leading icon as `icon`; it replaces the chevron
<SplitButton icon={RiSendPlaneLine}>Publish</SplitButton>
```

## Gotchas

- `icon` is required and is the menu-trigger icon, not a leading icon. A leading icon goes in
  children as `SplitButton.Icon`.
- `className` lands on the outer wrapper; `ref` and other native props (`aria-*`, `data-*`,
  `type`) land on the main button.
- No `menuContent` means no menu: the chevron renders but opens nothing.
- `preset` is only `filled` or `border`.
