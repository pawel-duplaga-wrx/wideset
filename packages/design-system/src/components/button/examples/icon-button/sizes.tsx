/**
 * Medium is the default. Extra small and small fit dense toolbars and table rows; large gives the
 * icon more presence and a bigger hit area. Match the size of the buttons next to it.
 */
import { RiMore2Line } from '@remixicon/react';
import { IconButton } from '@wideset/react';

export default function IconButtonSizes() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <IconButton key={size} size={size} icon={RiMore2Line} aria-label="More actions" />
      ))}
    </div>
  );
}
