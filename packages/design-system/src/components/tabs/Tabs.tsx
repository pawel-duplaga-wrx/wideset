import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { TabsContext } from './Tabs.context';
import type { TabsProps } from './Tabs.types';
import { tabsVariants } from './Tabs.variants';
import { TabsContent } from './TabsContent';
import { TabsCount } from './TabsCount';
import { TabsIcon } from './TabsIcon';
import { TabsItem } from './TabsItem';
import { TabsLabel } from './TabsLabel';
import { TabsList } from './TabsList';

const Tabs = ({
  children,
  size,
  type,
  divider = true,
  className,
  disabled,
  defaultMotion,
  ...props
}: TabsProps) => {
  const motion = useDefaultMotion(defaultMotion);

  return (
    <TabsContext.Provider value={{ size, type, divider, disabled, motion }}>
      <RadixTabs.Root
        data-slot="tabs"
        className={cn(tabsVariants({ size, type }), className)}
        {...props}
      >
        {children}
      </RadixTabs.Root>
    </TabsContext.Provider>
  );
};

Tabs.displayName = 'Tabs';
Tabs.Icon = TabsIcon;
Tabs.Label = TabsLabel;
Tabs.Count = TabsCount;
Tabs.List = TabsList;
Tabs.Item = TabsItem;
Tabs.Content = TabsContent;

export { Tabs };
