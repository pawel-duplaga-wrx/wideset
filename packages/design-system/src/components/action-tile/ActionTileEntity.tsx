import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { EntityProps } from './ActionTile.types';

const ActionTileEntity = React.forwardRef<HTMLDivElement, EntityProps>(
  ({ className, icon: Icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-ws-control-lg bg-ws-non-semantic-purple-strong size-ws-14 flex items-center justify-center',
        className,
      )}
      data-slot="action-tile-entity"
      {...props}
    >
      <Icon
        aria-hidden="true"
        focusable="false"
        className="text-ws-non-semantic-purple-on-strong size-ws-11"
      />
    </div>
  ),
);

ActionTileEntity.displayName = 'ActionTile.Entity';

export { ActionTileEntity };
