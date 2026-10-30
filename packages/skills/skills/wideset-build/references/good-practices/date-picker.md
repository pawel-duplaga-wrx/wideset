# DatePicker

## When to use

- One precise date in a form or filter where seeing the month helps: due date, publish date,
  appointment day.

## When not to use

- A span of dates → `DateRangePicker`.
- A calendar that stays visible on the page → `Calendar`.
- A time of day → `TimePicker` (place it next to the date picker for date + time).
- A date the user already knows and would rather type, such as a birth date → `TextInput`; the
  date picker trigger cannot be typed into.

## Do / Don't

```tsx
// Don't: Date objects
<DatePicker selected={new Date()} onSelect={(d) => setDue(d)} />;
// Do: ISO strings
const [due, setDue] = useState<string | undefined>('2026-11-03');
<DatePicker aria-label="Due date" selected={due} onSelect={setDue} />;
```

```tsx
// Don't: `disabled` to block days (it disables the whole field)
<DatePicker disabled={{ before: new Date() }} />
// Do
<DatePicker aria-label="Due date" disabledDates={{ before: new Date() }} />
```

## Gotchas

- Values are ISO `yyyy-MM-dd` strings; `Calendar` uses `Date` objects. Don't mix them up.
- `dateFormat` changes only the display; `onSelect` always gets ISO.
- `disabled` (boolean) disables the field; `disabledDates` blocks days. On `Calendar` the day rule
  is called `disabled`.
- Default display format differs from `DateRangePicker` (`MM.dd.yyyy` vs `MM/dd/yy`); set
  `dateFormat` on both when they appear together.
- The calendar opens in a portal, outside the trigger's DOM parent.
- `className` and `ref` go to the trigger button. DOM hook: `data-slot="date-picker"`.
