import type * as React from 'react';
import type { CalendarMonth, DayPickerProps } from 'react-day-picker';

import type { MotionProps } from '../../motion/Motion.types';

/** A date selection calendar with month and year navigation. */
export type CalendarProps = DayPickerProps &
  MotionProps & {
    /** Number of years shown per page in the year picker popover. Defaults to 16. */
    yearsPerPage?: number;
    /** Fired when a month is picked from the month popover. Receives the month index (0–11). */
    onMonthSelect?: (month: number) => void;
    /** Fired when a year is picked from the year popover. Receives the four-digit year. */
    onYearSelect?: (year: number) => void;
    /** Accessible labels for the month caption navigation buttons and pickers. */
    monthCaptionAriaLabels?: {
      /** Accessible label for navigation to the previous year. */
      prevYear?: string;
      /** Accessible label for navigation to the previous month. */
      prevMonth?: string;
      /** Accessible label for the month picker trigger. */
      selectMonth?: string;
      /** Accessible label for the year picker trigger. */
      selectYear?: string;
      /** Accessible label for navigation to the next month. */
      nextMonth?: string;
      /** Accessible label for navigation to the next year. */
      nextYear?: string;
    };
    /** Labels for the month grid picker. */
    monthGridLabels?: {
      /** Title shown above the month grid. Defaults to `'Select month'`. */
      title?: string;
      /** Accessible label for the month listbox. Defaults to `'Month selection'`. */
      ariaLabel?: string;
      /** 12-element array of month abbreviations. Defaults to `['Jan', 'Feb', …, 'Dec']`. */
      months?: string[];
    };
    /** Labels for the year grid picker. */
    yearGridLabels?: {
      /** Title shown above the year grid. Defaults to `'Select year'`. */
      title?: string;
      /** Accessible label for the year listbox. Defaults to `'Year selection'`. */
      ariaLabel?: string;
      /** Accessible label for the previous-years button. Defaults to `'Previous years'`. */
      prevYears?: string;
      /** Accessible label for the next-years button. Defaults to `'Next years'`. */
      nextYears?: string;
    };
  };

/** The month and year caption with navigation controls. */
export type CalendarMonthCaptionProps = MotionProps & {
  /** The month being rendered, as provided by react-day-picker. */
  calendarMonth: CalendarMonth;
  /** The first displayed month. Navigation is always computed relative to it so all months move together. */
  displayMonth: Date;
  /** Total number of months shown side by side. Defaults to 1. */
  numberOfMonths?: number;
  /** Fired when the displayed month changes (e.g. via month/year picker selection). */
  onMonthChange: (date: Date) => void;
  /** Fired when a month is picked from the month popover. Receives the month index (0–11). */
  onMonthSelect?: (month: number) => void;
  /** Fired when a year is picked from the year popover. Receives the four-digit year. */
  onYearSelect?: (year: number) => void;
  /** Number of years shown per page in the year picker popover. Defaults to 16. */
  yearsPerPage?: number;
  /** Accessible labels for the navigation buttons and picker triggers. */
  ariaLabels?: CalendarProps['monthCaptionAriaLabels'];
  /** Labels forwarded to the month grid picker. */
  monthGridLabels?: CalendarProps['monthGridLabels'];
  /** Labels forwarded to the year grid picker. */
  yearGridLabels?: CalendarProps['yearGridLabels'];
};

/** A month selection grid. */
export type CalendarMonthGridProps = MotionProps & {
  /** Currently selected month index (0–11), used to highlight the active cell. */
  selectedMonth?: number;
  /** Fired when a month cell is clicked. Receives the month index (0–11). */
  onMonthSelect?: (month: number) => void;
  /** Title shown above the month grid. Defaults to `'Select month'`. */
  title?: string;
  /** Accessible label for the month listbox. Defaults to `'Month selection'`. */
  ariaLabel?: string;
  /** 12-element array of month abbreviations. Defaults to `['Jan', 'Feb', …, 'Dec']`. */
  months?: string[];
};

/** A year selection grid. */
export type CalendarYearGridProps = MotionProps & {
  /** Anchor year used to compute the visible year page. */
  baseYear: number;
  /** Currently selected year, used to highlight the active cell. */
  selectedYear?: number;
  /** Number of years shown per page. Defaults to 16. */
  yearsPerPage?: number;
  /** Fired when a year cell is clicked. Receives the four-digit year. */
  onYearSelect?: (year: number) => void;
  /** Title shown above the year grid. Defaults to `'Select year'`. */
  title?: string;
  /** Accessible label for the year listbox. Defaults to `'Year selection'`. */
  ariaLabel?: string;
  /** Accessible label for the previous-years button. Defaults to `'Previous years'`. */
  prevYearsAriaLabel?: string;
  /** Accessible label for the next-years button. Defaults to `'Next years'`. */
  nextYearsAriaLabel?: string;
};

/** The action area beneath the main content. */
export type CalendarFooterProps = {
  /** Footer content rendered below the calendar grid. */
  footer: React.ReactNode;
};
