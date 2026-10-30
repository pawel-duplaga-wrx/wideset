import type { CalendarFooterProps } from './Calendar.types';
import { calendarFooterClassName } from './Calendar.variants';

const CalendarFooter = ({ footer }: CalendarFooterProps) => {
  if (typeof footer === 'string') {
    return (
      <div data-slot="calendar-footer" className={calendarFooterClassName}>
        {footer}
      </div>
    );
  }

  return <>{footer}</>;
};

CalendarFooter.displayName = 'CalendarFooter';

export { CalendarFooter };
