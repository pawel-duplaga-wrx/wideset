/**
 * Primary is the default. Danger marks text that failed validation, such as a required comment left
 * empty or one over the length limit; put the reason in the FormField's `errorText`, which the field
 * links to the textarea with `aria-describedby`, because the red border alone does not reach screen
 * reader users.
 */
import { Textarea } from '@wideset/react';

export default function TextareaVariants() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      <Textarea
        variant="primary"
        rows={3}
        placeholder="Describe the issue"
        aria-label="Description"
      />
      <Textarea
        variant="danger"
        rows={3}
        placeholder="Describe the issue"
        aria-label="Description"
        aria-invalid
      />
    </div>
  );
}
