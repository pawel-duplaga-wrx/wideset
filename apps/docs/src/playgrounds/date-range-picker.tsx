import { DateRangePicker } from '@wideset/react';

import { playground, type Values } from '../lib/playground-kit';

/**
 * Variant, style, size and the preset panel come from `DateRangePickerProps`. The calendar
 * opens in a portal, so the stage shows the closed field with a range chosen.
 */
const RANGE = { from: '2026-11-03', to: '2026-11-09' };
const WIDTH = 'w-[18rem] max-w-full';

const initial = (v: Values) => {
  if (v.value === 'range') return { defaultSelected: RANGE };
  if (v.value === 'preset') return { defaultDatePreset: 'thisMonth' as const };
  return {};
};

export default playground({
  from: 'DateRangePickerProps',
  // The controlled preset is state the page owns; the Value control below seeds one instead.
  hide: ['activeDatePreset'],
  labels: { showDatePresets: 'Preset panel' },
  group: { showDatePresets: 'Content' },
  // The size is inherited from another component's variants, so the types cannot see its default.
  defaults: { size: 'md' },
  content: [
    {
      key: 'value',
      label: 'Value',
      type: 'select',
      options: [
        { label: 'Empty', value: 'empty' },
        { label: 'Custom range', value: 'range' },
        { label: 'Preset (this month)', value: 'preset' },
      ],
      default: 'range',
    },
    // `disabled` is declared next to react-day-picker's own and is missing from the generated table.
    { key: 'disabled', label: 'Disabled', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <DateRangePicker
      key={String(v.value)}
      className={WIDTH}
      {...initial(v)}
      {...props()}
      disabled={Boolean(v.disabled)}
    />
  ),
  code: (v, { attrs }) => {
    const props = [
      `className="${WIDTH}"`,
      ...(v.value === 'range'
        ? [`defaultSelected={{ from: '${RANGE.from}', to: '${RANGE.to}' }}`]
        : []),
      ...(v.value === 'preset' ? ['defaultDatePreset="thisMonth"'] : []),
      ...attrs().split(' ').filter(Boolean),
      ...(v.disabled ? ['disabled'] : []),
    ];
    return props.length > 2
      ? `<DateRangePicker\n${props.map((prop) => `  ${prop}`).join('\n')}\n/>`
      : `<DateRangePicker ${props.join(' ')} />`;
  },
});
