/** The playground's stage: one chip, its props set from the rail. */
import { Chip, type ChipProps } from '@wideset/react';

export default function ChipDefault(props: ChipProps) {
  return <Chip {...props}>Remote only</Chip>;
}
