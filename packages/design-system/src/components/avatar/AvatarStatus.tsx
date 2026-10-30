import { cn } from 'src/lib/utils';

import type { StatusProps } from './Avatar.types';
import { statusVariants } from './Avatar.variants';
import { useAvatarGroupContext } from './AvatarGroup.context';

const AvatarStatus = ({ status, size, className }: StatusProps) => {
  const context = useAvatarGroupContext();

  return (
    <div
      data-slot="avatar-status"
      className={cn(statusVariants({ size: size || context?.size, status, className }))}
    >
      <span className="sr-only">{status}</span>
    </div>
  );
};

AvatarStatus.displayName = 'Avatar.Status';

export { AvatarStatus };
