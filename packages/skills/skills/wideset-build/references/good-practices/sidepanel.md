# Sidepanel

## When to use

- Details of a row or card, opened beside the list it came from (order details).
- Edit forms longer than a Modal comfortably holds.
- Filters that read before the content (left side).

## When not to use

- A short confirmation or a single decision → `Modal`.
- A status the user must acknowledge → `StatusModal`.
- Small content anchored to a trigger → `Popup`.
- Permanent app navigation → `Sidebar`.

## Do / Don't

- Do keep the list behind the panel in place, so closing returns the user to where they were.
- Do keep one side per kind of panel across the product.
- Don't open a Sidepanel from a Sidepanel; replace the content instead.
- Don't use it as the app navigation → `Sidebar`.

## Gotchas

- There is no `persistent` prop. To block outside clicks and Escape, call
  `event.preventDefault()` in `onPointerDownOutside` and `onEscapeKeyDown` on `Sidepanel.Panel`.
- `Sidepanel.Actions` sits over the header's top-right corner; keep the title short or it can
  run under the actions.
- On `Sidepanel.Content`, `className` styles the padded inner box and `wrapperClassName` the
  scroll wrapper (the opposite of `Popup.Content`).
- The surface part is `Sidepanel.Panel`, not `Sidepanel.Content`.
- `Sidepanel.Close` and `Sidepanel.Trigger` are unstyled (Radix pass-through): use `asChild`.
