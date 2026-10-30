/**
 * Medium is the default. Extra small and small fit toolbars and other dense layouts; large gives
 * the split action more presence and bigger hit areas. Both halves always share the size.
 */
import { RiArrowDownSLine } from '@remixicon/react';
import { DropdownMenu, ListItem, SplitButton } from '@wideset/react';

const menu = (
  <DropdownMenu.Item>
    <ListItem.Content>
      <ListItem.Label>Save as template</ListItem.Label>
    </ListItem.Content>
  </DropdownMenu.Item>
);

export default function SplitButtonSizes() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <SplitButton key={size} size={size} icon={RiArrowDownSLine} menuContent={menu}>
          Save
        </SplitButton>
      ))}
    </div>
  );
}
