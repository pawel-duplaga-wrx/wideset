/** The playground's stage: a three-step checkout on its second step, its props set from the rail. */
import { ProgressStepper, type ProgressStepperProps } from '@wideset/react';

export default function ProgressStepperDefault(props: Partial<ProgressStepperProps>) {
  return (
    <div className="w-[30rem] max-w-full">
      <ProgressStepper
        steps={[
          { title: 'Account', caption: 'Your details' },
          { title: 'Billing', caption: 'Plan and card' },
          { title: 'Review', caption: 'Confirm and pay' },
        ]}
        activeStep={1}
        {...props}
      />
    </div>
  );
}
