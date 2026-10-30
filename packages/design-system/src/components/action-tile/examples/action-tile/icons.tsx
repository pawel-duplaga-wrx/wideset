/** The entity badge says what the tile is about; the trailing arrow says the tile goes somewhere. Both are decoration and hidden from screen readers, so the title has to make sense alone. Drop the arrow on a tile that does something in place instead of navigating. */
import {
  RiArrowRightLine,
  RiBankCardLine,
  RiNotification3Line,
  RiTeamLine,
} from '@remixicon/react';
import { ActionTile } from '@wideset/react';

export default function ActionTileIcons() {
  return (
    <div className="gap-ws-5 flex w-[22rem] max-w-full flex-col">
      <ActionTile
        title="Billing details"
        description="Update your card and invoice address"
        entity={RiBankCardLine}
        icon={RiArrowRightLine}
        href="#billing"
      />
      <ActionTile
        title="Invite your team"
        description="Add people by email or share a link"
        entity={RiTeamLine}
        onClick={() => {}}
      />
      <ActionTile
        title="Notifications"
        description="Choose what we email you about"
        icon={RiArrowRightLine}
        href="#notifications"
      />
      <ActionTile title="Turn on reminders" entity={RiNotification3Line} onClick={() => {}} />
    </div>
  );
}
