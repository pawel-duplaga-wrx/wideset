/**
 * Filled gives the clearest emphasis, for an icon action that stands alone. Border keeps it
 * visible with less weight. Ghost suits toolbars and table rows, where many icon actions sit
 * side by side and should stay quiet until hovered.
 */
import { RiEditLine } from '@remixicon/react';
import { IconButton } from '@wideset/react';

export default function IconButtonPresets() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      {(['filled', 'border', 'ghost'] as const).map((preset) => (
        <IconButton key={preset} preset={preset} icon={RiEditLine} aria-label="Edit" />
      ))}
    </div>
  );
}
