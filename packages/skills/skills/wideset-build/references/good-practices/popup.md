# Popup

## When to use

- Short interactive content tied to one control: share settings, a quick confirm, a sync status
  with a link.
- When the user should still see the page around the trigger.

## When not to use

- The decision must block the page, or needs a backdrop → `Modal`.
- Read-only hint on hover or focus, no interaction inside → `Tooltip`.
- A list of commands → `DropdownMenu`.
- Choosing a form value → `Select` or `ComboBox`.
- Long forms or detail views → `Sidepanel`.

## Do / Don't

```tsx
// Do: Container is the surface, Content the body
<Popup.Container side="bottom"><Popup.Content>…</Popup.Content></Popup.Container>

// Don't: Content as the floating surface (that is Modal's naming, not Popup's)
<Popup><Popup.Trigger /><Popup.Content>…</Popup.Content></Popup>
```

- Don't nest a Popup in a Popup; use a `Modal` or `Sidepanel` for deeper flows.

## Gotchas

- Names differ from Modal: `Popup.Container` = surface (`Modal.Content`), `Popup.Content` =
  scrolling body (`Modal.Body`).
- `Popup.Close` is unstyled (Radix pass-through): use it with `asChild`.
- Passing your own `onEscapeKeyDown` or `onPointerDownOutside` to `Popup.Container` replaces the
  built-in handlers, so `persistent` stops working; call `event.preventDefault()` yourself.
- On `Popup.Content`, `className` styles the scroll wrapper; use `contentClassName` for the
  padded inner box.
