import { RadioButton, RadioButtonGroup } from '@wideset/react';

import { playground } from '../lib/playground-kit';

const OPTIONS = [
  { value: 'standard', label: 'Standard', description: '3–5 business days' },
  { value: 'express', label: 'Express', description: 'Next business day' },
  { value: 'pickup', label: 'Pickup', description: 'Ready in 2 hours' },
];

/**
 * Orientation and disabled come from `RadioButtonGroupProps`; this file adds the shipping
 * options and their descriptions.
 */
export default playground({
  from: 'RadioButtonGroupProps',
  // `required` only matters to form validation; nothing changes on the stage.
  hide: ['required'],
  content: [{ key: 'description', label: 'Descriptions', type: 'switch', default: true }],
  render: (v, { props }) => (
    <RadioButtonGroup defaultValue="standard" {...props()}>
      {OPTIONS.map(({ value, label, description }) => (
        <RadioButton
          key={value}
          value={value}
          label={label}
          description={v.description ? description : undefined}
        />
      ))}
    </RadioButtonGroup>
  ),
  code: (v, { attrs }) => {
    const radios = OPTIONS.map(({ value, label, description }) => {
      const text = v.description ? ` description="${description}"` : '';
      return `  <RadioButton value="${value}" label="${label}"${text} />`;
    });
    return `<RadioButtonGroup defaultValue="standard"${attrs()}>\n${radios.join('\n')}\n</RadioButtonGroup>`;
  },
});
