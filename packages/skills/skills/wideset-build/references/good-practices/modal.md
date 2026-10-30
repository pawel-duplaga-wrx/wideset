# Modal

## When to use

- Confirming a consequential action (archive, discard changes).
- A short form or detail view that only makes sense on its own (rename, invite people).

## When not to use

- The message is a status (success, warning, error) that needs a strong signal → `StatusModal`.
- Editing or reading detail next to the list it came from, or long forms → `Sidepanel`.
- Light content or a quick choice anchored to a button → `Popup`.
- A list of actions → `DropdownMenu`.
- Feedback that should not block the page → `Toast` or `InlineAlert`.

## Do / Don't

```tsx
// Do: close after an async action from your own state
<Modal open={open} onOpenChange={setOpen}>…
  <Button onClick={async () => { await save(); setOpen(false); }}>Save</Button>

// Don't: an extra overlay; Content already draws one
<Modal.Content><Modal.Overlay />…</Modal.Content>
```

- Don't stack a Modal on a Modal; finish or replace the first.

## Gotchas

- `Modal.Close` used bare renders the styled X icon button; wrap your own button with `asChild`.
- `persistent`, `showCloseButton` and `autoFocusOnOpen` live on `Modal.Content`, not on `Modal`.
- `Modal.Close asChild` closes immediately; for actions that may fail, control `open` instead.
- Menus, selects and tooltips inside a Modal portal to `document.body` and stack above it; no
  `z-index` work needed.
- In a Server Component use the named parts (`ModalContent`, `ModalHeader`, …), not
  `Modal.Content`.
