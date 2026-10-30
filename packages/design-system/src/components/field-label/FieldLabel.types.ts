import type { LabelHTMLAttributes, ReactNode } from 'react';

export type FieldLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children?: ReactNode;
  required?: boolean;
  suffix?: string;
  tooltip?: ReactNode;
  aside?: ReactNode;
  description?: ReactNode;
  /** Accessible label for the tooltip icon. Defaults to `'More information'`. */
  tooltipAriaLabel?: string;
};
