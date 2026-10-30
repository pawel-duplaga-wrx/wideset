'use client';

import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import type { CheckboxGroupProps } from './Checkbox.types';

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ orientation = 'vertical', className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex',
        orientation === 'vertical' ? 'gap-ws-7 flex-col' : 'gap-ws-11',
        className,
      )}
      role="group"
      data-slot="checkbox-group"
      {...props}
    >
      {children}
    </div>
  ),
);

CheckboxGroup.displayName = 'Checkbox.Group';

export { CheckboxGroup };
