/**
 * Square is the default and lines up with table cells and other rectangular elements. Rounded is
 * a pill, a softer look for counts and badges on cards. Pick one shape per product.
 */
import { StatusBadge } from '@wideset/react';

export default function StatusBadgeShapes() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <StatusBadge shape="square" color="positive">
        Paid
      </StatusBadge>
      <StatusBadge shape="rounded" color="positive">
        Paid
      </StatusBadge>
    </div>
  );
}
