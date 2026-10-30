/** `vertical` stacks the label over the control and suits most forms, narrow columns and mobile. `horizontal` puts the label in a column of up to 10rem beside the control, with the helper text under the label; use it for settings pages where labels line up and values are short. Keep one layout per form. */
import { FormField, TextInput } from '@wideset/react';

export default function FormFieldVariants() {
  return (
    <div className="gap-ws-11 flex w-[28rem] max-w-full flex-col">
      <FormField
        variant="vertical"
        label="Workspace name"
        htmlFor="workspace-vertical"
        helperText="Shown on invoices and in emails."
      >
        <TextInput id="workspace-vertical" placeholder="Northwind" />
      </FormField>
      <FormField
        variant="horizontal"
        label="Workspace name"
        htmlFor="workspace-horizontal"
        helperText="Shown on invoices and in emails."
      >
        <TextInput id="workspace-horizontal" placeholder="Northwind" />
      </FormField>
    </div>
  );
}
