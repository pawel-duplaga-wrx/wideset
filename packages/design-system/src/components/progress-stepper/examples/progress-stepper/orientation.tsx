/** Horizontal goes above a form that takes the full width, with three to five short step titles. Vertical goes in a side column next to the form and fits more steps or longer captions. Both are an ordered list, so screen readers announce the step count. */
import { ProgressStepper } from '@wideset/react';

const steps = [
  { title: 'Account', caption: 'Your details' },
  { title: 'Billing', caption: 'Plan and card' },
  { title: 'Review', caption: 'Confirm and pay' },
];

export default function ProgressStepperOrientation() {
  return (
    <div className="gap-ws-16 flex flex-col items-center">
      <div className="gap-ws-7 flex flex-col items-center">
        <span className="typography-caption-md text-ws-static-subtle">Horizontal</span>
        <ProgressStepper orientation="horizontal" steps={steps} activeStep={1} />
      </div>
      <div className="gap-ws-7 flex flex-col items-center">
        <span className="typography-caption-md text-ws-static-subtle">Vertical</span>
        <ProgressStepper orientation="vertical" steps={steps} activeStep={1} />
      </div>
    </div>
  );
}
