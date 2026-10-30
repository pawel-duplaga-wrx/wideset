/**
 * Border is the default, for a combo box in a form or on the page. Ghost drops the frame and shows
 * a soft background on hover, for a combo box inside a surface that already has one, such as a
 * toolbar or an inline editor.
 */
import { ComboBox } from '@wideset/react';

const CITIES = [
  { value: 'lisbon', label: 'Lisbon' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'warsaw', label: 'Warsaw' },
  { value: 'amsterdam', label: 'Amsterdam' },
];

export default function ComboBoxPresets() {
  return (
    <div className="gap-ws-12 flex flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <ComboBox key={preset} preset={preset} options={CITIES} defaultValue="lisbon" />
      ))}
    </div>
  );
}
