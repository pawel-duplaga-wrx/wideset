# StatusModal

## When to use

- An outcome the user must acknowledge before going on (payment succeeded, import failed).
- A warning before it is too late (session expiring), or a destructive confirmation that
  deserves a strong signal.

## When not to use

- A dialog with a form, a list or several sections → `Modal`.
- Feedback that can stay in the page next to its cause → `InlineAlert`.
- A passing confirmation that should not block the user → `Toast`.
- A product-wide notice (maintenance, outage) → `SystemAlert`.

## Do / Don't

- Do pick the status by meaning, not by colour preference.
- Do use `vertical` sparingly, for moments that deserve weight.
- Don't put inputs or long content in it → `Modal`.
- Don't use `error` for a destructive confirmation; that is `neutral` (or `notice` if the user
  could lose work).

## Gotchas

- Passing your own `onEscapeKeyDown`, `onPointerDownOutside` or `onOpenAutoFocus` to
  `StatusModal.Content` replaces the built-in handlers, so `persistent` and `autoFocusOnOpen`
  stop working. Call `event.preventDefault()` yourself if you need both.
- There is no `StatusModal.Icon` or `StatusModal.Description`; the icon comes from `status`, the
  description is `StatusModal.Body`.
- `StatusModal.Close` is unstyled (Radix pass-through): always use it with `asChild` and a
  `Button`.
