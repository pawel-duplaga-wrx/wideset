import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { IconProps } from './ActionTile.types';

const ActionTileIcon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ className, icon: Icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('size-ws-14 flex items-center justify-center', className)}
      data-slot="action-tile-icon"
      {...props}
    >
      <Icon
        aria-hidden="true"
        focusable="false"
        className="text-ws-dynamic-secondary-default size-ws-9"
      />
    </div>
  ),
);

ActionTileIcon.displayName = 'ActionTile.Icon';

export { ActionTileIcon };
