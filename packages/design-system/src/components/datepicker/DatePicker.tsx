import { forwardRef, useState } from 'react';
import type { OnSelectHandler } from 'react-day-picker';
import { formatDateToISOString, formatISODateToAnotherFormat, parseISODate } from 'src/logic/date';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { Calendar } from '../calendar/Calendar';
import { Popup } from '../popup/Popup';
import type { DatePickerProps } from './DatePicker.types';
import { DatePickerTrigger } from './DatePickerTrigger';

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      onSelect,
      selected,
      defaultSelected,
      dateFormat,
      placeholder = 'Pick a date',
      size,
      preset,
      variant,
      disabled,
      disabledDates,
      defaultMotion,
      ...calendarProps
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState<string | undefined>(defaultSelected);

    const isControlled = selected !== undefined;
    const currentSelected = isControlled ? selected : internalSelected;

    const handleSelect: OnSelectHandler<Date | undefined> = (day) => {
      const iso = formatDateToISOString(day);
      if (!isControlled) setInternalSelected(iso);
      setIsOpen(false);
      onSelect?.(iso);
    };

    return (
      <Popup onOpenChange={setIsOpen} open={isOpen}>
        <Popup.Trigger asChild>
          <DatePickerTrigger
            data-slot="date-picker"
            ref={ref}
            id={id}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            className={className}
            placeholder={placeholder}
            value={formatISODateToAnotherFormat(currentSelected, dateFormat) ?? ''}
            size={size}
            preset={preset}
            variant={variant}
            disabled={disabled}
            defaultMotion={motion}
          />
        </Popup.Trigger>
        <Popup.Container align="start" className="w-auto" defaultMotion={motion}>
          <Calendar
            {...calendarProps}
            selected={parseISODate(currentSelected)}
            onSelect={handleSelect}
            mode="single"
            disabled={disabledDates}
            defaultMotion={motion}
          />
        </Popup.Container>
      </Popup>
    );
  },
);
DatePicker.displayName = 'DatePicker';

export { DatePicker };
