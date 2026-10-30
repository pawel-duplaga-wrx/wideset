/** The playground's stage: one badge with an icon and a label, its props set from the rail. */
import { RiCheckboxCircleFill } from '@remixicon/react';
import { StatusBadge, type StatusBadgeProps } from '@wideset/react';

export default function StatusBadgeDefault(props: StatusBadgeProps) {
  return (
    <StatusBadge {...props}>
      <StatusBadge.Icon icon={RiCheckboxCircleFill} />
      <StatusBadge.Label>Paid</StatusBadge.Label>
    </StatusBadge>
  );
}
