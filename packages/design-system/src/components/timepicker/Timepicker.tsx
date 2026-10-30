import { useMemo } from 'react';

import { Select } from '../select/Select';
import { generateTimePickerSteps, stepsToOptions } from './Timepicker.logic';
import type { TimePickerProps } from './Timepicker.types';

export const TimePicker = ({
  min,
  max,
  intervalInMinutes,
  format = '24h',
  mode,
  ...selectProps
}: TimePickerProps) => {
  const options = useMemo(
    () =>
      stepsToOptions(
        generateTimePickerSteps({ min, max, interval: intervalInMinutes, mode }),
        format,
      ),
    [min, max, intervalInMinutes, format, mode],
  );

  return (
    <Select
      data-slot="time-picker"
      options={options}
      placeholder={selectProps.placeholder ?? 'Time'}
      {...selectProps}
    />
  );
};
