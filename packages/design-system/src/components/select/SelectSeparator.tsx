import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { SelectSeparatorProps } from './Select.types';

export const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    data-slot="select-separator"
    className={cn('border-ws-static-base my-ws-3 border-t', className)}
    {...props}
  />
));

SelectSeparator.displayName = 'Select.Separator';
