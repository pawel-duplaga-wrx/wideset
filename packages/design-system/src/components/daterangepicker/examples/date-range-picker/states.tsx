/**
 * Empty shows the placeholder, so phrase it as the thing to pick ("Pick your stay"). With a
 * range chosen the field shows both ends in `dateFormat`, while `onSelect` always gets ISO
 * `yyyy-MM-dd` strings. A disabled field does not open and leaves the tab order.
 */
import { DateRangePicker } from '@wideset/react';

export default function DateRangePickerStates() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      <DateRangePicker placeholder="Pick your stay" />
      <DateRangePicker defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }} />
      <DateRangePicker defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }} disabled />
    </div>
  );
}
