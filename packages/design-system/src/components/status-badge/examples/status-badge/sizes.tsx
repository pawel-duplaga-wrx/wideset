/**
 * Medium is the default. Small fits dense tables and tab counts; large sits next to larger text,
 * such as a card or page title. Badges in one list share a size.
 */
import { StatusBadge } from '@wideset/react';

export default function StatusBadgeSizes() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <StatusBadge key={size} size={size} color="info">
          Scheduled
        </StatusBadge>
      ))}
    </div>
  );
}
