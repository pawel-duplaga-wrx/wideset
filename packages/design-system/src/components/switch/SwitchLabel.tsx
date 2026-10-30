import * as Label from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useSwitchContext } from './Switch.context';
import type { SwitchLabelProps } from './Switch.types';

export const SwitchLabel = React.forwardRef<HTMLLabelElement, SwitchLabelProps>(
  ({ children, htmlFor, className, ...props }, ref) => {
    const { disabled, id } = useSwitchContext();

    return (
      <Label.Root
        ref={ref}
        htmlFor={htmlFor || id}
        className={cn(
          'typography-label-sm text-ws-dynamic-secondary-default cursor-pointer',
          disabled && 'text-ws-dynamic-secondary-disabled pointer-events-none',
          className,
        )}
        data-slot="switch-label"
        {...props}
      >
        {children}
      </Label.Root>
    );
  },
);

SwitchLabel.displayName = 'Switch.Label';
