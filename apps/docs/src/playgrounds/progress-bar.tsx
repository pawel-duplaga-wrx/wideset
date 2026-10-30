import { ProgressBar } from '@wideset/react';

import { playground, type Values } from '../lib/playground-kit';

const DESCRIPTIONS: Record<string, string> = {
  default: '12 of 18 files uploaded',
  success: 'All files uploaded',
  error: '3 files could not be uploaded',
};

/** The label and description only exist on the bar; the circle shows the percentage alone. */
const texts = (v: Values) =>
  v.type === 'bar' && v.label
    ? { label: 'Uploading assets', description: DESCRIPTIONS[String(v.variant)] }
    : {};

/** Type and variant come from `ProgressBarProps`; this file adds the value and the texts. */
export default playground({
  from: 'ProgressBarProps',
  // Only pads the circle's percentage to a fixed width, for a column of circles.
  hide: ['fixedWidth'],
  content: [
    {
      key: 'value',
      label: 'Value',
      type: 'select',
      options: ['10', '35', '65', '100'].map((value) => ({ label: `${value}%`, value })),
      default: '65',
    },
    { key: 'label', label: 'Label and description', type: 'switch', default: true },
  ],
  render: (v, { props }) => (
    <div className={v.type === 'bar' ? 'w-[20rem] max-w-full' : undefined}>
      <ProgressBar {...props()} value={Number(v.value)} {...texts(v)} />
    </div>
  ),
  code: (v, { attrs }) => {
    const { label, description } = texts(v);
    const props = [
      ...attrs().trim().split(' '),
      `value={${v.value}}`,
      label ? `label="${label}"` : '',
      description ? `description="${description}"` : '',
    ].filter(Boolean);
    return props.join(' ').length > 70
      ? `<ProgressBar\n${props.map((p) => `  ${p}`).join('\n')}\n/>`
      : `<ProgressBar ${props.join(' ')} />`;
  },
});
