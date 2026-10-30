import type { VariantProps } from 'class-variance-authority';
import type { AriaAttributes } from 'react';
import type { Matcher, PropsBase, PropsSingle } from 'react-day-picker';

import type { MotionProps } from '../../motion/Motion.types';
import type { textInputVariants } from '../text-input/TextInput.variants';

type DatePickerVariants = Pick<
  VariantProps<typeof textInputVariants>,
  'size' | 'preset' | 'variant'
>;

/** A single date picker with an anchored calendar. */
export type DatePickerProps = DatePickerVariants &
  MotionProps &
  Omit<
    PropsBase,
    'mode' | 'disabled' | 'id' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
  > &
  Omit<PropsSingle, 'mode' | 'selected' | 'onSelect' | 'defaultSelected'> & {
    /** Additional class name forwarded to the trigger element. */
    className?: string;
    /** Id of the trigger button, so a `<label htmlFor>` can name it. */
    id?: string;
    /** Accessible name of the trigger button when no visible label is associated. */
    'aria-label'?: string;
    /** Id of the element that names the trigger button. */
    'aria-labelledby'?: string;
    /** Ids of the elements that describe the trigger button, such as a FormField's helper text. */
    'aria-describedby'?: string;
    /** Marks the trigger button invalid; FormField sets it while it shows an error. */
    'aria-invalid'?: AriaAttributes['aria-invalid'];
    /** date-fns format string used to render the selected date in the trigger (e.g. `'MMMM d, yyyy'`). */
    dateFormat?: string;
    /** Placeholder shown in the trigger when no date is selected. Defaults to `'Pick a date'`. */
    placeholder?: string;
    /** Initial selected date in ISO format (`YYYY-MM-DD`). Uncontrolled — seeds internal state only. */
    defaultSelected?: string;
    /** Selected date in ISO format (`YYYY-MM-DD`). Provide to make the component controlled. */
    selected?: string;
    /** Disables the trigger and prevents the popup from opening. */
    disabled?: boolean;
    /** Dates or matchers that should be unselectable inside the calendar grid. */
    disabledDates?: Matcher | Matcher[];
    /** Fired when a date is picked. Receives the ISO date string (`YYYY-MM-DD`), or `undefined` if cleared. */
    onSelect?: (day?: string) => void;
  };

/** The control that opens or toggles the associated content. */
export type DatePickerTriggerProps = Pick<
  DatePickerProps,
  | 'className'
  | 'id'
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-describedby'
  | 'aria-invalid'
  | 'size'
  | 'preset'
  | 'variant'
  | 'placeholder'
  | 'defaultMotion'
> & {
  /** Disables the trigger button. */
  disabled?: boolean;
  /** Formatted date string displayed inside the trigger input. */
  value?: string;
};
