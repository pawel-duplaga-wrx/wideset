/**
 * Small fits compact toolbars and table headers, medium is the usual choice in a filter bar, and
 * large gives the trigger more weight and a bigger hit area. Use one size for every filter in a
 * row, matching the inputs and buttons next to it.
 */
import { FilterButton } from '@wideset/react';

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

export default function FilterButtonSizes() {
  return (
    <div className="gap-ws-10 flex flex-wrap items-center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <FilterButton
          key={size}
          size={size}
          options={statuses}
          label="Status"
          placeholder="Status"
          onChange={(selected) => console.log(selected)}
        />
      ))}
    </div>
  );
}
