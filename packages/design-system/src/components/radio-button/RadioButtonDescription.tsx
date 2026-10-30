import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useRadioButtonContext } from './RadioButton.context';

export const RadioButtonDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ children, className, onClick, ...props }, ref) => {
  const { disabled, id } = useRadioButtonContext();

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || disabled || !id) return;

    document.getElementById(id)?.click();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      ref={ref}
      className={cn(
        'text-ws-static-subtle typography-body-sm cursor-pointer',
        disabled && 'pointer-events-none',
        className,
      )}
      onClick={handleClick}
      data-slot="radio-button-description"
      {...props}
    >
      {children}
    </span>
  );
});

RadioButtonDescription.displayName = 'RadioButton.Description';
