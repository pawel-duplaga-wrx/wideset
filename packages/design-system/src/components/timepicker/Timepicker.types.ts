import type { SelectProps } from '../select/Select.types';

/** A selection control for times within a configured interval. */
export type TimePickerProps = {
  /** Earliest time option in 24-hour `HH:mm` format. Defaults to `00:00`. */
  min?: string;
  /** Latest time option in 24-hour `HH:mm` format. Defaults to `23:59`. */
  max?: string;
  /** Minutes between consecutive time options. Defaults to `15`. */
  intervalInMinutes?: number;
  /** Display format for the time labels. Defaults to `24h`. */
  format?: '12h' | '24h';
  /** For `from`, excludes the last time option; for `to`, excludes the first. Omit to include all options. */
  mode?: 'from' | 'to';
} & Omit<SelectProps, 'options'>;
