/**
 * Primary is the default. Danger marks a choice that failed validation, such as a required field
 * left empty on submit; put the reason in the FormField's `errorText`, which the field links to
 * the control with `aria-describedby`, because the red border alone does not reach screen reader
 * users.
 */
import { Select } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
];

export default function SelectVariants() {
  return (
    <div className="gap-ws-12 flex w-[16rem] max-w-full flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <Select
          key={variant}
          variant={variant}
          options={TEAMS}
          placeholder="Choose a team"
          aria-label="Team"
        />
      ))}
    </div>
  );
}
