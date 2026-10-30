# Search

## When to use

- Never in new code. Search is a thin wrapper over `TextInput` with no behaviour of its own.

## When not to use

- Any search or filter field → compose `TextInput` with `TextInput.Input type="search"`.
- Search inside a `Select` list → `hasSearch` on `Select` / `MultiSelect`, or `Select.Search`.
- Search that suggests or picks from a list as the user types → `ComboBox`.

## Gotchas

- Search defaults to `preset="border"`, the same as TextInput, so the look does not change.
- Keep `type="search"` on `TextInput.Input`: it is what Search set, and it gives the search
  semantics and the mobile search key.
