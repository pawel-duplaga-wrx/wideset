import type { TabsLabelProps } from './Tabs.types';

const TabsLabel = ({ children, ...props }: TabsLabelProps) => (
  <span data-slot="tabs-label" {...props}>
    {children}
  </span>
);

TabsLabel.displayName = 'Tabs.Label';

export { TabsLabel };
