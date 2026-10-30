/** The playground's stage: the closed trigger with two teams chosen, its props set from the rail. */
import { MultiSelect, type MultiSelectProps } from '@wideset/react';

export default function MultiSelectDefault(props: Partial<MultiSelectProps>) {
  return (
    <div className="w-[20rem] max-w-full">
      <MultiSelect
        options={[
          { value: 'design', label: 'Design' },
          { value: 'engineering', label: 'Engineering' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'sales', label: 'Sales' },
        ]}
        defaultValue={['design', 'engineering']}
        placeholder="Select teams"
        {...props}
      />
    </div>
  );
}
