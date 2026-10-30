/**
 * Primary is the field's normal state. Danger marks a date that failed validation, such as a
 * due date in the past; pair it with an error message under the field (Form field does that),
 * because the red border alone tells a screen reader nothing.
 */
import { DatePicker } from '@wideset/react';

export default function DatePickerVariants() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <DatePicker key={variant} variant={variant} defaultSelected="2026-11-03" />
      ))}
    </div>
  );
}
