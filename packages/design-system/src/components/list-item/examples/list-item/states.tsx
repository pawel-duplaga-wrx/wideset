/** Hover, press and keyboard highlight are live; the menu that wraps the row sets `data-state="checked"` and the highlight for you. Disabled sets `aria-disabled`, so the row stays readable to screen readers but ignores hover and press. */
import { ListItem } from '@wideset/react';

export default function ListItemStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-3 grid w-[26rem] max-w-full grid-cols-[4.5rem_1fr] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Default</span>
      <ListItem>
        <ListItem.Label>Weekly</ListItem.Label>
      </ListItem>
      <span className="typography-caption-md text-ws-static-subtle">Selected</span>
      <ListItem data-state="checked">
        <ListItem.Label>Monthly</ListItem.Label>
      </ListItem>
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <ListItem disabled>
        <ListItem.Label>Daily</ListItem.Label>
      </ListItem>
    </div>
  );
}
