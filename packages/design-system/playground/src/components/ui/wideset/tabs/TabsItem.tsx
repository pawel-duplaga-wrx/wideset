'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/wideset/utils';

import { useTabsContext } from './Tabs.context';
import type { TabsItemProps } from './Tabs.types';
import { tabsItemMotionVariants, tabsItemVariants } from './Tabs.variants';

const TabsItem = ({
  className,
  children,
  disabled: propDisabled,
  active,
  ...props
}: TabsItemProps) => {
  const { type, size, disabled: contextDisabled, motion } = useTabsContext();
  const disabled = propDisabled || contextDisabled;

  return (
    <RadixTabs.Trigger
      className={cn(
        tabsItemVariants({ type, size }),
        tabsItemMotionVariants({ enabled: motion }),
        className,
      )}
      disabled={disabled}
      data-active={active ? '' : undefined}
      data-slot="tabs-item"
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
};

TabsItem.displayName = 'Tabs.Item';

export { TabsItem };
