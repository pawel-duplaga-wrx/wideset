/** A prefix identifies the row (an icon, an avatar, a checkbox); a suffix adds a fact or a control (a size, a shortcut, a switch, a chevron for a submenu). The label truncates first, so both affixes always stay whole. */
import { RiArrowRightSLine, RiFolderLine } from '@remixicon/react';
import { Avatar, Checkbox, ListItem, Switch } from '@wideset/react';

export default function ListItemAffixes() {
  return (
    <div className="gap-ws-2 flex w-[20rem] max-w-full flex-col">
      <ListItem>
        <ListItem.Prefix>
          <RiFolderLine className="size-ws-9" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Marketing assets</ListItem.Label>
          <ListItem.Description>24 files, edited today</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>2.4 MB</ListItem.Suffix>
      </ListItem>
      <ListItem>
        <ListItem.Prefix>
          <Avatar size="xs" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Anna Kowalska</ListItem.Label>
          <ListItem.Description>Product designer</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>
          <RiArrowRightSLine className="size-ws-9" />
        </ListItem.Suffix>
      </ListItem>
      <ListItem>
        <ListItem.Prefix>
          <Checkbox aria-label="Email digest" />
        </ListItem.Prefix>
        <ListItem.Label>Email digest</ListItem.Label>
        <ListItem.Suffix>
          <Switch aria-label="Weekly" />
        </ListItem.Suffix>
      </ListItem>
    </div>
  );
}
