/** `showDatePresets` adds a side panel of common ranges (Today, This Week, Last Month…) next to the calendar. A chosen preset shows its name in the field, not the dates, and is worked out from today when the field mounts. Turn it on for reporting filters; leave it off when the user books specific days. Open the field to see the panel. */
import { DateRangePicker } from '@wideset/react';

export default function DateRangePickerDatePresets() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <DateRangePicker className="w-[16rem]" showDatePresets defaultDatePreset="lastWeek" />
      <DateRangePicker
        className="w-[16rem]"
        showDatePresets
        defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }}
      />
    </div>
  );
}
