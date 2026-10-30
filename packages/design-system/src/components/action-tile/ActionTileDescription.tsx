import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { DescriptionProps } from './ActionTile.types';

const ActionTileDescription = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="action-tile-description"
      {...props}
      className={cn('typography-body-sm text-ws-static-subtle', className)}
    >
      {children}
    </p>
  ),
);

ActionTileDescription.displayName = 'ActionTile.Description';

export { ActionTileDescription };
