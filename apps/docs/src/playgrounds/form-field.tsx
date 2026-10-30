import { FormField, TextInput } from '@wideset/react';

import { playground } from '../lib/playground-kit';

const ERROR = 'Enter an email address like name@company.com.';
const HELPER = 'We send receipts here.';

export default playground({
  from: 'FormFieldProps',
  labels: { variant: 'Layout' },
  content: [
    { key: 'helper', label: 'Helper text', type: 'switch', default: true },
    { key: 'error', label: 'Error', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <FormField
      className={v.variant === 'horizontal' ? 'w-[26rem] max-w-full' : 'w-[20rem] max-w-full'}
      {...props()}
      label="Billing email"
      htmlFor="billing-email"
      helperText={v.helper ? HELPER : undefined}
      errorText={v.error ? ERROR : undefined}
    >
      <TextInput
        id="billing-email"
        placeholder="name@company.com"
        variant={v.error ? 'danger' : undefined}
      />
    </FormField>
  ),
  code: (v, { attrs }) => {
    const props = [
      ...attrs().split(' ').filter(Boolean),
      'label="Billing email"',
      'htmlFor="billing-email"',
      v.helper && `helperText="${HELPER}"`,
      v.error && `errorText="${ERROR}"`,
    ].filter(Boolean);
    const input = `<TextInput id="billing-email" placeholder="name@company.com"${
      v.error ? ' variant="danger"' : ''
    } />`;
    return `<FormField\n${props.map((p) => `  ${p}`).join('\n')}\n>\n  ${input}\n</FormField>`;
  },
});
