/** The playground's stage: one action tile with an entity icon, a description and an arrow, its props set from the rail. */
import { RiArrowRightLine, RiBankCardLine } from '@remixicon/react';
import { ActionTile, type ActionTileProps } from '@wideset/react';

export default function ActionTileDefault(props: ActionTileProps) {
  return (
    <ActionTile
      className="w-[20rem] max-w-full"
      title="Billing details"
      description="Update your card and invoice address"
      entity={RiBankCardLine}
      icon={RiArrowRightLine}
      onClick={() => {}}
      {...props}
    />
  );
}
