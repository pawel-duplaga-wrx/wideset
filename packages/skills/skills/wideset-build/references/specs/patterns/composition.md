# Composition laws

> What holds when several components work together on one screen, so each pattern need not repeat
> it.

Single components are in their specs; screens built from them are in the other patterns. These
are the rules that apply between components.

## Laws

1. **The screen holds the state.** Wideset components own only their local UI (open, hover,
   focus). Data, selection, filters, sort and page live in the screen, or above it, and go down
   through props. Components fetch nothing, sort nothing and slice nothing.
2. **Learn each family's value shape.** A `MultiSelect` gives `string[]`, a `Checkbox` gives
   `boolean | 'indeterminate'`, a `Select` gives a `string`, a `Table` row's selection is yours to
   track. Convert at the boundary and keep one representation in state. The table is
   props.
3. **Controlling `open` does not reset what is inside.** A reopened modal shows the form state you
   left. Reset it deliberately (on open, not on close), or `key` the content.
4. **Triggers are `asChild`.** Overlay triggers wrap your `Button` through `asChild`, so one
   button reaches the DOM with the overlay's behaviour.
5. **Overlays stack on their own.** Do not add `z-*`, a Portal or an Overlay around them. A
   `Select` or `DropdownMenu` inside a `Modal` works as is; use `portalContainer` only when
   content must render somewhere else ([overlays](../components/overlays/README.md)). Do not
   stack blocking overlays.
6. **One feedback per result.** A failure inside a form shows at the field; one that blocks a
   page is an `InlineAlert` or `SystemAlert`; a success with nothing else to show is a `Toast`.
   Never all three.
7. **Feedback sits where the eye is.** Validation goes by the field, not in a toast. A bulk result
   goes in a toast, not in a modal. Choices: [page-feedback](page-feedback.md).
8. **The app does the routing.** Pass your router's `Link` with `asChild`; Wideset never
   navigates ([app-shell](app-shell.md)).

## Row actions

One or two visible ghost `IconButton`s, or a `DropdownMenu` when there are more. Run the action in
the item's `onSelect`; open a confirmation from state, not from a `Modal.Trigger` inside the menu
item ([confirm-destructive](confirm-destructive.md)).

```tsx
import { RiMoreLine } from '@remixicon/react';
import { DropdownMenu, IconButton } from '@wideset/react';

export function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    // The menu is portaled, but React events still bubble to a clickable row.
    <div onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <IconButton
            icon={RiMoreLine}
            aria-label="Invoice actions"
            variant="secondary"
            preset="ghost"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={onEdit}>Edit</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item variant="danger" onSelect={onDelete}>
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
```

Grouped actions:

- A main action with alternatives is a `SplitButton`, not two adjacent buttons.
- Actions on a selection are an `ActionBar`, shown only while something is selected.
- A toolbar of icons is `IconButton` with `preset="ghost"`, each with an `aria-label` and a
  `Tooltip`.
- Confirm only what cannot be undone. Where undo is possible, act at once and offer Undo in a
  `Toast`: a confirmation for everything trains people to click through it.

## Collections

One source of state (query, filters, sort, page, selection); derive the rows from it.

- Reset the page when a filter changes, and clear the selection when the rows it refers to are
  gone (hide the `ActionBar` with it).
- On a server-backed list, keep the page in the URL.
- Empty, filtered-to-nothing and error are three states: an `InlineAlert` with a retry replaces
  the rows on error; never render a bare header over nothing
  ([list-and-filters](list-and-filters.md)).

## Loading

- Under about 300 ms, show nothing.
- Known length: `ProgressBar`; a sequence of stages: `ProgressStepper`.
- A region: keep the layout in place so the page does not jump, and say "Loading…" in text
  (Wideset has no skeleton or indeterminate progress).
- An action: keep the button's label, disable it against a second submit, and name the outcome in
  the toast that follows.
