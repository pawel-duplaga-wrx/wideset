import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef } from 'react';

import type { TabsContentProps } from './Tabs.types';

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => (
  <RadixTabs.Content ref={ref} data-slot="tabs-content" {...props} />
));

TabsContent.displayName = 'Tabs.Content';

export { TabsContent };
