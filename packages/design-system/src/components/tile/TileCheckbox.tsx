import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { TileCheckboxProps } from './Tile.types';
import { selectableTileVariants } from './Tile.variants';
import { TileBody } from './TileBody';

/**
 * A tile used for multiple selection: the whole tile is the checkbox.
 *
 * Rooted on Radix's checkbox primitive, so the root carries `role="checkbox"`
 * and `aria-checked`, and Space toggles it, all without a key handler. That is
 * the contract screen readers expect here; `role="button"` + `aria-pressed`
 * would announce a toggle button instead.
 *
 * Put a `Tile.Indicator` inside for the visual, never a real `Switch` or
 * `Checkbox`, which would nest one control inside another.
 */
const TileCheckbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  TileCheckboxProps
>(({ className, children, description, icon, title, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="tile-checkbox"
    className={cn(selectableTileVariants(), className)}
    {...props}
  >
    <TileBody description={description} icon={icon} title={title}>
      {children}
    </TileBody>
  </CheckboxPrimitive.Root>
));

TileCheckbox.displayName = 'Tile.Checkbox';

export { TileCheckbox };
