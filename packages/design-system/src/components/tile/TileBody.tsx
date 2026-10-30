import type { TileBodyProps } from './Tile.types';
import { TileDescription } from './TileDescription';
import { TileIcon } from './TileIcon';
import { TileTitle } from './TileTitle';

/**
 * The shared inner layout of every tile flavour: an optional icon beside a
 * title/description column, wrapped in the content group Figma nests inside the
 * tile frame (`Gap/3` icon-to-text, `Gap/5` from the group to a trailing slot).
 * Internal: consumers get it implicitly via the `icon`/`title`/`description`
 * props, or compose it themselves with `Tile.Icon` / `Tile.Title`.
 */
const TileBody = ({ icon, title, description, children }: TileBodyProps) => (
  <>
    {(icon || title || description) && (
      <div data-slot="tile-body" className="gap-ws-3 flex flex-1 items-start">
        {icon && <TileIcon icon={icon} />}
        {(title || description) && (
          <div className="gap-ws-3 flex flex-1 flex-col">
            {title && <TileTitle>{title}</TileTitle>}
            {description && <TileDescription>{description}</TileDescription>}
          </div>
        )}
      </div>
    )}
    {children}
  </>
);

TileBody.displayName = 'Tile.Body';

export { TileBody };
