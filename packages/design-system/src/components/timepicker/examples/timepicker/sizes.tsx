/** The same three heights as Text input and Select, so a date and a time picker line up in one row. Medium is the default. */
import { TimePicker } from '@wideset/react';

export default function TimePickerSizes() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TimePicker
          key={size}
          className="w-[9rem]"
          size={size}
          aria-label="Start time"
          placeholder="Start time"
        />
      ))}
    </div>
  );
}
