import { cn } from 'src/lib/utils';

import { useStatusBadgeContext } from './StatusBadge.context';
import type { StatusBadgeIconProps } from './StatusBadge.types';
import { statusBadgeIconVariants } from './StatusBadge.variants';

const StatusBadgeIcon = ({ icon: Icon, className, ...props }: StatusBadgeIconProps) => {
  const { size } = useStatusBadgeContext();

  return (
    <Icon
      data-slot="status-badge-icon"
      {...props}
      aria-hidden="true"
      focusable="false"
      className={cn(statusBadgeIconVariants({ size }), className)}
    />
  );
};

StatusBadgeIcon.displayName = 'StatusBadge.Icon';

export { StatusBadgeIcon };
