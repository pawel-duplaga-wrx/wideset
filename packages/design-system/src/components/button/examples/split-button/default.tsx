/** The playground's stage: one split button with its menu of other actions. */
import { RiArrowDownSLine } from '@remixicon/react';
import { DropdownMenu, ListItem, SplitButton, type SplitButtonProps } from '@wideset/react';

export default function SplitButtonDefault(props: SplitButtonProps) {
  return (
    <SplitButton
      {...props}
      icon={RiArrowDownSLine}
      menuContent={
        <>
          <DropdownMenu.Item>
            <ListItem.Content>
              <ListItem.Label>Save as draft</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListItem.Content>
              <ListItem.Label>Schedule for later</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item variant="danger">
            <ListItem.Content>
              <ListItem.Label>Discard</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
        </>
      }
    >
      Publish
    </SplitButton>
  );
}
