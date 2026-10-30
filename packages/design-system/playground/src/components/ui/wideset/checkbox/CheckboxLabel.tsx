'use client';

import * as Label from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import { useCheckboxContext } from './Checkbox.context';
import type { CheckboxLabelProps } from './Checkbox.types';

export const CheckboxLabel = React.forwardRef<HTMLLabelElement, CheckboxLabelProps>(
  ({ children, htmlFor, className, ...props }, ref) => {
    const { disabled, id } = useCheckboxContext();

    return (
      <Label.Root
        ref={ref}
        htmlFor={htmlFor || id}
        className={cn(
          'typography-label-sm text-ws-static-base cursor-pointer',
          disabled && 'text-ws-static-subtle pointer-events-none',
          className,
        )}
        data-slot="checkbox-label"
        {...props}
      >
        {children}
      </Label.Root>
    );
  },
);

CheckboxLabel.displayName = 'Checkbox.Label';
