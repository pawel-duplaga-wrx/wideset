# Tile

## When to use

- A set of comparable options the user selects as large targets with an icon, title and
  description: plans, add-ons, integrations.
- Static summaries laid out as a set of equal blocks.

## When not to use

- The tile runs an action or opens a link → `ActionTile`.
- One piece of content with rich hierarchy and several actions → `Card`.
- Plain options with a label only → `Checkbox` or `RadioButton` in their groups.

## Do / Don't

```tsx
// Don't: a real control inside a selectable tile (nested interactive)
<Tile.Checkbox title="Backups"><Switch /></Tile.Checkbox>
// Do
<Tile.Checkbox title="Backups"><Tile.Indicator /></Tile.Checkbox>
```

- Don't add `onClick` to a static `Tile` to make it act → `ActionTile`.
- Don't put links or buttons inside `Tile.Checkbox` or `Tile.Radio`; the tile is already a button.

## Gotchas

- `Tile` and `Tile.Icon` both take `icon` as a Remix icon component, not an element.
- Children of a tile sit in one row after the shorthand body. Composed `Tile.Title` and
  `Tile.Description` placed directly as children end up side by side; wrap them in one element, or
  use the shorthand props.
- `Tile.Radio` must sit inside `Tile.RadioGroup`; it fails without the group.
- Selectable tiles stretch to the width of their container; size them with your grid.
- `Tile.RadioGroup` mirrors `RadioButtonGroup`'s contract, so the two swap in a form.
- DOM hooks: `data-slot="tile"`, `"tile-checkbox"`, `"tile-radio-group"`, `"tile-radio"`,
  `"tile-body"`, `"tile-icon"`, `"tile-title"`, `"tile-description"`, `"tile-indicator"`.
