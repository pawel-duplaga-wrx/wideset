/** Hover and focus are live. With `clearable`, a clear button appears once a time is picked; it is a separate control with its own label. Disabled removes the trigger from the tab order. */
import { TimePicker } from '@wideset/react';

export default function TimePickerStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-5 grid grid-cols-[4rem_minmax(0,10rem)] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Empty</span>
      <TimePicker aria-label="Start time" placeholder="Start time" />
      <span className="typography-caption-md text-ws-static-subtle">Picked</span>
      <TimePicker aria-label="Start time" defaultValue="09:00" clearable />
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <TimePicker aria-label="Start time" defaultValue="09:00" disabled />
    </div>
  );
}
