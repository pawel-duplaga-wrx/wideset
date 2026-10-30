import { cn } from 'src/lib/utils';

import type { SidebarHeaderProps } from './Sidebar.types';

const SidebarHeader = ({ children, className, ...props }: SidebarHeaderProps) => (
  <div
    data-slot="sidebar-header"
    className={cn('w-full min-w-0 shrink-0 empty:hidden', className)}
    {...props}
  >
    {children}
  </div>
);

SidebarHeader.displayName = 'Sidebar.Header';

export { SidebarHeader };
