# Hierarchy in practice

## Reading ladder

The roles, classes and sizes are in [typography.md](typography.md). In short: one page title, section headings one step up, body and values in `typography-body-md`, labels and metadata quieter in `text-ws-static-subtle`. Skip a level rather than inventing one. Two sizes and two colours are enough for most screens.

## Page heading

```tsx
import { RiAddLine } from '@remixicon/react';
import { Button } from '@wideset/react';

export function PageHeader() {
  return (
    <header className="gap-ws-9 flex items-start justify-between">
      <div className="gap-ws-3 flex flex-col">
        <h1 className="typography-subtitle-lg text-ws-static-strong">Invoices</h1>
        <p className="typography-body-md text-ws-static-subtle">
          142 open, 18 overdue. Totals are in your billing currency.
        </p>
      </div>
      <Button>
        <Button.Icon icon={RiAddLine} />
        New invoice
      </Button>
    </header>
  );
}
```

The description is useful, not a greeting. The one filled button is the job of the page.

## Metrics

A metric needs comparison to mean anything. Prefer a single row of plain numbers with labels and a delta to a set of decorated cards. If a number drives no decision, remove it.

Tables, numbers and key figures: see [data.md](data.md). Actions: see [components-and-actions.md](components-and-actions.md).
