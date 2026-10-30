/** `activeStep` sets the statuses for you: steps before it are completed, the step itself is active, the rest are incomplete and cannot be clicked until `allStepsClickable` is on. Set `status: 'error'` on a step to flag a problem the user has to go back and fix; it overrides the computed status. Screen readers hear the active step through `aria-current="step"`. */
import { ProgressStepper } from '@wideset/react';

export default function ProgressStepperStatuses() {
  return (
    <div className="gap-ws-11 flex flex-col items-center">
      <div className="w-[34rem] max-w-full">
        <ProgressStepper
          steps={[
            { title: 'Account' },
            { title: 'Billing' },
            { title: 'Shipping' },
            { title: 'Review' },
          ]}
          activeStep={2}
        />
      </div>
      <div className="w-[34rem] max-w-full">
        <ProgressStepper
          steps={[
            { title: 'Account' },
            { title: 'Billing', status: 'error' },
            { title: 'Shipping' },
            { title: 'Review' },
          ]}
          activeStep={2}
        />
      </div>
    </div>
  );
}
