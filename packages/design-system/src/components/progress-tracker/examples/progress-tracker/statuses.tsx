/**
 * `activeStep` sets the statuses for you: segments before it are completed, the segment itself is
 * active, the rest are incomplete. Set `status: 'error'` on a step to flag one the user has to go
 * back and fix; it overrides the computed status and leaves the others alone. Screen readers hear the tracker as a
 * progressbar whose value is `activeStep`, so keep it pointing at the real step even when you
 * override statuses, and name each step in its tooltip.
 */
import { ProgressTracker } from '@wideset/react';

export default function ProgressTrackerStatuses() {
  return (
    <div className="w-[20rem] max-w-full">
      <ProgressTracker
        activeStep={3}
        steps={[
          { tooltip: { children: 'Cart' } },
          { status: 'error', tooltip: { children: 'Shipping' } },
          { tooltip: { children: 'Payment' } },
          { tooltip: { children: 'Review' } },
          { tooltip: { children: 'Confirmation' } },
        ]}
      />
    </div>
  );
}
