'use client';

import * as React from 'react';
import { cn } from '@/lib/wideset/utils';

import type { SelectOptionContentProps } from './Select.types';

export const SelectOptionContent = React.forwardRef<HTMLDivElement, SelectOptionContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      data-slot="select-option-content"
      ref={ref}
      className={cn(
        'gap-ws-5 flex min-w-0 flex-1 flex-row items-center overflow-hidden',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

SelectOptionContent.displayName = 'SelectOptionContent';
