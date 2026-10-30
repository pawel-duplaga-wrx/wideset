import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { TileRadioProps } from './Tile.types';
import { selectableTileVariants } from './Tile.variants';
import { TileBody } from './TileBody';

/**
 * One option of a single-select tile group. Must sit inside a
 * `Tile.RadioGroup`.
 *
 * Rooted on Radix's radio item, so the root carries `role="radio"` and
 * `aria-checked`, and the group handles arrow-key navigation and roving
 * tabindex, so the group is one tab stop, not one per tile. None of that is
 * expressible with `role="button"`.
 */
const TileRadio = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  TileRadioProps
>(({ className, children, description, icon, title, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(selectableTileVariants(), className)}
    data-slot="tile-radio"
    {...props}
  >
    <TileBody description={description} icon={icon} title={title}>
      {children}
    </TileBody>
  </RadioGroupPrimitive.Item>
));

TileRadio.displayName = 'Tile.Radio';

export { TileRadio };
