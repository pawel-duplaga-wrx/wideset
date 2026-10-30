import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { DescriptionProps } from './Tile.types';

const TileDescription = React.forwardRef<HTMLParagraphElement, DescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="tile-description"
      {...props}
      className={cn('typography-body-sm text-ws-static-subtle', className)}
    >
      {children}
    </p>
  ),
);

TileDescription.displayName = 'Tile.Description';

export { TileDescription };
