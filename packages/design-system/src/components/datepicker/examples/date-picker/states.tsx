/**
 * Empty shows the placeholder, so phrase it as the thing to pick ("Pick a due date"). With a
 * date chosen the field shows it in `dateFormat`, while `onSelect` always gets an ISO
 * `yyyy-MM-dd` string. A disabled field does not open and leaves the tab order.
 */
import { DatePicker } from '@wideset/react';

export default function DatePickerStates() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      <DatePicker placeholder="Pick a due date" />
      <DatePicker defaultSelected="2026-11-03" />
      <DatePicker defaultSelected="2026-11-03" disabled />
    </div>
  );
}
