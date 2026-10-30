import { Slot } from '@radix-ui/react-slot';
import { cn } from 'src/lib/utils';

import type { SegmentedControlIconProps } from './SegmentedControl.types';

const SegmentedControlIcon = ({ icon: Icon, className, ...props }: SegmentedControlIconProps) => {
  return (
    <Slot
      data-slot="segmented-control-icon"
      aria-hidden="true"
      className={cn('size-ws-9 shrink-0', className)}
      {...props}
    >
      <Icon focusable="false" />
    </Slot>
  );
};

SegmentedControlIcon.displayName = 'SegmentedControl.Icon';

export { SegmentedControlIcon };
