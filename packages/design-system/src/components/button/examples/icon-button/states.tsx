/**
 * Hover, press and keyboard focus are live. A disabled icon button cannot be focused, so a
 * keyboard or screen reader user may not find it at all; disable it only while the action is
 * temporarily unavailable, and keep the toolbar's layout the same either way.
 */
import { RiRefreshLine } from '@remixicon/react';
import { IconButton } from '@wideset/react';

export default function IconButtonStates() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <IconButton icon={RiRefreshLine} aria-label="Refresh" />
      <IconButton icon={RiRefreshLine} aria-label="Refresh" disabled />
    </div>
  );
}
