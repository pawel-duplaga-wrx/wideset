import * as SidepanelPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

const SidepanelDescription = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SidepanelPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SidepanelPrimitive.Description
    ref={ref}
    data-slot="sidepanel-description"
    className={cn('text-ws-static-subtle typography-body-lg mt-ws-3', className)}
    {...props}
  />
));

SidepanelDescription.displayName = 'Sidepanel.Description';

export { SidepanelDescription };
