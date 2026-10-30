import {
  RiArrowLeftDoubleLine,
  RiArrowLeftSLine,
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
} from '@remixicon/react';
import { addMonths, format, isSameMonth, startOfMonth } from 'date-fns';
import { useState } from 'react';
import { Button } from 'src/components/button/Button';
import { IconButton } from 'src/components/button/IconButton';
import { Popup } from 'src/components/popup/Popup';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { CalendarMonthCaptionProps } from './Calendar.types';
import { CalendarMonthGrid } from './CalendarMonthGrid';
import { CalendarYearGrid } from './CalendarYearGrid';

const CalendarMonthCaption = ({
  calendarMonth,
  displayMonth,
  numberOfMonths = 1,
  onMonthChange,
  onMonthSelect,
  onYearSelect,
  yearsPerPage = 16,
  ariaLabels,
  monthGridLabels,
  yearGridLabels,
  defaultMotion,
}: CalendarMonthCaptionProps) => {
  const motion = useDefaultMotion(defaultMotion);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);

  const isPickerVisible = isMonthPickerOpen || isYearPickerOpen;
  const date = calendarMonth.date;

  const firstMonth = startOfMonth(displayMonth);
  const isFirstMonth = isSameMonth(date, firstMonth);
  const isLastMonth = isSameMonth(date, addMonths(firstMonth, numberOfMonths - 1));

  const handleMonthPickerOpenChange = (open: boolean) => {
    setIsMonthPickerOpen(open);
    if (open) setIsYearPickerOpen(false);
  };

  const handleYearPickerOpenChange = (open: boolean) => {
    setIsYearPickerOpen(open);
    if (open) setIsMonthPickerOpen(false);
  };

  const handleMonthSelect = (m: number) => {
    const next = new Date(date);
    next.setMonth(m);
    onMonthChange(next);
    setIsMonthPickerOpen(false);
    onMonthSelect?.(m);
  };

  const handleYearSelect = (y: number) => {
    const next = new Date(date);
    next.setFullYear(y);
    onMonthChange(next);
    setIsYearPickerOpen(false);
    onYearSelect?.(y);
  };

  return (
    <div
      data-slot="calendar-month-caption"
      className="h-ws-18 relative flex w-full items-center justify-center"
    >
      {/*
       * Figma pins 32px arrow buttons at the edges and
       * centers "Month Year" as a single tight label. Month and year stay
       * separate triggers here (they open different pickers), so they hug with a
       * word-space gap (px-ws-2 + gap-ws-3) — narrow enough that even the widest
       * month name ("September") clears the arrows without box overlap.
       */}
      {!isPickerVisible && isFirstMonth && (
        <div className="left-ws-3 gap-ws-5 absolute flex items-center">
          <IconButton
            icon={RiArrowLeftDoubleLine}
            preset="ghost"
            variant="secondary"
            size="sm"
            defaultMotion={motion}
            aria-label={ariaLabels?.prevYear ?? 'Previous year'}
            onClick={() => onMonthChange(addMonths(firstMonth, -12))}
          />
          <IconButton
            icon={RiArrowLeftSLine}
            preset="ghost"
            variant="secondary"
            size="sm"
            defaultMotion={motion}
            aria-label={ariaLabels?.prevMonth ?? 'Previous month'}
            onClick={() => onMonthChange(addMonths(firstMonth, -1))}
          />
        </div>
      )}
      <div className="gap-ws-3 flex items-center justify-center">
        <Popup open={isMonthPickerOpen} onOpenChange={handleMonthPickerOpenChange}>
          <Popup.Trigger asChild>
            <Button
              preset="ghost"
              variant="secondary"
              size="sm"
              defaultMotion={motion}
              className="px-ws-2"
              aria-label={ariaLabels?.selectMonth ?? 'Select month'}
            >
              {format(date, 'MMMM')}
            </Button>
          </Popup.Trigger>
          <Popup.Container align="center" sideOffset={4} className="w-auto" defaultMotion={motion}>
            <CalendarMonthGrid
              selectedMonth={date.getMonth()}
              onMonthSelect={handleMonthSelect}
              title={monthGridLabels?.title}
              ariaLabel={monthGridLabels?.ariaLabel}
              months={monthGridLabels?.months}
              defaultMotion={motion}
            />
          </Popup.Container>
        </Popup>

        <Popup open={isYearPickerOpen} onOpenChange={handleYearPickerOpenChange}>
          <Popup.Trigger asChild>
            <Button
              preset="ghost"
              variant="secondary"
              size="sm"
              defaultMotion={motion}
              className="px-ws-2"
              aria-label={ariaLabels?.selectYear ?? 'Select year'}
            >
              {format(date, 'yyyy')}
            </Button>
          </Popup.Trigger>
          <Popup.Container align="center" sideOffset={4} className="w-auto" defaultMotion={motion}>
            <CalendarYearGrid
              baseYear={date.getFullYear()}
              yearsPerPage={yearsPerPage}
              selectedYear={date.getFullYear()}
              onYearSelect={handleYearSelect}
              title={yearGridLabels?.title}
              ariaLabel={yearGridLabels?.ariaLabel}
              prevYearsAriaLabel={yearGridLabels?.prevYears}
              nextYearsAriaLabel={yearGridLabels?.nextYears}
              defaultMotion={motion}
            />
          </Popup.Container>
        </Popup>
      </div>
      {!isPickerVisible && isLastMonth && (
        <div className="right-ws-3 gap-ws-5 absolute flex items-center">
          <IconButton
            icon={RiArrowRightSLine}
            preset="ghost"
            variant="secondary"
            size="sm"
            defaultMotion={motion}
            aria-label={ariaLabels?.nextMonth ?? 'Next month'}
            onClick={() => onMonthChange(addMonths(firstMonth, 1))}
          />
          <IconButton
            icon={RiArrowRightDoubleLine}
            preset="ghost"
            variant="secondary"
            size="sm"
            defaultMotion={motion}
            aria-label={ariaLabels?.nextYear ?? 'Next year'}
            onClick={() => onMonthChange(addMonths(firstMonth, 12))}
          />
        </div>
      )}
    </div>
  );
};

CalendarMonthCaption.displayName = 'CalendarMonthCaption';

export { CalendarMonthCaption };
