/** `mode="single"` picks one day; `mode="range"` takes two clicks, start then end, and fills the days between. The calendar opens on the month of the selected date. Inside a form field use Date picker or Date range picker, which wrap this calendar in a popover with an input. */
import { Calendar } from '@wideset/react';
import { useState } from 'react';

/** The shape `mode="range"` selects. */
type DateRange = { from: Date | undefined; to?: Date };

export default function CalendarModes() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 14));
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 16),
  });

  return (
    <div className="gap-ws-11 flex flex-wrap items-start justify-center">
      <Calendar mode="single" selected={day} onSelect={setDay} />
      <Calendar mode="range" selected={range} onSelect={setRange} />
    </div>
  );
}
