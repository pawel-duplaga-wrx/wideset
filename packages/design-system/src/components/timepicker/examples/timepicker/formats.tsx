/** The format changes only the labels; the value is always `HH:mm` in 24-hour time, so the same data works in both. `intervalInMinutes` sets the step (15 by default), `min` and `max` bound the list, and `mode="from"` or `"to"` drops the last or the first time for the two ends of a range. */
import { TimePicker } from '@wideset/react';

export default function TimePickerFormats() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <TimePicker className="w-[10rem]" format="24h" aria-label="Start time" defaultValue="14:30" />
      <TimePicker className="w-[10rem]" format="12h" aria-label="Start time" defaultValue="14:30" />
    </div>
  );
}
