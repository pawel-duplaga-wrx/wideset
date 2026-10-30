/**
 * Medium is the default for forms. Small fits filter bars and dense tables, large a short form that
 * is the main task on the page. Match the size of the fields and buttons next to the select.
 */
import { Select } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
];

export default function SelectSizes() {
  return (
    <div className="gap-ws-12 flex w-[16rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select
          key={size}
          size={size}
          options={TEAMS}
          placeholder="Choose a team"
          aria-label="Team"
        />
      ))}
    </div>
  );
}
