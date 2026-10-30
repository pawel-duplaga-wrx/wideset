/** `required` adds the asterisk to the label only; it does not validate and does not reach the input, so set `required` or `aria-required` on the control as well. `errorText` replaces the helper text while it is set, so the hint comes back once the value is fixed. The field points the control's `aria-describedby` at the helper or error text and sets `aria-invalid` while the error shows, but the danger variant is yours to set on the input. Advisory warnings use helper text; FormField has no separate warning state. */
import { FormField, TextInput } from '@wideset/react';

export default function FormFieldStates() {
  return (
    <div className="gap-ws-11 flex w-[20rem] max-w-full flex-col">
      <FormField
        label="Billing email"
        htmlFor="email-required"
        required
        helperText="We send receipts here."
      >
        <TextInput id="email-required" placeholder="name@company.com" required />
      </FormField>
      <FormField
        label="Billing email"
        htmlFor="email-error"
        required
        helperText="We send receipts here."
        errorText="Enter an email address like name@company.com."
      >
        <TextInput id="email-error" placeholder="name@company.com" variant="danger" required />
      </FormField>
      <FormField
        label="Workspace slug"
        htmlFor="workspace-warning"
        helperText="Warning: changing this slug breaks existing workspace links."
      >
        <TextInput id="workspace-warning" placeholder="northwind" />
      </FormField>
    </div>
  );
}
