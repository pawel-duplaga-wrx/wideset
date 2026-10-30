/** The playground's stage: a calendar for picking one date, with nothing selected yet. */
import { Calendar, type CalendarProps } from '@wideset/react';

export default function CalendarDefault(props: CalendarProps) {
  return <Calendar mode="single" {...props} />;
}
