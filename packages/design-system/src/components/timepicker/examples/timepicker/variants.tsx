/**
 * `danger` marks a time that failed validation, such as an end before the start. It changes only
 * the colour: put the reason in the FormField's `errorText`, which FormField links to the
 * control, because the red border alone does not reach screen reader users.
 */
import { TimePicker } from '@wideset/react';

export default function TimePickerVariants() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <TimePicker className="w-[10rem]" aria-label="Start time" defaultValue="09:00" />
      <TimePicker
        className="w-[10rem]"
        variant="danger"
        aria-label="End time"
        defaultValue="08:00"
      />
    </div>
  );
}
