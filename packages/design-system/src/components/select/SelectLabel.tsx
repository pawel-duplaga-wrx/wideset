import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { SelectLabelProps } from './Select.types';

export const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    // Label/Small + Font/Weight/Normal + Dynamic/Text/Secondary/Default to match
    // DropdownMenu.Label, rather than the Figma Group component's
    // Caption/Strong/Medium + Static/Text/Subtle.
    className={cn(
      'text-ws-dynamic-secondary-default typography-label-sm px-ws-5 py-ws-3',
      className,
    )}
    {...props}
  />
));

SelectLabel.displayName = 'Select.Label';
