/** The playground's stage: the closed field with a week chosen; the calendar opens in a portal. */
import { DateRangePicker, type DateRangePickerProps } from '@wideset/react';

export default function DateRangePickerDefault(
  props: Omit<DateRangePickerProps, 'defaultSelected' | 'defaultDatePreset'>,
) {
  return (
    <DateRangePicker
      {...props}
      className="w-[18rem] max-w-full"
      defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }}
    />
  );
}
