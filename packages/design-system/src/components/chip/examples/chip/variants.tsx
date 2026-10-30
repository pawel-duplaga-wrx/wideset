/**
 * Primary gives the chip brand emphasis, for selected filters and values the user just applied.
 * Secondary is quieter, for suggestions and supporting metadata. A chip is a small control: it is
 * focusable and announced as a button, so give it an action.
 */
import { Chip } from '@wideset/react';

export default function ChipVariants() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Chip variant="primary">Remote only</Chip>
      <Chip variant="secondary">Full time</Chip>
    </div>
  );
}
