import * as SidepanelPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

const SidepanelTitle = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SidepanelPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SidepanelPrimitive.Title
    ref={ref}
    data-slot="sidepanel-title"
    className={cn('text-ws-static-strong typography-subtitle-md', className)}
    {...props}
  />
));

SidepanelTitle.displayName = 'Sidepanel.Title';

export { SidepanelTitle };
