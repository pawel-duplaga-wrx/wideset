'use client';

import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import { ListItem } from '../list-item/ListItem';
import type { SelectOptionBodyProps } from './Select.types';

export const SelectOptionBody = React.forwardRef<HTMLDivElement, SelectOptionBodyProps>(
  ({ className, children, variant, disabled, shouldDisplayCheckmark = true, ...props }, ref) => (
    <ListItem
      data-slot="select-option-body"
      ref={ref}
      variant={variant}
      disabled={disabled}
      shouldDisplayCheckmark={shouldDisplayCheckmark}
      className={cn('min-h-ws-14 self-stretch', className)}
      {...props}
    >
      {children}
    </ListItem>
  ),
);

SelectOptionBody.displayName = 'Select.OptionBody';
