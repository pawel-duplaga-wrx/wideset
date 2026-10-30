# Selection

Controls where the user picks from options or sets a value: on/off, one of many, several of many,
or a point on a scale. They differ in two ways that decide the choice: **how many** can be picked
(one, several, a value) and **when** it applies (immediately, or when the form is saved). Lists
behind a trigger (`Select`, `MultiSelect`, `ComboBox`) live in `inputs`.

## Pick the right one

Start from the two questions:

| How many?                               | Applies with the form               | Applies immediately            |
| --------------------------------------- | ----------------------------------- | ------------------------------ |
| On / off, one setting                   | `Checkbox`                          | `Switch`                       |
| Several of a visible set                | `Checkbox` in `CheckboxGroup`       | `Chip` (filter row)            |
| Exactly one of a visible set            | `RadioButton` in `RadioButtonGroup` | `SegmentedControl`             |
| Rich options (icon, title, description) | `Tile.Checkbox` / `Tile.Radio`      | `Tile.Checkbox` / `Tile.Radio` |
| A value on a scale                      | `Slider`                            | `Slider`                       |

- [Checkbox](./checkbox.md) — one independent choice saved with the form, or a row selector with
  "Select all". Not for immediate settings.
- [CheckboxGroup](./checkbox-group.md) — lays out and names several checkboxes; holds no state.
- [RadioButton](./radio-button.md) — one option of a short visible set where exactly one must be
  picked; always inside its group.
- [RadioButtonGroup](./radio-button-group.md) — owns the single value, keyboard model and form
  `name` for its radios.
- [Switch](./switch.md) — an on/off setting that takes effect the moment it flips; no save button.
- [Slider](./slider.md) — a value or range tuned along a scale; pair with a number input when the
  exact value matters.
- [SegmentedControl](./segmented-control.md) — one of a few short options that switches the view
  of the content next to it, immediately. Separate panels of content are `Tabs`.
- [Chip](./chip.md) — a small clickable label: toggle a filter, show an applied value, remove it.
  Read-only labels are `Tag`; statuses are `StatusBadge`.
- [Tile](./tile.md) — a bordered block, static or as a whole one selectable option
  (`Tile.Checkbox`, `Tile.Radio`). A tile that acts or links is `ActionTile`.

## Rules shared by the group

- Selection state is `onCheckedChange` (Checkbox, Switch, Tile.Checkbox) or `onValueChange`
  (RadioButtonGroup, SegmentedControl, Slider, Tile.RadioGroup); none of them uses `onChange`.
- Every control needs a name: a visible label, or `aria-label`. Groups need a name too.
- Never nest one control inside another (a `Switch` in a tile, a button in a chip).
- `danger` (Checkbox, RadioButton) is a hint, never the message: the label states the consequence.
