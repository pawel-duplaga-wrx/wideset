/** `disabled` takes dates, ranges or a matcher such as `{ before: date }` or `{ dayOfWeek: [0, 6] }`; disabled days cannot be picked, and the keyboard skips them. Say why near the calendar when the reason is not obvious, such as "Weekends are closed". */
import { Calendar } from '@wideset/react';
import { useState } from 'react';

export default function CalendarStates() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 9, 14));

  return (
    <Calendar
      mode="single"
      selected={day}
      onSelect={setDay}
      disabled={[{ dayOfWeek: [0, 6] }, { before: new Date(2026, 9, 7) }]}
      footer="Weekends are closed."
    />
  );
}
