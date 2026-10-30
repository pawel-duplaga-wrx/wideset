/**
 * Primary is the field's normal state. Danger marks a range that failed validation, such as an
 * end date before the start; pair it with an error message under the field (Form field does
 * that), because the red border alone tells a screen reader nothing.
 */
import { DateRangePicker } from '@wideset/react';

export default function DateRangePickerVariants() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <DateRangePicker
          key={variant}
          variant={variant}
          defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }}
        />
      ))}
    </div>
  );
}
