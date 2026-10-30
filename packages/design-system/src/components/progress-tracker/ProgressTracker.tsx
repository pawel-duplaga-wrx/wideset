import * as React from 'react';
import { cn } from 'src/lib/utils';

import { ProgressTrackerContext } from './ProgressTracker.context';
import type {
  ProgressTrackerProps,
  ProgressTrackerStepProps,
  ProgressTrackerWithSubComponents,
} from './ProgressTracker.types';
import { ProgressTrackerStep } from './ProgressTrackerStep';

const defaultStepAriaLabel = (stepIndex: number) => `Step ${stepIndex + 1}`;

const ProgressTracker = React.forwardRef<HTMLDivElement, ProgressTrackerProps>(
  (
    {
      className,
      steps,
      children,
      activeStep = 0,
      interactive = false,
      onStepClick,
      stepAriaLabel = defaultStepAriaLabel,
      ...props
    },
    ref,
  ) => {
    const stepsCount = children ? React.Children.count(children) : (steps?.length ?? 0);
    const clampedActiveStep =
      typeof activeStep === 'number' && !Number.isNaN(activeStep)
        ? Math.min(Math.max(activeStep, 0), stepsCount)
        : 0;

    if (Number.isNaN(activeStep)) {
      console.warn('ProgressTracker received NaN for `activeStep` prop.');
    }

    const renderedSteps = children
      ? React.Children.toArray(children).map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<ProgressTrackerStepProps>, {
              stepIndex: index,
              key: child.key ?? index,
            });
          }

          return child;
        })
      : steps?.map((step, index) => (
          <ProgressTrackerStep key={`progress-step-${index}`} stepIndex={index} {...step} />
        ));

    return (
      <ProgressTrackerContext.Provider
        value={{ activeStep: clampedActiveStep, interactive, onStepClick, stepAriaLabel }}
      >
        <div
          ref={ref}
          // No gap: each step already carries a 2px inset on both sides, so
          // touching boxes leave the 4px separation Figma draws between lines.
          className={cn('flex w-full items-center', className)}
          {...(interactive
            ? { role: 'group' }
            : {
                role: 'progressbar',
                'aria-valuenow': clampedActiveStep,
                'aria-valuemin': 0,
                'aria-valuemax': stepsCount,
              })}
          data-slot="progress-tracker"
          {...props}
        >
          {renderedSteps}
        </div>
      </ProgressTrackerContext.Provider>
    );
  },
) as ProgressTrackerWithSubComponents;

ProgressTracker.displayName = 'ProgressTracker';
ProgressTracker.Step = ProgressTrackerStep;

export { ProgressTracker, ProgressTrackerStep };
