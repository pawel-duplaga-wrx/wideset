/** Off by default, so each month reads as one block. Turn `showOutsideDays` on when a range often crosses into the next month and the reader needs to see where it continues. Outside days can be picked like any other. */
import { Calendar } from '@wideset/react';

export default function CalendarOutsideDays() {
  return (
    <div className="gap-ws-11 flex flex-wrap items-start justify-center">
      <Calendar mode="single" />
      <Calendar mode="single" showOutsideDays />
    </div>
  );
}
