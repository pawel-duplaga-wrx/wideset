import { useSidebarContext } from './Sidebar.context';
import type { SidebarExpandedProps } from './Sidebar.types';

const SidebarExpanded = ({ children }: SidebarExpandedProps) => {
  const { isCollapsed } = useSidebarContext();

  return isCollapsed ? null : children;
};

SidebarExpanded.displayName = 'Sidebar.Expanded';

export { SidebarExpanded };
