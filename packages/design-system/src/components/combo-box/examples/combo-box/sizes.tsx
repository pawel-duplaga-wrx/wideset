/**
 * Medium is the default for forms. Small fits filter bars and dense tables, large a short form that
 * is the main task on the page. Match the size of the fields and buttons next to it.
 */
import { ComboBox } from '@wideset/react';

const CITIES = [
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'warsaw', label: 'Warsaw' },
  { value: 'amsterdam', label: 'Amsterdam' },
];

export default function ComboBoxSizes() {
  return (
    <div className="gap-ws-12 flex flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ComboBox key={size} size={size} options={CITIES} placeholder="Select a city" />
      ))}
    </div>
  );
}
