'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import { ListItem } from '../list-item/ListItem';
import { useDropdownMenuContext } from './DropdownMenu.context';
import type { DropdownMenuItemProps } from './DropdownMenu.types';

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, children, onSelect, variant, defaultMotion, ...props }, ref) => {
  const { motion } = useDropdownMenuContext();

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      // Figma pins the menu row's min-height to `Size/14` (32px); ListItem's
      // padding (Gap/3 + 20px content + Gap/3) only reaches 28px on its own.
      className={cn('min-h-ws-14 outline-hidden', className)}
      {...props}
      asChild
      onSelect={onSelect}
    >
      <ListItem variant={variant} defaultMotion={defaultMotion ?? motion}>
        {children}
      </ListItem>
    </DropdownMenuPrimitive.Item>
  );
});

DropdownMenuItem.displayName = 'DropdownMenu.Item';
