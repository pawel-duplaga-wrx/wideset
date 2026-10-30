/**
 * With nothing chosen the trigger shows its placeholder. Once options are chosen it keeps the
 * label and summarises the selection ("Active, +1"), and a clear button resets it in one click.
 * Disabled keeps the current selection visible but blocks opening the list and clearing it; use
 * it only while filtering is briefly unavailable, such as during a reload.
 */
import { FilterButton } from '@wideset/react';

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

export default function FilterButtonStates() {
  return (
    <div className="gap-ws-10 flex flex-wrap items-center">
      <FilterButton
        options={statuses}
        label="Status"
        placeholder="Status"
        onChange={(selected) => console.log(selected)}
      />
      <FilterButton
        options={statuses}
        label="Status"
        placeholder="Status"
        defaultValue={['active', 'paused']}
        onChange={(selected) => console.log(selected)}
      />
      <FilterButton
        options={statuses}
        label="Status"
        placeholder="Status"
        defaultValue={['active', 'paused']}
        onChange={(selected) => console.log(selected)}
        disabled
      />
    </div>
  );
}
