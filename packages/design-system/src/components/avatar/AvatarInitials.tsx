import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from 'src/lib/utils';

import { getAvatarColor, initialsColorVariants } from './Avatar.colors';
import type { InitialsProps } from './Avatar.types';
import { avatarVariants } from './Avatar.variants';
import { useAvatarGroupContext } from './AvatarGroup.context';

const AvatarInitials = ({ initials, size, shape, status, color, className }: InitialsProps) => {
  const context = useAvatarGroupContext();

  // `Avatar.Group` resolves its own avatars together so it can keep them
  // distinct, and passes the result down; anything else derives its hue here.
  const resolved = color ?? context?.color ?? getAvatarColor(initials);

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-initials"
      className={cn(
        avatarVariants({
          size: size || context?.size,
          shape: shape || context?.shape,
          hasStatus: !!status,
        }),
        initialsColorVariants({ color: resolved, className }),
      )}
    >
      {initials}
    </AvatarPrimitive.Fallback>
  );
};

AvatarInitials.displayName = 'Avatar.Initials';

export { AvatarInitials };
