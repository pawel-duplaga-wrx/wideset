---
name: Slider
import: import { Slider } from '@wideset/react'
group: selection
status: stable
parts: [Slider, SliderLabel]
related: [TextInput, SegmentedControl, ProgressBar]
docs: https://wideset-docs.widelab.workers.dev/components/slider
storybook: components-slider--default
---

# Slider

> Picks a value, or a range between two values, by adjusting along a scale.

## When to use

- The value is relative and the user tunes it by feel: volume, opacity, a price range filter.
- The scale has clear ends (`min`, `max`) and the exact number matters less than the position.

## When not to use

- Precise numeric entry → `TextInput` with `type="number"` (or pair it with a slider, see below).
- A few named steps ("Low", "Medium", "High") → `SegmentedControl`.
- Showing progress the user does not control → `ProgressBar`.

## Anatomy

```tsx
<Slider aria-label="Volume" defaultValue={[40]} labels="side" />

<Slider
  type="range"
  thumbAriaLabels={['Minimum price', 'Maximum price']}
  defaultValue={[20, 80]}
  showTooltipValue
/>
```

`Slider.Label` / `SliderLabel` is the numeric caption the slider uses for its `min` / `max`; use it
when you compose your own readout next to the slider.

## Choosing props

| Prop                     | Value                                         | Use for                                                                 |
| ------------------------ | --------------------------------------------- | ----------------------------------------------------------------------- |
| `type`                   | `single` (default)                            | one value                                                               |
|                          | `range`                                       | an interval between two thumbs                                          |
| `value` / `defaultValue` | `number[]`                                    | `[40]` for single, `[20, 80]` for range                                 |
| `onValueChange`          | `(value: number[]) => void`                   | fires while dragging, in both modes                                     |
| `min` / `max` / `step`   | defaults `0` / `100` / `1`                    | the scale                                                               |
| `labels`                 | `side`                                        | prints `min` and `max` at both ends (the usual choice)                  |
|                          | `bottom`                                      | `min` and `max` under the track, for narrow rows                        |
|                          | `left` / `right`                              | one end only                                                            |
| `showTooltipValue`       | `true` or `top` / `right` / `bottom` / `left` | the current value above (or beside) the thumb while dragging or focused |

## States

- Default, hover, dragging, keyboard focus (ring only for keyboard), disabled.
- Disabled ignores the pointer and leaves the tab order; say why it is locked.

## Content

- `labels` prints plain numbers. Name what the slider sets in a visible label next to it, and put
  units in that label ("Price, EUR").

## Accessibility

- Always name it: `aria-label`, `aria-labelledby`, or `thumbAriaLabels`. Without a name the thumb
  falls back to "Slider thumb".
- In a range, `aria-label="price"` becomes "Minimum price" / "Maximum price"; `thumbAriaLabels`
  sets each thumb's name exactly.
- Each thumb is its own tab stop. Arrows move one step, Page Up / Page Down ten, Home / End jump
  to the ends.

## Do / Don't

```tsx
// Do: slider plus number inputs when the exact value matters
const [value, setValue] = useState([20, 80]);
<Slider type="range" value={value} onValueChange={setValue} aria-label="price" />
<TextInput size="sm">
  <TextInput.Input
    aria-label="Minimum price"
    type="number"
    value={value[0]}
    onChange={(e) => setValue([Number(e.target.value), value[1]])}
  />
</TextInput>
```

```tsx
// Don't: a scalar value
<Slider defaultValue={40} />
// Do
<Slider defaultValue={[40]} aria-label="Volume" />
```

## Gotchas

- Values are always arrays, even for `type="single"`.
- Without `defaultValue`, single starts at `min` and range at `[min, max]`.
- `onValueChange` fires on every step while dragging; save on `onValueCommit` when the work is
  expensive.
- `className` and `ref` go to the outer wrapper (track plus labels); every other prop goes to the
  slider itself.
- The slider is horizontal only; don't pass `orientation="vertical"`.
- DOM hooks: `data-slot="slider"`, `"slider-thumb"`, `"slider-label"`.

## API

Full props: `https://wideset-docs.widelab.workers.dev/components/slider.md` · Types:
`packages/design-system/src/components/slider/Slider.types.ts`
