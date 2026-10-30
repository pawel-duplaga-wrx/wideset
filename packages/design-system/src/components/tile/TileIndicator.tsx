import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { IndicatorProps } from './Tile.types';
import { tileIndicatorThumbVariants, tileIndicatorTrackVariants } from './Tile.variants';

/**
 * A non-interactive switch visual that reflects the owning tile's selection
 * state. Use it inside `Tile.Checkbox` or `Tile.Radio`, where the whole tile is
 * the control.
 *
 * It is deliberately not the `Switch` component: `Switch` renders a `<button>`,
 * the tile root already is one, and a button inside a button is invalid HTML plus
 * an axe `nested-interactive` failure. This is the same split Mantine makes with
 * `Checkbox.Indicator`: it looks like the control and is not one. It is
 * `aria-hidden` because the tile already announces its own checked state.
 */
const TileIndicator = React.forwardRef<HTMLDivElement, IndicatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(tileIndicatorTrackVariants(), className)}
      data-slot="tile-indicator"
      {...props}
    >
      <span className={tileIndicatorThumbVariants()} />
    </div>
  ),
);

TileIndicator.displayName = 'Tile.Indicator';

export { TileIndicator };
