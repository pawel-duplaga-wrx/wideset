# Date and time

Components for picking calendar dates, date ranges and times of day. The pickers are form fields
that open a popup and speak ISO strings; `Calendar` is the always-visible grid they are built on
and speaks `Date` objects. Choose by **what** is picked (a date, a span, a time) and **where** it
lives (a field in a form, or a calendar that stays on the page).

## Pick the right one

| Picks         | In a form field   | Always visible on the page |
| ------------- | ----------------- | -------------------------- |
| One date      | `DatePicker`      | `Calendar mode="single"`   |
| A date span   | `DateRangePicker` | `Calendar mode="range"`    |
| Several days  | —                 | `Calendar mode="multiple"` |
| A time of day | `TimePicker`      | —                          |

- [DatePicker](./date-picker.md) — one precise date in a form or filter: due date, publish date.
  Value is an ISO `yyyy-MM-dd` string.
- [DateRangePicker](./date-range-picker.md) — a span of dates, with optional presets (Today,
  Last Month…) for reporting filters. Value is `{ from, to }` of ISO strings.
- [TimePicker](./timepicker.md) — a time from a list generated at a fixed interval; two of them
  (`mode="from"` / `mode="to"`) make a time range. Value is a 24-hour `HH:mm` string.
- [Calendar](./calendar.md) — the inline month grid: a scheduling panel, a booking step, your own
  popover. Value is `Date`-based.

## Rules shared by the group

- Date + time: a `DatePicker` and a `TimePicker` side by side; they share the `sm` / `md` / `lg`
  heights, `border` / `ghost` presets and `primary` / `danger` variants.
- Days that cannot be picked: `disabledDates` on the pickers, `disabled` on `Calendar`. On the
  pickers `disabled` disables the whole field.
- Display formats are separate from values: `dateFormat` (pickers) and `format` (TimePicker)
  change only what the user sees. Set `dateFormat` explicitly when `DatePicker` and
  `DateRangePicker` appear together; their defaults differ.
- Name every picker (`id` + `FormField` `htmlFor`, or `aria-label`) and pair `variant="danger"`
  with `FormField` `errorText`.
- A typed date the user already knows (birth date) is a `TextInput`, not a picker.
