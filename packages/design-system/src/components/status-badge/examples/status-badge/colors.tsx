/**
 * Colour is semantic: negative for failures and overdue items, notice for something that needs
 * attention soon, positive for done or healthy, info for neutral news, neutral for states with no
 * judgement. The label must say the status too, since colour alone does not reach everyone.
 */
import { StatusBadge } from '@wideset/react';

export default function StatusBadgeColors() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <StatusBadge color="negative">Overdue</StatusBadge>
      <StatusBadge color="notice">Due soon</StatusBadge>
      <StatusBadge color="positive">Paid</StatusBadge>
      <StatusBadge color="info">Scheduled</StatusBadge>
      <StatusBadge color="neutral">Draft</StatusBadge>
    </div>
  );
}
