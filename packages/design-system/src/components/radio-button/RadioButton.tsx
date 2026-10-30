import * as Label from '@radix-ui/react-label';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { RadioButtonContext } from './RadioButton.context';
import type { RadioButtonProps, RadioButtonWithSubComponents } from './RadioButton.types';
import {
  radioIndicatorMotionVariants,
  radioIndicatorVariants,
  radioMotionVariants,
  radioVariants,
} from './RadioButton.variants';
import { RadioButtonDescription } from './RadioButtonDescription';
import { RadioButtonGroup } from './RadioButtonGroup';
import { RadioButtonLabel } from './RadioButtonLabel';

const RadioButton = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioButtonProps
>(
  (
    {
      className,
      size = 'lg',
      variant = 'primary',
      id,
      label,
      description,
      disabled,
      defaultMotion,
      children,
      ...props
    },
    ref,
  ) => {
    const fallbackId = React.useId();
    const motion = useDefaultMotion(defaultMotion);
    const radioId = id || fallbackId;

    const radioElement = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={radioId}
        className={cn(
          radioVariants({ size, variant }),
          radioMotionVariants({ enabled: motion }),
          className,
        )}
        disabled={disabled}
        data-slot="radio-button"
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            radioIndicatorMotionVariants({ enabled: motion }),
          )}
        >
          <div className={radioIndicatorVariants({ size, variant })} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );

    return (
      <RadioButtonContext.Provider value={{ disabled, id: radioId }}>
        <div className={cn('gap-ws-5 flex w-fit')}>
          {radioElement}
          {label ? (
            <Label.Root
              data-slot="radio-button-label"
              htmlFor={radioId}
              className={cn(
                'typography-label-sm text-ws-dynamic-secondary-default gap-ws-3 flex cursor-pointer flex-col',
                disabled && 'text-ws-static-subtle pointer-events-none',
              )}
            >
              {label}
              {description && (
                <div
                  data-slot="radio-button-description"
                  className="text-ws-static-subtle typography-body-sm"
                >
                  {description}
                </div>
              )}
            </Label.Root>
          ) : (
            Boolean(children) && <div className="gap-ws-3 flex flex-col">{children}</div>
          )}
        </div>
      </RadioButtonContext.Provider>
    );
  },
) as RadioButtonWithSubComponents;

RadioButton.displayName = 'RadioButton';
RadioButton.Group = RadioButtonGroup;
RadioButton.Label = RadioButtonLabel;
RadioButton.Description = RadioButtonDescription;

export { RadioButton, RadioButtonDescription, RadioButtonGroup, RadioButtonLabel };
