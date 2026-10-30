import { TimePicker } from '@wideset/react';

import { playground } from '../lib/playground-kit';

/**
 * Format, variant, style, size, clearable and the arrow come from `TimePickerProps`. The
 * option list opens in a portal, so the stage shows the closed field with a time picked.
 */
export default playground({
  from: 'TimePickerProps',
  // Both only change the open list: `mode` drops its first or last time, `hasSearch` adds a filter.
  hide: ['mode', 'hasSearch'],
  // Size comes from Select's variants, which the types cannot see: the real default is md.
  defaults: { size: 'md' },
  group: { format: 'Content', clearable: 'Behavior' },
  content: [
    {
      key: 'interval',
      label: 'Interval',
      type: 'select',
      options: [
        { label: '15 minutes', value: '15' },
        { label: '30 minutes', value: '30' },
        { label: '1 hour', value: '60' },
      ],
      default: '15',
    },
    { key: 'value', label: 'Time picked', type: 'switch', default: true },
    { key: 'disabled', label: 'Disabled', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <TimePicker
      // Remount on every change: defaultValue is read once.
      key={JSON.stringify(v)}
      className="w-[12rem] max-w-full"
      {...props()}
      intervalInMinutes={Number(v.interval)}
      disabled={Boolean(v.disabled)}
      placeholder="Start time"
      defaultValue={v.value ? '09:00' : undefined}
    />
  ),
  code: (v, { attrs }) => {
    const attributes = [
      ...attrs().split(' ').filter(Boolean),
      v.interval === '15' ? '' : `intervalInMinutes={${v.interval}}`,
      v.disabled ? 'disabled' : '',
      'placeholder="Start time"',
      v.value ? 'defaultValue="09:00"' : '',
    ].filter(Boolean);
    return `<TimePicker ${attributes.join(' ')} />`;
  },
});
