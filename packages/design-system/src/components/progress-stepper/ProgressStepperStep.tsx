import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import type { ProgressStepperStepProps } from './ProgressStepper.types';
import { progressStepperStepVariants } from './ProgressStepper.variants';
import { ProgressStepperIcon } from './ProgressStepperIcon';

type ProgressStepperStepInternalProps = ProgressStepperStepProps & {
  withLine?: boolean;
  isActive?: boolean;
};

const ProgressStepperStep = forwardRef<HTMLLIElement, ProgressStepperStepInternalProps>(
  (
    {
      title,
      caption,
      withLine,
      isActive,
      orientation,
      className,
      step,
      status,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isStepInteractive = orientation === 'vertical';

    const icon = (
      <ProgressStepperIcon
        step={step}
        status={status}
        disabled={disabled}
        orientation={orientation}
        interactive={false}
      />
    );

    const content = (
      <>
        <div className="flex-none shrink-0">{icon}</div>
        <div className="flex flex-col items-start text-left">
          <span
            className={cn(
              'typography-label-strong-sm',
              disabled ? 'text-ws-static-subtle' : 'text-ws-static-base',
            )}
          >
            {title}
          </span>

          {caption && (
            <span
              className={cn(
                'typography-body-sm',
                disabled ? 'text-ws-static-inverse-subtle' : 'text-ws-static-subtle',
              )}
            >
              {caption}
            </span>
          )}
        </div>
      </>
    );

    const stepClasses = cn(
      progressStepperStepVariants({
        status,
        disabled,
        withLine,
        orientation,
      }),
      isStepInteractive
        ? 'group flex cursor-pointer items-center disabled:cursor-default'
        : 'flex items-center',
      // No surface for error: Figma gives the error step no background in any
      // state — default, hover, pressed or active — only a red focus ring.
      className,
    );
    // Shrinks with its step: a squeezed stepper wraps a step's text instead of pushing it out
    // of the step and under the next one's line.
    const stepContentClass = 'flex min-w-0 items-center gap-ws-7';

    return isStepInteractive ? (
      <li
        ref={ref}
        aria-current={isActive ? 'step' : undefined}
        data-slot="progress-stepper-step"
        {...props}
      >
        <button
          className={stepClasses}
          onClick={() => onClick?.(step)}
          type="button"
          disabled={disabled ?? undefined}
        >
          <div className={cn(stepContentClass, 'px-ws-7 py-ws-5')}>{content}</div>
        </button>
      </li>
    ) : (
      <li
        ref={ref}
        aria-current={isActive ? 'step' : undefined}
        className={stepClasses}
        data-slot="progress-stepper-step"
        {...props}
      >
        {onClick ? (
          <button
            className={cn(
              stepContentClass,
              'group cursor-pointer focus-visible:outline-none disabled:cursor-default',
            )}
            onClick={() => onClick(step)}
            type="button"
            disabled={!!disabled}
          >
            {content}
          </button>
        ) : (
          <div className={stepContentClass}>{content}</div>
        )}

        {withLine && (
          <div className="h-px min-w-[1rem] flex-1 grow bg-(--ws-static-stroke-base)" role="none" />
        )}
      </li>
    );
  },
);

ProgressStepperStep.displayName = 'ProgressStepper.Step';

export { ProgressStepperStep };
