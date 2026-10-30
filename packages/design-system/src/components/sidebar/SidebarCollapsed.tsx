import { useSidebarContext } from './Sidebar.context';
import type { SidebarCollapsedProps } from './Sidebar.types';

const SidebarCollapsed = ({ children }: SidebarCollapsedProps) => {
  const { isCollapsed } = useSidebarContext();

  return isCollapsed ? children : null;
};

SidebarCollapsed.displayName = 'Sidebar.Collapsed';

export { SidebarCollapsed };
