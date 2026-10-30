import { DatePicker } from '@wideset/react';

import { playground } from '../lib/playground-kit';

/**
 * Variant, style, size and disabled come from `DatePickerProps`. The calendar opens in a
 * portal, so the stage shows the closed field with a date chosen.
 */
const DATE = '2026-11-03';
const WIDTH = 'w-[18rem] max-w-full';

export default playground({
  from: 'DatePickerProps',
  // The size is inherited from another component's variants, so the types cannot see its default.
  defaults: { size: 'md' },
  content: [
    { key: 'value', label: 'With a date', type: 'switch', default: true },
    {
      key: 'format',
      label: 'Date format',
      type: 'select',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'November 3, 2026', value: 'MMMM d, yyyy' },
        { label: '03/11/2026', value: 'dd/MM/yyyy' },
      ],
      default: 'default',
    },
  ],
  render: (v, { props }) => (
    <DatePicker
      key={String(v.value)}
      className={WIDTH}
      defaultSelected={v.value ? DATE : undefined}
      dateFormat={v.format === 'default' ? undefined : String(v.format)}
      {...props()}
    />
  ),
  code: (v, { attrs }) => {
    const props = [
      `className="${WIDTH}"`,
      ...(v.value ? [`defaultSelected="${DATE}"`] : []),
      ...(v.format !== 'default' ? [`dateFormat="${String(v.format)}"`] : []),
      ...attrs().split(' ').filter(Boolean),
    ];
    return props.length > 2
      ? `<DatePicker\n${props.map((prop) => `  ${prop}`).join('\n')}\n/>`
      : `<DatePicker ${props.join(' ')} />`;
  },
});
