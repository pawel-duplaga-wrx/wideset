/** `border` is the default and suits tiles on a plain page background. `filled` drops the outline for a soft fill, which keeps a list of tiles quiet inside a card or a panel that already has a border. Use one variant per list. */
import { RiArrowRightLine, RiBankCardLine } from '@remixicon/react';
import { ActionTile } from '@wideset/react';

const variants = ['border', 'filled'] as const;

export default function ActionTileVariants() {
  return (
    <div className="gap-ws-9 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {variants.map((variant) => (
        <ActionTile
          key={variant}
          variant={variant}
          title="Billing details"
          description="Update your card and invoice address"
          entity={RiBankCardLine}
          icon={RiArrowRightLine}
          href="#billing"
        />
      ))}
    </div>
  );
}
