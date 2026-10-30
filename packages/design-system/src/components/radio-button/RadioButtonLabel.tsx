import * as Label from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useRadioButtonContext } from './RadioButton.context';
import type { RadioButtonLabelProps } from './RadioButton.types';

export const RadioButtonLabel = React.forwardRef<HTMLLabelElement, RadioButtonLabelProps>(
  ({ children, htmlFor, className, ...props }, ref) => {
    const { disabled, id } = useRadioButtonContext();

    return (
      <Label.Root
        ref={ref}
        htmlFor={htmlFor || id}
        className={cn(
          'typography-label-sm text-ws-static-base cursor-pointer',
          disabled && 'text-ws-static-subtle pointer-events-none',
          className,
        )}
        data-slot="radio-button-label"
        {...props}
      >
        {children}
      </Label.Root>
    );
  },
);

RadioButtonLabel.displayName = 'RadioButton.Label';
