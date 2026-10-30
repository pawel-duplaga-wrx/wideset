/**
 * Border is the default, for a multi-select in a form or on the page. Ghost drops the frame and
 * shows a soft background on hover, for a filter inside a surface that already has one, such as a
 * toolbar or a table header.
 */
import { MultiSelect } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];

export default function MultiSelectPresets() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <MultiSelect
          key={preset}
          preset={preset}
          options={TEAMS}
          defaultValue={['design', 'engineering']}
          aria-label="Teams"
        />
      ))}
    </div>
  );
}
