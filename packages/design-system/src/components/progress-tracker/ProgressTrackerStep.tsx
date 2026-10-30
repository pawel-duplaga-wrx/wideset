import * as React from 'react';
import { cn } from 'src/lib/utils';

import { Tooltip } from '../tooltip/Tooltip';
import { useProgressTrackerContext } from './ProgressTracker.context';
import type {
  ProgressTrackerStep as ProgressTrackerStepData,
  ProgressTrackerStepProps,
} from './ProgressTracker.types';
import { progressTrackerStepVariants } from './ProgressTracker.variants';

/**
 * One exported name, two meanings. `ProgressTrackerStep` has always been the public type for one
 * step's data; the component needs the same name to be importable as `<ProgressTrackerStep>` in a
 * React Server Component. A type and a value may share a name when both are declared in one
 * module, so the data type is aliased here next to the component.
 */
type ProgressTrackerStep = ProgressTrackerStepData;

const ProgressTrackerStep = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  ProgressTrackerStepProps
>(({ className, status, tooltip, stepIndex = 0, ...props }, ref) => {
  const { activeStep, interactive, onStepClick, stepAriaLabel } = useProgressTrackerContext();

  const computedStatus =
    status ??
    (stepIndex < activeStep ? 'completed' : stepIndex === activeStep ? 'active' : 'incomplete');

  const stepBaseClassName = cn(
    progressTrackerStepVariants({ status: computedStatus, interactive }),
    className,
  );

  const stepElement = interactive ? (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={stepAriaLabel(stepIndex)}
      aria-current={computedStatus === 'active' ? 'step' : undefined}
      onClick={() => {
        onStepClick?.(stepIndex);
      }}
      className={stepBaseClassName}
      data-slot="progress-tracker-step"
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  ) : (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={stepBaseClassName}
      data-slot="progress-tracker-step"
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    />
  );

  if (tooltip) {
    return (
      <Tooltip variant="inverse">
        <Tooltip.Trigger asChild>{stepElement}</Tooltip.Trigger>
        <Tooltip.Content
          side="bottom"
          {...tooltip}
          className={cn('typography-body-strong-md', tooltip.className)}
        />
      </Tooltip>
    );
  }

  return stepElement;
});

ProgressTrackerStep.displayName = 'ProgressTracker.Step';

export { ProgressTrackerStep };
