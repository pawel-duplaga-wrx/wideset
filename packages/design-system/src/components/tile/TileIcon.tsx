import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { IconProps } from './Tile.types';

const TileIcon = React.forwardRef<HTMLDivElement, IconProps>(
  ({ className, icon: Icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('size-ws-11 flex items-center justify-center', className)}
      data-slot="tile-icon"
      {...props}
    >
      <Icon
        aria-hidden="true"
        focusable="false"
        className="text-ws-static-strong group-[.is-disabled]:text-ws-static-subtle size-ws-9"
      />
    </div>
  ),
);

TileIcon.displayName = 'Tile.Icon';

export { TileIcon };
