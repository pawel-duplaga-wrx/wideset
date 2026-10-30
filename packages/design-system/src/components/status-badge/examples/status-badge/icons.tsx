/**
 * Wrap the text in `StatusBadge.Label` whenever an icon sits next to it, so the spacing between
 * the two is right; the icon can go before or after the label. The icon is hidden from screen
 * readers, so an icon-only badge needs `role="img"` and an `aria-label` with the status.
 */
import { RiCheckboxCircleFill } from '@remixicon/react';
import { StatusBadge } from '@wideset/react';

export default function StatusBadgeIcons() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <StatusBadge color="positive" role="img" aria-label="Paid">
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
      </StatusBadge>
      <StatusBadge color="positive">
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
        <StatusBadge.Label>Paid</StatusBadge.Label>
      </StatusBadge>
      <StatusBadge color="positive">
        <StatusBadge.Label>Paid</StatusBadge.Label>
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
      </StatusBadge>
    </div>
  );
}
