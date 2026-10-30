'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import type { DropdownMenuLabelProps } from './DropdownMenu.types';

export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  DropdownMenuLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    className={cn(
      // Padding follows Figma's `Group` variant (Gap/7 on top, Gap/5 elsewhere) so the label
      // lines up with item text. Typography and colour deliberately differ from the shared
      // Figma Group component (Caption/Strong/Medium, Static/Text/Subtle).
      'typography-label-sm text-ws-dynamic-secondary-default pt-ws-7 pr-ws-5 pb-ws-5 pl-ws-5',
      inset && 'pl-ws-8',
      className,
    )}
    {...props}
  />
));

DropdownMenuLabel.displayName = 'DropdownMenu.Label';
