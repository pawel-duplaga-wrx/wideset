# Calendar

## When to use

- The calendar is part of the page: a scheduling side panel, a booking step, a dashboard filter
  that stays open.
- Inside your own popover or panel when neither picker fits.

## When not to use

- A form field that opens a calendar → `DatePicker` (one date) or `DateRangePicker` (a span).
- A time of day → `TimePicker`.

## Do / Don't

```tsx
// Do: range state shaped as react-day-picker expects
type Range = { from: Date | undefined; to?: Date };
const [range, setRange] = useState<Range | undefined>();

<Calendar mode="range" selected={range} onSelect={setRange} />;
```

```tsx
// Don't: ISO strings (that is the DatePicker contract)
<Calendar mode="single" selected="2026-11-03" />
// Do
<Calendar mode="single" selected={new Date(2026, 10, 3)} onSelect={setDay} />
```

- Don't build a field + popover around `Calendar` for a form → `DatePicker` already is one.

## Gotchas

- `Calendar` works with `Date` objects; `DatePicker` and `DateRangePicker` work with ISO strings.
- Without `mode` nothing can be selected.
- Here `disabled` blocks days; on the pickers the same rule is `disabledDates`.
- `className` goes on the calendar's root; `classNames` merges per-part overrides, which restyle
  the component and drift from Figma: avoid them.
- DOM hook: `data-slot="calendar"`.
