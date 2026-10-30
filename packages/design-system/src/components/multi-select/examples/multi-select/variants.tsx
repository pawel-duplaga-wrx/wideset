/**
 * Primary is the default. Danger marks a selection that failed validation, such as none chosen
 * where at least one is required; put the reason in the FormField's `errorText`,
 * which FormField links to the control, because the red border alone does not reach screen reader
 * users.
 */
import { MultiSelect } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
];

export default function MultiSelectVariants() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <MultiSelect
          key={variant}
          variant={variant}
          options={TEAMS}
          placeholder="Select teams"
          aria-label="Teams"
        />
      ))}
    </div>
  );
}
