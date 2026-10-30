/** The playground's stage: the closed trigger of a file menu; the menu opens in a portal. */
import {
  RiArrowDownSLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiPencilLine,
  RiShareLine,
} from '@remixicon/react';
import { Button, DropdownMenu, type DropdownMenuProps, ListItem } from '@wideset/react';

export default function DropdownMenuDefault(props: DropdownMenuProps) {
  return (
    <DropdownMenu {...props}>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" preset="border">
          Actions
          <Button.Icon icon={RiArrowDownSLine} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiPencilLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Rename</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiFileCopyLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Duplicate</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiShareLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Share</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">
          <ListItem.Prefix>
            <RiDeleteBinLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Delete</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
