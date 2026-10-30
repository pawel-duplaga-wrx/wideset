/**
 * A `disabled` item stays in the menu, dimmed, and the arrow keys skip it. Keep it only when the
 * user can tell why it is unavailable (say so in the label); otherwise leave the item out.
 * `DropdownMenu.Label` titles a group of items and cannot be focused or picked.
 */
import { RiArrowDownSLine, RiBarChartLine, RiQuestionLine, RiUserLine } from '@remixicon/react';
import { Button, DropdownMenu, ListItem } from '@wideset/react';

export default function DropdownMenuStates() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" preset="border">
          Account
          <Button.Icon icon={RiArrowDownSLine} />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiUserLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Profile</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled>
          <ListItem.Prefix>
            <RiBarChartLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Reports (coming soon)</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Support</DropdownMenu.Label>
        <DropdownMenu.Item>
          <ListItem.Prefix>
            <RiQuestionLine className="size-ws-9" />
          </ListItem.Prefix>
          <ListItem.Content>
            <ListItem.Label>Help centre</ListItem.Label>
          </ListItem.Content>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
