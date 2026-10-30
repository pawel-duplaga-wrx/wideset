/** The playground's stage: one status filter with a status chosen, its props set from the rail. */
import { FilterButton, type FilterButtonProps } from '@wideset/react';

export default function FilterButtonDefault(props: Partial<FilterButtonProps>) {
  return (
    <FilterButton
      options={[
        { value: 'active', label: 'Active' },
        { value: 'paused', label: 'Paused' },
        { value: 'archived', label: 'Archived' },
      ]}
      label="Status"
      placeholder="Status"
      defaultValue={['active']}
      onChange={(statuses) => console.log(statuses)}
      {...props}
    />
  );
}
