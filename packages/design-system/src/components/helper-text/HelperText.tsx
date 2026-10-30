import { RiAlertFill, RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';

import type { HelperTextProps } from './HelperText.types';
import { helperTextIconVariants, helperTextVariants } from './HelperText.variants';

const iconsByState = {
  error: RiErrorWarningFill,
  warning: RiAlertFill,
  success: RiCheckboxCircleFill,
};

export const HelperText = ({ children, state, showIcon, ...props }: HelperTextProps) => {
  if (!children && !showIcon) return null;

  const Icon = iconsByState[state as keyof typeof iconsByState];

  return (
    <span data-slot="helper-text" className={helperTextVariants({ state })} {...props}>
      {showIcon && state && state !== 'default' && (
        <Icon aria-hidden="true" focusable="false" className={helperTextIconVariants({ state })} />
      )}
      {children}
    </span>
  );
};
