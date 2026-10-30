/** The playground's stage: the closed field with a date chosen; the calendar opens in a portal. */
import { DatePicker, type DatePickerProps } from '@wideset/react';

export default function DatePickerDefault(props: DatePickerProps) {
  return <DatePicker className="w-[18rem] max-w-full" defaultSelected="2026-11-03" {...props} />;
}
