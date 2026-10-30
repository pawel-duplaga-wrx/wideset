/** The playground's stage: one email field with its label and helper text, its props set from the rail. */
import { FormField, type FormFieldProps, TextInput } from '@wideset/react';

export default function FormFieldDefault(props: Partial<FormFieldProps>) {
  return (
    <FormField
      className="w-[20rem] max-w-full"
      label="Billing email"
      htmlFor="billing-email"
      helperText="We send receipts here."
      {...props}
    >
      <TextInput id="billing-email" placeholder="name@company.com" />
    </FormField>
  );
}
