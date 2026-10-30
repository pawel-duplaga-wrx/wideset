import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { SliderLabelProps } from './Slider.types';

export const SliderLabel = React.forwardRef<HTMLSpanElement, SliderLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('text-ws-static-subtle typography-number-sm', className)}
        data-slot="slider-label"
        {...props}
      >
        {children}
      </span>
    );
  },
);

SliderLabel.displayName = 'Slider.Label';
