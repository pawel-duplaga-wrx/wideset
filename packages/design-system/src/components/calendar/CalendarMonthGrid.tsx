import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { CalendarMonthGridProps } from './Calendar.types';
import {
  calendarGridCellClassName,
  calendarGridCellSelectedClassName,
  calendarMotionVariants,
} from './Calendar.variants';

const DEFAULT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CalendarMonthGrid = ({
  selectedMonth,
  onMonthSelect,
  title = 'Select month',
  ariaLabel = 'Month selection',
  months = DEFAULT_MONTHS,
  defaultMotion,
}: CalendarMonthGridProps) => {
  const motion = useDefaultMotion(defaultMotion);
  return (
    <div data-slot="calendar-month-grid" className="p-ws-5" role="listbox" aria-label={ariaLabel}>
      <div className="text-ws-static-strong typography-body-strong-md h-ws-18 p-ws-3 flex items-center justify-center text-center">
        {title}
      </div>
      <div className="grid min-w-[280px] grid-cols-3">
        {months.map((month, index) => {
          const isSelected = selectedMonth === index;

          return (
            <button
              key={month}
              role="option"
              type="button"
              aria-selected={isSelected}
              onClick={() => onMonthSelect?.(index)}
              className={cn(
                calendarGridCellClassName,
                calendarMotionVariants({ enabled: motion }),
                isSelected && calendarGridCellSelectedClassName,
              )}
            >
              {month}
            </button>
          );
        })}
      </div>
    </div>
  );
};

CalendarMonthGrid.displayName = 'CalendarMonthGrid';

export { CalendarMonthGrid };
