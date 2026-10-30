'use client';

import { StatusBadge } from '@/components/ui/wideset/status-badge/StatusBadge';
import { cn } from '@/lib/wideset/utils';

import { useTabsContext } from './Tabs.context';
import type { TabsCountProps } from './Tabs.types';

const TabsCount = ({ children, className }: TabsCountProps) => {
  const { type, size } = useTabsContext();

  // At sm Figma nests the icon and label in a `Label` frame with Gap/3, while the
  // count sits outside it at the item's Gap/5. The item carries the smaller gap, so
  // the count makes up the 4px difference itself.
  const isUnderlined = type !== 'pills';
  const needsOffset = isUnderlined && size !== 'lg';

  return (
    <StatusBadge
      data-slot="tabs-count"
      color="neutral"
      emphasis="low"
      shape="rounded"
      size="sm"
      className={cn(needsOffset && 'ml-ws-3', className)}
    >
      {children}
    </StatusBadge>
  );
};

TabsCount.displayName = 'Tabs.Count';

export { TabsCount };
