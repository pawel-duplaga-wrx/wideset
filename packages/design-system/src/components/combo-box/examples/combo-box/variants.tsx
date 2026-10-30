/**
 * Primary is the default. Danger marks a value that failed validation, such as free text that
 * matches no city when one is required; put the reason in the FormField's `errorText`,
 * which FormField links to the control, because the red border alone does not reach screen reader
 * users.
 */
import { ComboBox } from '@wideset/react';

const CITIES = [
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'warsaw', label: 'Warsaw' },
  { value: 'amsterdam', label: 'Amsterdam' },
];

export default function ComboBoxVariants() {
  return (
    <div className="gap-ws-12 flex flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <ComboBox key={variant} variant={variant} options={CITIES} placeholder="Select a city" />
      ))}
    </div>
  );
}
