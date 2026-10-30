'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import type { DropdownMenuTriggerProps } from './DropdownMenu.types';

export const DropdownMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownMenuTriggerProps
>(({ className, asChild, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    data-slot="dropdown-menu-trigger"
    className={cn(
      'cursor-pointer',
      !asChild && 'focus-visible:wds-focus-visible focus-visible:wds-outline',
      className,
    )}
    asChild={asChild}
    {...props}
  />
));

DropdownMenuTrigger.displayName = 'DropdownMenu.Trigger';
