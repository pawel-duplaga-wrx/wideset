/** By default every choice is a tag and the field grows to fit them. `maxVisibleTags` keeps the field one line high: past that count the tags collapse into a summary such as “3 teams”, and `0` always shows the summary. Pick the summary where the field sits in a fixed-height row. Each tag carries its own remove control, so a choice can go without opening the list. */
import { MultiSelect } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];
const CHOSEN = ['design', 'engineering', 'marketing'];

export default function MultiSelectSelection() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <MultiSelect options={TEAMS} defaultValue={CHOSEN} aria-label="Teams" />
      <MultiSelect
        options={TEAMS}
        defaultValue={CHOSEN}
        maxVisibleTags={2}
        multiValuesLabel="teams"
        aria-label="Teams"
      />
    </div>
  );
}
