/**
 * Hover, press and keyboard focus are live. `disabled` sets `aria-disabled` and takes the chip out
 * of the tab order; use it only while the option is temporarily unavailable, such as a filter
 * with no matching results.
 */
import { Chip } from '@wideset/react';

export default function ChipStates() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Chip>Remote only</Chip>
      <Chip disabled>Remote only</Chip>
    </div>
  );
}
