# Detail in a side panel

> Open one record from a list in a panel over the page, read or act on it, close back to the list.

## Problem

Users scan a list, open one row for its detail, maybe act on it, then return to the same place
in the list. A new page loses their scroll and filters; a modal is too small for detail.
`Sidepanel` is a modal dialog that slides in from the edge: one panel for the whole list,
opened with the chosen record's id.

## Structure

```
Table (see list-and-filters)
└ Table.Row
  └ Table.Cell → IconButton "Open <name>"      — the keyboard-reachable opener
Sidepanel open onOpenChange                     — one, outside the table, controlled
└ Sidepanel.Panel size onCloseAutoFocus         — side="right" (default)
  ├ Sidepanel.Actions > Sidepanel.Close asChild > IconButton
  ├ Sidepanel.Header > Sidepanel.Title + Sidepanel.Description
  ├ Sidepanel.Content                           — scrolls; dl of fields, StatusBadge, Avatar …
  └ Sidepanel.Footer                            — primary action + Sidepanel.Close (Cancel)
```

## Example

```tsx
import { RiArrowRightSLine, RiCloseLine } from '@remixicon/react';
import { Avatar, Button, IconButton, Sidepanel, StatusBadge, Table } from '@wideset/react';
import { useRef, useState } from 'react';

type Order = { id: string; number: string; customer: string; initials: string; total: string };

export function Orders({ orders }: { orders: Order[] }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // kept while closing
  const opener = useRef<HTMLButtonElement | null>(null);
  const order = orders.find((o) => o.id === selectedId);

  return (
    <>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Order</Table.Header>
            <Table.Header>Customer</Table.Header>
            <Table.Header align="right">Total</Table.Header>
            <Table.Header className="w-[4rem]" aria-label="Details" />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {orders.map((o) => (
            <Table.Row key={o.id}>
              <Table.Cell>{o.number}</Table.Cell>
              <Table.Cell>{o.customer}</Table.Cell>
              <Table.Cell align="right">{o.total}</Table.Cell>
              <Table.Cell align="right">
                <IconButton
                  icon={RiArrowRightSLine}
                  aria-label={`Open order ${o.number}`}
                  variant="secondary"
                  preset="ghost"
                  size="sm"
                  onClick={(event) => {
                    opener.current = event.currentTarget;
                    setSelectedId(o.id);
                    setOpen(true);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Sidepanel open={open} onOpenChange={setOpen}>
        <Sidepanel.Panel
          size="sm"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
        >
          <Sidepanel.Actions>
            <Sidepanel.Close asChild>
              <IconButton
                aria-label="Close"
                icon={RiCloseLine}
                variant="secondary"
                preset="border"
                size="sm"
              />
            </Sidepanel.Close>
          </Sidepanel.Actions>
          {order && (
            <>
              <Sidepanel.Header>
                <Sidepanel.Title>Order {order.number}</Sidepanel.Title>
                <Sidepanel.Description>Awaiting shipment</Sidepanel.Description>
              </Sidepanel.Header>
              <Sidepanel.Content>
                <dl className="gap-x-ws-9 gap-y-ws-7 grid grid-cols-[auto_1fr] items-center">
                  <dt className="typography-label-sm text-ws-static-subtle">Status</dt>
                  <dd>
                    <StatusBadge color="notice">Awaiting shipment</StatusBadge>
                  </dd>
                  <dt className="typography-label-sm text-ws-static-subtle">Customer</dt>
                  <dd className="gap-ws-5 typography-label-sm text-ws-static-base flex items-center">
                    <Avatar size="sm" initials={order.initials} />
                    {order.customer}
                  </dd>
                  <dt className="typography-label-sm text-ws-static-subtle">Total</dt>
                  <dd className="typography-label-sm text-ws-static-base">{order.total}</dd>
                </dl>
              </Sidepanel.Content>
              <Sidepanel.Footer>
                <Button>Mark as shipped</Button>
                <Sidepanel.Close asChild>
                  <Button variant="secondary" preset="border">
                    Cancel
                  </Button>
                </Sidepanel.Close>
              </Sidepanel.Footer>
            </>
          )}
        </Sidepanel.Panel>
      </Sidepanel>
    </>
  );
}
```

## Variants

- **Size.** `size` on `Sidepanel.Panel`: `sm` for a few fields, `md` (default) for most detail,
  `lg` for detail with its own table or tabs. `side="left"` only when the panel relates to
  something on the left (rare).
- **Edit in the panel.** Fields from [form-page](form-page.md) in `Sidepanel.Content`; the save
  button in `Sidepanel.Footer` with `form="<form id>"`.
- **Sections in the panel.** `Tabs` or `Accordion` (default, not `contained`) inside
  `Sidepanel.Content`.
- **No dividers.** `divider={false}` on `Sidepanel.Header` or `Sidepanel.Footer` for short
  panels.
- **Deep link.** Keep `selectedId` in the URL (`?order=…`) so the panel survives a reload.
- **Destructive action from the panel.** Open a confirmation (see
  [confirm-destructive](confirm-destructive.md)); don't delete straight from the footer.

## Accessibility

- `Sidepanel.Title` is required: it names the dialog. `Sidepanel.Description` describes it.
- The panel traps focus and closes on Escape and overlay click (Radix Dialog).
- Opened without `Sidepanel.Trigger`, Radix has no element to return focus to. Keep a ref to
  the opener and focus it in `onCloseAutoFocus`, as above.
- The opener in the row is a real button with a name per row (`Open order 4821`). Row click
  can be added for mouse users, never instead.
- Icon-only close button needs `aria-label`.

## Anti-patterns

- One `Sidepanel` per row; render one panel and switch the record.
- Expecting the list to stay interactive while the panel is open: Sidepanel is modal, with an
  overlay. For side-by-side list and detail, lay out two columns in the page instead.
- Clearing the record the moment the panel closes, or unmounting `Sidepanel`: the content
  vanishes mid-animation. Keep the panel mounted, drive `open`, and keep the last record.
- Putting the primary action in `Sidepanel.Actions`; the top bar is for close and small tools,
  actions go in the footer.
- A `Modal` for long record detail; Modal is for focused decisions.
