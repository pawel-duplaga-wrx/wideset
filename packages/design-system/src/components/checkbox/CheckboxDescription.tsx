import * as React from 'react';
import { cn } from 'src/lib/utils';

export const CheckboxDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="checkbox-description"
    className={cn('text-ws-static-subtle typography-body-sm', className)}
    {...props}
  >
    {children}
  </div>
));

CheckboxDescription.displayName = 'Checkbox.Description';
