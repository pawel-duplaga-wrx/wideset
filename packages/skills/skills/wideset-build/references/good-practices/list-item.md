# ListItem

## When to use

- The row look shared by `DropdownMenu`, `Select`, `MultiSelect` and `ComboBox`. Those menus
  render ListItem for you; reach for it directly only for a custom menu or list of the same kind.
- A short list in a panel or card where each item is one thing (a file, a person, a setting)
  with at most one fact or control beside it.

## When not to use

- Items with several attributes to compare → `Table`.
- A standalone entry point to a page or action → `ActionTile`.
- A choice the user selects, as cards → `Tile`.
- A plain, non-interactive list of facts → native `ul` / `dl` with `typography-*` classes;
  ListItem always looks clickable (hover tint, pointer).

## Do / Don't

```tsx
// Do: destructive row marked as danger
<ListItem variant="danger">
  <ListItem.Prefix>
    <RiDeleteBinLine className="size-ws-9" />
  </ListItem.Prefix>
  <ListItem.Label>Delete project</ListItem.Label>
</ListItem>

// Don't: rebuild menu rows by hand inside DropdownMenu — use DropdownMenuItem
```

- Don't put two controls in one row; a row has one action.
- Don't use ListItem as a navigation list of pages → `Sidebar.Item` or `ActionTile`.

## Gotchas

- `disabled` and `data-disabled` both disable; Radix items set `data-disabled` for you.
- The checkmark appears only when `data-state="checked"`; there is no `selected` or `checked` prop.
- `ListItem.Description` throws outside `<ListItem>`; it reads `variant` and `disabled` from it.
- Animations follow `MotionProvider`; `defaultMotion={false}` turns them off for one row.
