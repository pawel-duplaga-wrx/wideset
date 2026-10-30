import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  useCallback,
} from 'react';
import { cn } from 'src/lib/utils';

import type {
  ProgressStepperIconProps,
  ProgressStepperProps,
  ProgressStepperWithSubComponents,
} from './ProgressStepper.types';
import { progressStepperVariants } from './ProgressStepper.variants';
import { ProgressStepperIcon } from './ProgressStepperIcon';
import { ProgressStepperStep } from './ProgressStepperStep';

const ProgressStepper = forwardRef<HTMLOListElement, ProgressStepperProps>(
  (
    {
      className,
      steps,
      activeStep = 0,
      orientation = 'horizontal',
      onStepChange,
      allStepsClickable,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const getStepStatus = useCallback(
      (
        index: number,
        stepStatus: ProgressStepperIconProps['status'],
      ): ProgressStepperIconProps['status'] => {
        if (stepStatus != null) return stepStatus;
        if (index < activeStep) return 'completed';
        if (index === activeStep) return 'active';
        return 'incomplete';
      },
      [activeStep],
    );

    const childrenArray = Children.toArray(children);
    const hasComposedChildren = children != null && Children.count(children) > 0;

    const mapChildSteps = (source: ReturnType<typeof Children.toArray>) =>
      source.map((child, index) => {
        if (!isValidElement(child) || child.type !== ProgressStepperStep) return child;
        const childProps = child.props as { step?: number; onClick?: (step: number) => void };
        return cloneElement(
          child as ReactElement<{
            withLine?: boolean;
            isActive?: boolean;
            step?: number;
            onClick?: (step: number) => void;
          }>,
          {
            withLine: index !== source.length - 1,
            isActive: childProps.step === activeStep,
            onClick: childProps.onClick ?? (onStepChange ? onStepChange : undefined),
          },
        );
      });

    const renderedSteps = hasComposedChildren
      ? mapChildSteps(childrenArray)
      : steps !== undefined
        ? steps.map(({ title, caption, status: stepStatus }, index) => (
            <ProgressStepperStep
              key={title}
              step={index}
              status={getStepStatus(index, stepStatus)}
              withLine={index !== steps.length - 1}
              isActive={index === activeStep}
              orientation={orientation}
              disabled={disabled || (!allStepsClickable && index > activeStep)}
              onClick={(stepIndex: number) => onStepChange?.(stepIndex)}
              title={title}
              caption={caption}
            />
          ))
        : mapChildSteps(childrenArray);

    return (
      <ol
        ref={ref}
        data-slot="progress-stepper"
        className={cn(progressStepperVariants({ orientation }), className)}
        {...props}
      >
        {renderedSteps}
      </ol>
    );
  },
) as ProgressStepperWithSubComponents;

ProgressStepper.displayName = 'ProgressStepper';

ProgressStepper.Step = ProgressStepperStep;
ProgressStepper.Icon = ProgressStepperIcon;

export { ProgressStepper };
