import React from 'react';
import { cn } from 'src/lib/utils';

const AccordionCaption = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('typography-caption-md text-ws-static-subtle', className)}
      data-slot="accordion-caption"
      {...props}
    >
      {children}
    </div>
  ),
);

AccordionCaption.displayName = 'AccordionCaption';

export { AccordionCaption };
