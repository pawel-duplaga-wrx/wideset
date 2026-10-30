/** `danger` marks a row whose action destroys something, such as Delete or Leave team, and keeps it apart from the rest of the menu. Everything else is `primary`. */
import { RiDeleteBinLine, RiFileCopyLine } from '@remixicon/react';
import { ListItem } from '@wideset/react';

export default function ListItemVariants() {
  return (
    <div className="gap-ws-2 flex w-[20rem] max-w-full flex-col">
      <ListItem variant="primary">
        <ListItem.Prefix>
          <RiFileCopyLine className="size-ws-9" />
        </ListItem.Prefix>
        <ListItem.Label>Duplicate</ListItem.Label>
      </ListItem>
      <ListItem variant="danger">
        <ListItem.Prefix>
          <RiDeleteBinLine className="size-ws-9" />
        </ListItem.Prefix>
        <ListItem.Label>Delete project</ListItem.Label>
      </ListItem>
    </div>
  );
}
