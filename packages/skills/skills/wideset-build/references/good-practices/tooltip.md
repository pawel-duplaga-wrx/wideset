# Tooltip

## When to use

- Naming or explaining an icon-only control (Share, Filter).
- A one-line extra detail that helps but is not needed to complete the task.

## When not to use

- Anything interactive inside (links, buttons, inputs) → `Popup`.
- Instructions the user needs to fill a field; they must stay visible → `FormField` helper text.
- Errors or status → `InlineAlert` or `Toast`.
- Touch-first screens, where there is no hover: put the text on screen instead.

## Do / Don't

```tsx
// Do: asChild onto a real control
<Tooltip.Trigger asChild><IconButton icon={RiFilter3Line} aria-label="Filter" /></Tooltip.Trigger>

// Don't: a plain icon is not focusable, and the tooltip never reaches keyboard users
<Tooltip.Trigger asChild><RiInformationLine /></Tooltip.Trigger>
```

- Don't put buttons or links in `Tooltip.Content` → `Popup`.

## Gotchas

- `default` is the dark tooltip and `inverse` the light one. Choose by the surface behind the
  trigger; do not reach for `inverse` to mean "dark".
- A disabled `<button>` receives no hover or focus, so its tooltip never shows. Explain the
  disabled reason in text, or wrap the button in a focusable element.
- Without `asChild`, `Tooltip.Trigger` renders its own `<button>`; do not put a button inside it.
- `Tooltip.Portal` is optional: Content already portals. Wrap only to set a different
  `container` or `forceMount`.
