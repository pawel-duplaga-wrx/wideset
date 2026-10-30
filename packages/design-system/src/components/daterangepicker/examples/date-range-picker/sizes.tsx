/**
 * Medium is the default. Small fits dense tables and filter bars; large gives the field more
 * presence and a bigger hit area on touch screens. Match the size of the inputs next to it.
 */
import { DateRangePicker } from '@wideset/react';

export default function DateRangePickerSizes() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DateRangePicker
          key={size}
          size={size}
          defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }}
        />
      ))}
    </div>
  );
}
