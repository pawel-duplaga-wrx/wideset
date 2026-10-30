import { FilterButton } from '@wideset/react';

import { playground } from '../lib/playground-kit';

const STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

const SELECTED: Record<string, string[]> = {
  none: [],
  one: ['active'],
  two: ['active', 'paused'],
};

const ignore = () => {};

export default playground({
  from: 'FilterButtonProps',
  // `selected` is a styling variant the component sets itself from the selection; passing
  // it does nothing. The Selected control below is the real thing.
  hide: ['selected'],
  content: [
    {
      key: 'selection',
      label: 'Selected',
      type: 'select',
      options: [
        { label: 'Nothing', value: 'none' },
        { label: 'One status', value: 'one' },
        { label: 'Two statuses', value: 'two' },
      ],
      default: 'one',
    },
  ],
  render: (v, { props }) => (
    <FilterButton
      // Uncontrolled: remount so a new default selection takes effect.
      key={String(v.selection)}
      options={STATUSES}
      label="Status"
      placeholder="Status"
      defaultValue={SELECTED[String(v.selection)]}
      onChange={ignore}
      {...props()}
    />
  ),
  code: (v, { attrs }) => {
    const selected = SELECTED[String(v.selection)];
    const lines = [
      '  options={[',
      ...STATUSES.map((s) => `    { value: '${s.value}', label: '${s.label}' },`),
      '  ]}',
      '  label="Status"',
      '  placeholder="Status"',
      ...(selected.length
        ? [`  defaultValue={[${selected.map((s) => `'${s}'`).join(', ')}]}`]
        : []),
      '  onChange={(statuses) => console.log(statuses)}',
      ...attrs()
        .split(' ')
        .filter(Boolean)
        .map((a) => `  ${a}`),
    ];
    return `<FilterButton\n${lines.join('\n')}\n/>`;
  },
});
