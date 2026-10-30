/** An option can carry a `prefix` (an icon, an avatar, a short text). The prefix of the chosen option is repeated in the closed field, so give every option one or none: a list where only some have a glyph reads as two kinds of item. */
import { RiBuilding2Line, RiHome4Line, RiMapPinLine } from '@remixicon/react';
import { ComboBox } from '@wideset/react';

const places = [
  { value: 'office', label: 'Office', prefix: <RiBuilding2Line className="size-ws-9" /> },
  { value: 'home', label: 'Home', prefix: <RiHome4Line className="size-ws-9" /> },
  { value: 'client', label: 'Client site', prefix: <RiMapPinLine className="size-ws-9" /> },
];

export default function ComboBoxIcons() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <ComboBox options={places} defaultValue="office" />
      <ComboBox options={places} placeholder="Where do you work?" />
    </div>
  );
}
