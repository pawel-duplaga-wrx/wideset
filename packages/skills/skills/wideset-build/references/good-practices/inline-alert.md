# InlineAlert

## When to use

- Something in this part of the page needs fixing, attention or acknowledgement: a declined
  card in the billing section, a warning before a risky step in a form.
- The message should remain visible while the user works in that section.

## When not to use

- Brief feedback on an action that floats above the page and goes away → `Toast`.
- A message for the whole product, above everything (outage, failed payment) → `SystemAlert`.
- The user must respond before continuing → `StatusModal` or `Modal`.
- An error on one field → `errorText` on its `FormField`.

## Do / Don't

```tsx
// Do: persistent while the problem exists
<InlineAlert status="error" persistent message="Your card was declined.">
  <InlineAlert.Action>Update card</InlineAlert.Action>
</InlineAlert>

// Don't: a page-wide outage inside a form section → SystemAlert
// Don't: "Saved!" after a click → Toast
```

## Gotchas

- Any child that is not `InlineAlert.Title` or `InlineAlert.Message` is rendered as an action.
  Plain text children land in the action area, not the message.
- `InlineAlert.Title` and `InlineAlert.Message` take only `children` (no `className`); a slot
  overrides the matching `title` / `message` prop.
- `InlineAlert.Outlet` renders nothing until an alert is shown. Alerts shown through it are always
  dismissible.
- The outlet's `ref` comes from `useInlineAlert()`; the show functions do nothing before the
  outlet mounts.
- Status names are `error / warning / success / info`, not SystemAlert's
  `negative / notice / positive`.
