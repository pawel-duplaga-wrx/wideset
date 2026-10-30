/** The playground's stage: one checked checkbox with a label and a description, its props set from the rail. */
import { Checkbox, type CheckboxProps } from '@wideset/react';

export default function CheckboxDefault(
  props: Omit<CheckboxProps, 'label' | 'description' | 'children'>,
) {
  return (
    <Checkbox
      {...props}
      label="Email me about product updates"
      description="About once a month. Unsubscribe any time."
      defaultChecked
    />
  );
}
