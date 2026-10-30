'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import type { DropdownMenuSeparatorProps } from './DropdownMenu.types';

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    data-slot="dropdown-menu-separator"
    className={cn('border-ws-static-base -mx-ws-3 my-ws-4 border-t', className)}
    {...props}
  />
));

DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';
