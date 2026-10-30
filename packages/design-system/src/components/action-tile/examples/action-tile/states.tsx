/** Hover, press and focus are live. A disabled tile loses its arrow and leaves the tab order: a button gets native `disabled`, a link gets `aria-disabled` and stops navigating. Say nearby why the tile is unavailable. */
import { RiArrowRightLine, RiBankCardLine } from '@remixicon/react';
import { ActionTile } from '@wideset/react';

const variants = ['border', 'filled'] as const;

export default function ActionTileStates() {
  return (
    <div className="gap-ws-9 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {variants.map((variant) => (
        <div key={variant} className="gap-ws-5 flex flex-col">
          <ActionTile
            variant={variant}
            title="Billing details"
            description="Update your card and invoice address"
            entity={RiBankCardLine}
            icon={RiArrowRightLine}
            onClick={() => {}}
          />
          <ActionTile
            variant={variant}
            title="Billing details"
            description="Only owners can change billing"
            entity={RiBankCardLine}
            icon={RiArrowRightLine}
            onClick={() => {}}
            disabled
          />
        </div>
      ))}
    </div>
  );
}
