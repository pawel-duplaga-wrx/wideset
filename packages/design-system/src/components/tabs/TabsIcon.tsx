import { cn } from 'src/lib/utils';

import type { TabsIconProps } from './Tabs.types';

const TabsIcon = ({ icon: Icon, className, disabled, ...props }: TabsIconProps) => (
  <Icon
    aria-hidden="true"
    focusable="false"
    className={cn(
      'size-ws-9',
      disabled ? 'text-ws-static-subtle' : 'text-ws-static-base',
      className,
    )}
    data-slot="tabs-icon"
    {...props}
  />
);

TabsIcon.displayName = 'Tabs.Icon';

export { TabsIcon };
