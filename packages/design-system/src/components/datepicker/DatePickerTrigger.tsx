import { RiCalendarLine } from '@remixicon/react';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { TextInput } from '../text-input/TextInput';
import type { DatePickerTriggerProps } from './DatePicker.types';
import { datePickerTriggerMotionVariants, datePickerTriggerVariants } from './DatePicker.variants';

const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  (
    {
      className,
      placeholder,
      value,
      size,
      preset,
      variant,
      disabled,
      defaultMotion,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const isGhost = preset === 'ghost';
    const valueId = React.useId();
    // Named from outside (`aria-label`, `aria-labelledby` or a `<label htmlFor>` on `id`), the
    // button no longer announces its content, so the selected value becomes its description.
    // Unnamed, the value already is the name; describing it again would read it twice.
    const isNamedExternally = Boolean(props['aria-label'] || props['aria-labelledby'] || props.id);
    const describedBy =
      [ariaDescribedBy, isNamedExternally && value ? valueId : undefined]
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <button
        className={cn(
          'group wds-focus-visible rounded-ws-control-lg w-full cursor-pointer outline-hidden disabled:cursor-default',
          datePickerTriggerMotionVariants({ enabled: motion }),
          className,
        )}
        ref={ref}
        disabled={disabled}
        type="button"
        data-slot="date-picker-trigger"
        {...props}
        aria-describedby={describedBy}
      >
        <TextInput
          size={size}
          preset={preset}
          variant={variant}
          disabled={disabled}
          defaultMotion={motion}
          className={datePickerTriggerVariants({ preset, variant })}
        >
          {isGhost && (
            <TextInput.Prefix inner>
              <TextInput.Icon
                icon={RiCalendarLine}
                className={cn('text-ws-dynamic-secondary-default', size === 'lg' && 'size-ws-11')}
              />
            </TextInput.Prefix>
          )}
          <TextInput.Input
            placeholder={placeholder}
            value={value}
            readOnly
            tabIndex={-1}
            aria-hidden
            className="cursor-pointer"
          />
          <span id={valueId} className="sr-only">
            {value || placeholder}
          </span>
          {!isGhost && (
            <TextInput.Suffix inner>
              <TextInput.Icon
                icon={RiCalendarLine}
                className={cn('text-ws-dynamic-secondary-default', size === 'lg' && 'size-ws-11')}
              />
            </TextInput.Suffix>
          )}
        </TextInput>
      </button>
    );
  },
);
DatePickerTrigger.displayName = 'DatePickerTrigger';

export { DatePickerTrigger };
