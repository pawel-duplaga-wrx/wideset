/**
 * Typing filters the list and highlights the matching part of each option. By default the typed
 * text can become the value even when no option matches; with `disallowCustomValue` it only filters
 * the list. A disabled combo box cannot be opened, typed into or cleared, and is skipped by the
 * keyboard.
 */
import { ComboBox } from '@wideset/react';

const CITIES = [
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'warsaw', label: 'Warsaw' },
  { value: 'amsterdam', label: 'Amsterdam' },
];

export default function ComboBoxStates() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <ComboBox options={CITIES} placeholder="Select a city" />
      <ComboBox options={CITIES} defaultValue="lisbon" />
      <ComboBox options={CITIES} placeholder="Select a city" disabled />
    </div>
  );
}
