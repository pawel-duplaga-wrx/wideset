/**
 * Filled reads as selected and carries more weight; border stays light, for rows of options in
 * dense layouts. Mixing them in one row is how you show which options are on.
 */
import { Chip } from '@wideset/react';

export default function ChipStyles() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Chip style="filled">Design</Chip>
      <Chip style="border">Engineering</Chip>
    </div>
  );
}
