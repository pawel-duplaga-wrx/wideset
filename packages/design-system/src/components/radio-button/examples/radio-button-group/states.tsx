/** Disabling the group disables every option and takes the whole set out of the tab order. To rule out a single option, disable that radio instead and say why in its description. */
import { RadioButton, RadioButtonGroup } from '@wideset/react';

export default function RadioButtonGroupStates() {
  return (
    <div className="gap-ws-14 flex flex-wrap items-start justify-center">
      <RadioButtonGroup defaultValue="standard">
        <RadioButton value="standard" label="Standard" description="3–5 business days" />
        <RadioButton
          value="express"
          label="Express"
          description="Not available for this address"
          disabled
        />
      </RadioButtonGroup>
      <RadioButtonGroup defaultValue="standard" disabled>
        <RadioButton value="standard" label="Standard" description="3–5 business days" />
        <RadioButton value="express" label="Express" description="Next business day" />
      </RadioButtonGroup>
    </div>
  );
}
