/** The playground's stage: three shipping options with descriptions, its props set from the rail. */
import { RadioButton, RadioButtonGroup, type RadioButtonGroupProps } from '@wideset/react';

export default function RadioButtonGroupDefault(props: RadioButtonGroupProps) {
  return (
    <RadioButtonGroup defaultValue="standard" {...props}>
      <RadioButton value="standard" label="Standard" description="3–5 business days" />
      <RadioButton value="express" label="Express" description="Next business day" />
      <RadioButton value="pickup" label="Pickup" description="Ready in 2 hours" />
    </RadioButtonGroup>
  );
}
