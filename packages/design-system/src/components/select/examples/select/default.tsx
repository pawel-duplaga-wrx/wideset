/** The playground's stage: the closed trigger with a team chosen, its props set from the rail. */
import { Select, type SelectProps } from '@wideset/react';

export default function SelectDefault(props: Partial<SelectProps>) {
  return (
    <Select
      options={[
        { value: 'design', label: 'Design' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'support', label: 'Customer support' },
      ]}
      defaultValue="engineering"
      placeholder="Choose a team"
      aria-label="Team"
      {...props}
    />
  );
}
