import * as SidepanelPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { SidepanelPanelProps } from './Sidepanel.types';
import { sidepanelPanelMotionVariants, sidepanelPanelVariants } from './Sidepanel.variants';
import { SidepanelOverlay } from './SidepanelOverlay';

const SidepanelPanel = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Content>,
  SidepanelPanelProps
>(({ side = 'right', size, className, children, defaultMotion, ...props }, ref) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <SidepanelPrimitive.Portal>
      <SidepanelOverlay defaultMotion={motion} />
      <SidepanelPrimitive.Content
        ref={ref}
        data-slot="sidepanel-panel"
        className={cn(
          sidepanelPanelVariants({ side, size }),
          sidepanelPanelMotionVariants({ enabled: motion, side }),
          className,
        )}
        {...props}
      >
        {children}
      </SidepanelPrimitive.Content>
    </SidepanelPrimitive.Portal>
  );
});

SidepanelPanel.displayName = 'Sidepanel.Panel';

export { SidepanelPanel };
