/** The placeholder shows until a value is chosen; with `clearable` a clear button appears once one is, and it empties the value without opening the list. A disabled select is skipped by Tab and shows no clear button. */
import { Select } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
];

export default function SelectStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-5 grid grid-cols-[6rem_16rem] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Placeholder</span>
      <Select options={TEAMS} placeholder="Choose a team" aria-label="Team" />
      <span className="typography-caption-md text-ws-static-subtle">Chosen</span>
      <Select options={TEAMS} defaultValue="engineering" aria-label="Team" clearable />
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <Select options={TEAMS} defaultValue="engineering" aria-label="Team" disabled />
    </div>
  );
}
