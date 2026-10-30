/** `border` is the standalone field of a form. `ghost` drops the frame for a picker that sits inside a surface that already draws one, such as a table row or a toolbar. */
import { TimePicker } from '@wideset/react';

export default function TimePickerPresets() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <TimePicker
        className="w-[10rem]"
        preset="border"
        aria-label="Start time"
        placeholder="Start time"
      />
      <TimePicker
        className="w-[10rem]"
        preset="ghost"
        aria-label="Start time"
        placeholder="Start time"
      />
    </div>
  );
}
