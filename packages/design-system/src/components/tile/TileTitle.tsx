import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { TitleProps } from './Tile.types';

const TileTitle = React.forwardRef<HTMLParagraphElement, TitleProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="tile-title"
      {...props}
      className={cn(
        'text-ws-static-strong typography-label-strong-sm group-[.is-disabled]:text-ws-static-subtle',
        className,
      )}
    >
      {children}
    </p>
  ),
);

TileTitle.displayName = 'Tile.Title';

export { TileTitle };
