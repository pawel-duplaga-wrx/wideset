/** The playground's stage: a five-step checkout on its third step, its props set from the rail. */
import { ProgressTracker, type ProgressTrackerProps } from '@wideset/react';

export default function ProgressTrackerDefault(props: Partial<ProgressTrackerProps>) {
  return (
    <div className="w-[20rem] max-w-full">
      <ProgressTracker
        steps={[
          { tooltip: { children: 'Cart' } },
          { tooltip: { children: 'Shipping' } },
          { tooltip: { children: 'Payment' } },
          { tooltip: { children: 'Review' } },
          { tooltip: { children: 'Confirmation' } },
        ]}
        activeStep={2}
        {...props}
      />
    </div>
  );
}
