/** The playground's stage: the closed field with a city chosen; the list opens in a portal. */
import { ComboBox, type ComboBoxProps } from '@wideset/react';

export default function ComboBoxDefault(props: ComboBoxProps) {
  return (
    <ComboBox
      options={[
        { value: 'lisbon', label: 'Lisbon' },
        { value: 'berlin', label: 'Berlin' },
        { value: 'warsaw', label: 'Warsaw' },
        { value: 'amsterdam', label: 'Amsterdam' },
      ]}
      placeholder="Select a city"
      defaultValue="lisbon"
      {...props}
    />
  );
}
