/** The playground's stage: one list item with an icon, a label, a description and a suffix, its props set from the rail. */
import { RiFolderLine } from '@remixicon/react';
import { ListItem, type ListItemProps } from '@wideset/react';

export default function ListItemDefault(props: ListItemProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <ListItem {...props}>
        <ListItem.Prefix>
          <RiFolderLine className="size-ws-9" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Marketing assets</ListItem.Label>
          <ListItem.Description>24 files, edited today</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>2.4 MB</ListItem.Suffix>
      </ListItem>
    </div>
  );
}
