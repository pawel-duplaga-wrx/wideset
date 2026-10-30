# TimePicker

## When to use

- Picking a time of day on a schedule grid: meeting start, opening hours, a delivery slot.
- The start and end of a time range, as two pickers.

## When not to use

- A calendar date → `DatePicker`.
- An exact minute or a duration that does not sit on an interval → `TextInput`.
- A list of arbitrary options that happen to be times → `Select` with your own `options`.

## Do / Don't

```tsx
// Do: a time range, end after start
<div className="gap-ws-5 flex">
  <TimePicker aria-label="Start time" mode="from" value={start} onValueChange={setStart} />
  <TimePicker
    aria-label="End time"
    mode="to"
    min={start}
    value={end}
    onValueChange={setEnd}
    variant={end && start && end <= start ? 'danger' : 'primary'}
  />
</div>
```

```tsx
// Don't: 12-hour values
<TimePicker format="12h" defaultValue="02:30 PM" />
// Do
<TimePicker format="12h" defaultValue="14:30" aria-label="Start time" />
```

## Gotchas

- The value is always 24-hour `HH:mm`, even with `format="12h"`. Clearing reports `''`, not
  `undefined`.
- `min` / `max` must be `HH:mm`; anything else, or `intervalInMinutes` ≤ 0, gives an empty list
  (with a console warning for bad formats).
- `options` is not accepted, and passing `children` replaces the generated list with your own
  `Select` parts; use `Select` for that instead.
- The component is `TimePicker`; its folder and docs page are `timepicker`.
- `className` goes to the trigger; width utilities (`w-[10rem]`) set its width.
- DOM hook: `data-slot="time-picker"`.
