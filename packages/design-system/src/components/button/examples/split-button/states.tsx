/**
 * Each half can be disabled on its own. `disabled` turns off the main action while the menu still
 * opens, for when only the default choice is unavailable; `iconDisabled` turns off the menu while
 * the main action still works. Set both when nothing can be done right now. The chevron's
 * accessible name defaults to "More options"; change it with `iconAriaLabel`.
 */
import { RiArrowDownSLine } from '@remixicon/react';
import { DropdownMenu, ListItem, SplitButton } from '@wideset/react';

const menu = (
  <DropdownMenu.Item>
    <ListItem.Content>
      <ListItem.Label>Schedule for later</ListItem.Label>
    </ListItem.Content>
  </DropdownMenu.Item>
);

export default function SplitButtonStates() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <SplitButton icon={RiArrowDownSLine} menuContent={menu}>
        Publish
      </SplitButton>
      <SplitButton icon={RiArrowDownSLine} menuContent={menu} disabled>
        Publish
      </SplitButton>
      <SplitButton icon={RiArrowDownSLine} menuContent={menu} iconDisabled>
        Publish
      </SplitButton>
      <SplitButton icon={RiArrowDownSLine} menuContent={menu} disabled iconDisabled>
        Publish
      </SplitButton>
    </div>
  );
}
