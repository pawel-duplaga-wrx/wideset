/**
 * Medium is the default for forms. Small fits filter bars and dense tables, large a short form that
 * is the main task on the page. Tags follow the field's size; match it to the controls next to it.
 */
import { MultiSelect } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];

export default function MultiSelectSizes() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <MultiSelect
          key={size}
          size={size}
          options={TEAMS}
          defaultValue={['design', 'engineering']}
          aria-label="Teams"
        />
      ))}
    </div>
  );
}
