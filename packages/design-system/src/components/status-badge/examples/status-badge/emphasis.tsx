/**
 * Low is a soft tint, the default for statuses in tables and lists where many badges sit
 * together. High is a solid fill for the one status that must be seen, such as a failed payment
 * at the top of a page. If every badge is high, none stands out.
 */
import { StatusBadge } from '@wideset/react';

export default function StatusBadgeEmphasis() {
  return (
    <div className="gap-ws-8 flex flex-col">
      {(['low', 'high'] as const).map((emphasis) => (
        <div key={emphasis} className="gap-ws-8 flex flex-wrap items-center">
          <StatusBadge emphasis={emphasis} color="negative">
            Overdue
          </StatusBadge>
          <StatusBadge emphasis={emphasis} color="notice">
            Due soon
          </StatusBadge>
          <StatusBadge emphasis={emphasis} color="positive">
            Paid
          </StatusBadge>
          <StatusBadge emphasis={emphasis} color="info">
            Scheduled
          </StatusBadge>
          <StatusBadge emphasis={emphasis} color="neutral">
            Draft
          </StatusBadge>
        </div>
      ))}
    </div>
  );
}
