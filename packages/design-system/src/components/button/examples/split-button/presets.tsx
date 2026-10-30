/**
 * Filled gives the split action the full call-to-action weight; border keeps both halves visible
 * with less emphasis, for a split button next to a filled one. There is no ghost preset: without
 * a surface the two halves would not read as one control.
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

export default function SplitButtonPresets() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      {(['filled', 'border'] as const).map((preset) => (
        <SplitButton key={preset} preset={preset} icon={RiArrowDownSLine} menuContent={menu}>
          Save
        </SplitButton>
      ))}
    </div>
  );
}
