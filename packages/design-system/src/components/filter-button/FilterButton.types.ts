import type { VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { filterButtonTriggerVariants } from './FilterButton.variants';

export type FilterButtonOption = {
  /** Unique option value returned in the selected values array. */
  value: string;
  /** Visible label rendered in the trigger summary and options list. */
  label: string;
  /** Prevents selecting the option while keeping it visible in the list. */
  disabled?: boolean;
};

/** A compact trigger for selecting multiple filter values. */
export type FilterButtonProps = {
  /** Available options rendered inside the filter popover. */
  options: FilterButtonOption[];
  /** Placeholder shown in the trigger when no options are selected. */
  placeholder?: string;
  /** Called with the full array of selected option values whenever selection changes. */
  onChange: (value: string[]) => void;
  /** Controlled array of selected option values. */
  value?: string[];
  /** Initial selected option values in uncontrolled mode. */
  defaultValue?: string[];
  /** Prefix label shown before the selected-value summary. */
  label?: string;
  /** Accessible label for the clear-filter button. Defaults to `'Clear filter'`. */
  clearFilterAriaLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> &
  MotionProps &
  VariantProps<typeof filterButtonTriggerVariants>;
