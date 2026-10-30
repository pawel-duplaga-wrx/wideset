import { Calendar } from '@wideset/react';

import { playground } from '../lib/playground-kit';

const FOOTER = 'Times are shown in your local time zone.';

/**
 * `CalendarProps` is react-day-picker's `DayPickerProps`, which the generator does not turn
 * into controls, so every control is written here. The calendar is taller than a gallery
 * card, so the thumbnail shows its middle weeks. It starts with nothing selected, so the
 * snippet needs no state hook.
 */
export default playground({
  // Opens on the visitor's month, which the build cannot know.
  clientOnly: true,
  from: [],
  content: [
    {
      key: 'weekStart',
      label: 'Week starts on',
      type: 'select',
      options: [
        { label: 'Sunday', value: 'sunday' },
        { label: 'Monday', value: 'monday' },
      ],
      default: 'sunday',
      group: 'Appearance',
    },
    {
      key: 'outsideDays',
      label: 'Outside days',
      type: 'switch',
      default: false,
      group: 'Appearance',
    },
    {
      key: 'mode',
      label: 'Selection',
      type: 'select',
      options: [
        { label: 'Single date', value: 'single' },
        { label: 'Range', value: 'range' },
      ],
      default: 'single',
    },
    { key: 'footer', label: 'Footer', type: 'switch', default: false },
    {
      key: 'disablePast',
      label: 'Disable past dates',
      type: 'switch',
      default: false,
      group: 'State',
    },
  ],
  render: (v) => {
    const props = {
      weekStartsOn: v.weekStart === 'monday' ? (1 as const) : undefined,
      showOutsideDays: Boolean(v.outsideDays),
      footer: v.footer ? FOOTER : undefined,
      disabled: v.disablePast ? { before: new Date() } : undefined,
    };
    return v.mode === 'range' ? (
      <Calendar key="range" mode="range" {...props} />
    ) : (
      <Calendar key="single" mode="single" {...props} />
    );
  },
  code: (v) => {
    const props = [
      `mode="${String(v.mode)}"`,
      v.weekStart === 'monday' && 'weekStartsOn={1}',
      v.outsideDays && 'showOutsideDays',
      v.footer && `footer="${FOOTER}"`,
      v.disablePast && 'disabled={{ before: new Date() }}',
    ].filter(Boolean);
    return props.length > 2
      ? `<Calendar\n${props.map((prop) => `  ${prop}`).join('\n')}\n/>`
      : `<Calendar ${props.join(' ')} />`;
  },
});
