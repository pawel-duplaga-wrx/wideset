import { addMinutes, format, isBefore, isEqual, parse } from 'date-fns';

import type { TimePickerProps } from './Timepicker.types';

export const generateTimePickerSteps = ({
  min = '00:00',
  max = '23:59',
  interval = 15,
  mode,
}: {
  min?: string;
  max?: string;
  interval?: number;
  mode?: 'from' | 'to' | undefined;
} = {}) => {
  if (interval <= 0) {
    return [];
  }

  const minTime = parse(min, 'HH:mm', new Date());
  const maxTime = parse(max, 'HH:mm', new Date());

  if (isNaN(minTime.getTime()) || isNaN(maxTime.getTime())) {
    console.warn(
      `TimePicker: invalid min/max format. Expected "HH:mm", got min="${min}" max="${max}"`,
    );
    return [];
  }

  const steps = [];

  let currentTime = minTime;
  while (isBefore(currentTime, maxTime) || isEqual(currentTime, maxTime)) {
    steps.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, interval);
  }

  return mode === 'from' ? steps.slice(0, -1) : mode === 'to' ? steps.slice(1) : steps;
};

export const stepsToOptions = (steps: string[], timeFormat: TimePickerProps['format'] = '24h') =>
  steps.map((step) => ({
    label: timeFormat === '24h' ? step : format(parse(step, 'HH:mm', new Date()), 'hh:mm a'),
    value: step,
  }));
