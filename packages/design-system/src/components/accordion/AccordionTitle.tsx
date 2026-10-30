import React from 'react';
import { cn } from 'src/lib/utils';

const AccordionTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="accordion-title"
      className={cn('typography-label-strong-sm', className)}
      {...props}
    >
      {children}
    </div>
  ),
);

AccordionTitle.displayName = 'AccordionTitle';

export { AccordionTitle };
