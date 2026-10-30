import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useState } from 'react';
import { IconButton } from 'src/components/button/IconButton';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { CalendarYearGridProps } from './Calendar.types';
import {
  calendarGridCellClassName,
  calendarGridCellSelectedClassName,
  calendarMotionVariants,
} from './Calendar.variants';

const getYearsPage = (displayedYear: number, yearsPerPage: number): number[] => {
  const startYear = displayedYear - (displayedYear % yearsPerPage);

  return Array.from({ length: yearsPerPage }, (_, i) => startYear + i);
};

const CalendarYearGrid = ({
  baseYear,
  selectedYear,
  yearsPerPage = 16,
  onYearSelect,
  title = 'Select year',
  ariaLabel = 'Year selection',
  prevYearsAriaLabel = 'Previous years',
  nextYearsAriaLabel = 'Next years',
  defaultMotion,
}: CalendarYearGridProps) => {
  const motion = useDefaultMotion(defaultMotion);
  const [pageOffset, setPageOffset] = useState(0);
  const displayedYear = baseYear + pageOffset * yearsPerPage;
  const years = getYearsPage(displayedYear, yearsPerPage);

  return (
    <div data-slot="calendar-year-grid" className="p-ws-5" role="listbox" aria-label={ariaLabel}>
      <div className="h-ws-18 gap-ws-5 flex items-center">
        <IconButton
          icon={RiArrowLeftSLine}
          preset="ghost"
          variant="secondary"
          size="md"
          defaultMotion={motion}
          aria-label={prevYearsAriaLabel}
          onClick={() => setPageOffset((prev) => prev - 1)}
          data-testid="prev-year-button"
        />
        <div className="text-ws-static-strong typography-body-strong-md p-ws-3 flex grow items-center justify-center text-center">
          {title}
        </div>
        <IconButton
          icon={RiArrowRightSLine}
          preset="ghost"
          variant="secondary"
          size="md"
          defaultMotion={motion}
          aria-label={nextYearsAriaLabel}
          onClick={() => setPageOffset((prev) => prev + 1)}
          data-testid="next-year-button"
        />
      </div>
      <div className="grid min-w-[280px] grid-cols-4">
        {years.map((year) => {
          const isSelected = selectedYear === year;

          return (
            <button
              key={year}
              role="option"
              type="button"
              aria-selected={isSelected}
              onClick={() => onYearSelect?.(year)}
              className={cn(
                calendarGridCellClassName,
                calendarMotionVariants({ enabled: motion }),
                isSelected && calendarGridCellSelectedClassName,
              )}
            >
              {year}
            </button>
          );
        })}
      </div>
    </div>
  );
};

CalendarYearGrid.displayName = 'CalendarYearGrid';

export { CalendarYearGrid };
