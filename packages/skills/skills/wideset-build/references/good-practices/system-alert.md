# SystemAlert

## When to use

- Product- or account-wide conditions: the workspace is back online, a payment failed,
  maintenance tonight, a new version is ready, you are viewing a shared copy.
- It sits at the top of the page, above everything else.

## When not to use

- Feedback about one section or form → `InlineAlert`.
- A short reaction to something the user just did → `Toast`.

## Do / Don't

```tsx
// Do: let the action pick its colour from the alert
<SystemAlert status="negative" emphasis="high" message="Payment failed for your plan">
  <SystemAlert.Action>Update card</SystemAlert.Action>
</SystemAlert>

// Don't: force a variant on a high alert (loses the on-colour styling)
<SystemAlert.Action variant="primary">Update card</SystemAlert.Action>

// Don't: InlineAlert status names
<SystemAlert status="error" />   // → status="negative"
```

## Gotchas

- Status names differ from InlineAlert and Toast: `negative / notice / positive / info / neutral`.
- The default status is `positive`; always set `status` explicitly.
- Any child that is not `SystemAlert.Message` is rendered as an action.
- `SystemAlert.Message` takes only `children`; it overrides the `message` prop.
- `SystemAlert.Action` throws outside a `SystemAlert`.
- Dismissal is `dismissible={false}` here, `persistent` on InlineAlert.
