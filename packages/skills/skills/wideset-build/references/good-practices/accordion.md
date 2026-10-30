# Accordion

## When to use

- Long secondary content split into named sections: FAQs, settings groups, order details.
- The user scans section names first and opens only what they need.
- Several sections may be open together (`type="multiple"`).

## When not to use

- Peer sections that replace each other in one area → `Tabs`.
- Content everyone must read; don't hide it → plain sections with headings.
- A separate surface for one subject → `Card`.
- Detail of a record over the page → `Sidepanel`.
- Steps done in order → `ProgressStepper`.

## Do / Don't

```tsx
// Do: single + collapsible so the open section can be closed again
<Accordion type="single" collapsible>…</Accordion>

// Don't: Accordion.Title/Caption side by side — wrap them in a column
<Accordion.Trigger>
  <Accordion.Title>Shipping</Accordion.Title>
  <Accordion.Caption>Free</Accordion.Caption>   // lays out in a row
</Accordion.Trigger>
```

- Don't nest accordions.
- Don't put a `contained` accordion inside a bordered `Card`; use the default dividers.

## Gotchas

- `type` is required (Radix). Without `collapsible`, a `single` accordion can't be closed once open.
- `contained` and `defaultMotion` are set once on `Accordion`, not per item.
- `Accordion.Item`, `Accordion.Trigger` and `Accordion.Content` throw outside `<Accordion>`.
- Every `Accordion.Item` needs a unique `value`.
