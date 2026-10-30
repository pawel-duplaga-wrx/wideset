/** The playground's stage: the closed field with a time picked, its props set from the rail. */
import { TimePicker, type TimePickerProps } from '@wideset/react';

export default function TimePickerDefault(props: TimePickerProps) {
  return (
    <TimePicker
      className="w-[12rem] max-w-full"
      placeholder="Start time"
      defaultValue="09:00"
      {...props}
    />
  );
}
