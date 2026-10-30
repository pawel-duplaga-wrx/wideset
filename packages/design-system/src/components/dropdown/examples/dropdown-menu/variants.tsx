/**
 * `variant="danger"` paints an item for an action that destroys or signs out. Keep it to one per
 * menu, last, behind a `DropdownMenu.Separator`, so it is never the item the pointer lands on by
 * accident. Arrow keys move through the items and Enter picks one, whatever their variant.
 */
import { RiArrowDownSLine, RiDeleteBinLine, RiDownloadLine, RiStarLine } from '@remixicon/react';
import { Button, DropdownMenu, ListItem } from '@wideset/react';

export default function DropdownMenuVariants() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" preset="border">
          Invoice #1042
          <Button.Icon icon={RiArrowDownSLine} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiDownloadLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Download PDF</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiStarLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Add to favourites</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="danger">
          <ListItem.Prefix>
            <RiDeleteBinLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Delete invoice</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
