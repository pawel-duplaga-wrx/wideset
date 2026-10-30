/**
 * Border is the default, for a select in a form or on the page. Ghost drops the frame and shows a
 * soft background on hover, for a select inside a surface that already has one, such as a toolbar,
 * a card header or a table cell.
 */
import { Select } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
];

export default function SelectPresets() {
  return (
    <div className="gap-ws-12 flex w-[16rem] max-w-full flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <Select
          key={preset}
          preset={preset}
          options={TEAMS}
          defaultValue="engineering"
          aria-label="Team"
        />
      ))}
    </div>
  );
}
