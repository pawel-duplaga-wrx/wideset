import { RiCheckLine, RiErrorWarningFill } from '@remixicon/react';
import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import type { ProgressStepperIconProps } from './ProgressStepper.types';
import {
  progressStepperIconContentVariants,
  progressStepperIconVariants,
} from './ProgressStepper.variants';

const defaultStepAriaLabel = (step: number) => `Step ${step + 1}`;

const ProgressStepperIcon = forwardRef<
  HTMLButtonElement | HTMLDivElement,
  ProgressStepperIconProps
>(
  (
    {
      step,
      orientation,
      status,
      disabled,
      interactive,
      onClick,
      stepAriaLabel = defaultStepAriaLabel,
      className,
      ...props
    },
    ref,
  ) => {
    const getContent = () => {
      if (status === 'completed')
        return (
          <RiCheckLine
            aria-hidden="true"
            focusable="false"
            className={progressStepperIconContentVariants({ orientation, status })}
          />
        );
      if (status === 'error') {
        // Vertical error inverts the dot: white background, red icon. The icon has
        // to reach the edge or a white ring shows around it. Remix draws its circle
        // at r=10 inside a 24 viewBox, so scale by 12/10 to bleed it to the edge.
        if (orientation === 'vertical')
          return (
            <RiErrorWarningFill
              aria-hidden="true"
              focusable="false"
              className="size-full scale-[1.2]"
            />
          );
        return (
          <RiErrorWarningFill
            aria-hidden="true"
            focusable="false"
            className={progressStepperIconContentVariants({ orientation, status })}
          />
        );
      }
      if (orientation === 'horizontal') return step + 1;
      if (status === 'active')
        return <div className="bg-ws-dynamic-primary-default size-ws-5 rounded-full" />;
      return null;
    };

    if (interactive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          aria-label={stepAriaLabel(step)}
          aria-current={status === 'active' ? 'step' : undefined}
          className={cn(progressStepperIconVariants({ status, disabled, orientation }), className)}
          onClick={() => onClick?.(step)}
          type="button"
          disabled={!!disabled}
          data-slot="progress-stepper-icon"
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {getContent()}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(progressStepperIconVariants({ status, disabled, orientation }), className)}
        data-slot="progress-stepper-icon"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {getContent()}
      </div>
    );
  },
);

ProgressStepperIcon.displayName = 'ProgressStepper.Icon';

export { ProgressStepperIcon };
