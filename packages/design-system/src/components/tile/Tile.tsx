import { Slot } from '@radix-ui/react-slot';
import { cn } from 'src/lib/utils';

import type { TileProps, TileWithSubComponents } from './Tile.types';
import { tileVariants } from './Tile.variants';
import { TileBody } from './TileBody';
import { TileCheckbox } from './TileCheckbox';
import { TileDescription } from './TileDescription';
import { TileIcon } from './TileIcon';
import { TileIndicator } from './TileIndicator';
import { TileRadio } from './TileRadio';
import { TileRadioGroup } from './TileRadioGroup';
import { TileTitle } from './TileTitle';

/**
 * A container for grouped information. Static: it renders a plain `div` and
 * carries no role, no tab stop, no key handling and no selection state.
 *
 * Pick the component that matches what the tile *is*:
 *
 * - `Tile`: static content
 * - `Tile.Checkbox`: multiple selection (`role="checkbox"`)
 * - `Tile.Radio` in `Tile.RadioGroup`: single selection (`role="radio"`)
 * - `ActionTile`: an action or a link (`<button>` / `<a>`)
 */
const Tile = ({
  asChild,
  className,
  children,
  description,
  icon,
  title,
  ref,
  ...props
}: TileProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp ref={ref} data-slot="tile" className={cn(tileVariants(), className)} {...props}>
      {asChild ? (
        children
      ) : (
        <TileBody description={description} icon={icon} title={title}>
          {children}
        </TileBody>
      )}
    </Comp>
  );
};

Tile.displayName = 'Tile';

Tile.Checkbox = TileCheckbox;
Tile.Description = TileDescription;
Tile.Icon = TileIcon;
Tile.Indicator = TileIndicator;
Tile.Radio = TileRadio;
Tile.RadioGroup = TileRadioGroup;
Tile.Title = TileTitle;

export { Tile };
export type { TileWithSubComponents };
