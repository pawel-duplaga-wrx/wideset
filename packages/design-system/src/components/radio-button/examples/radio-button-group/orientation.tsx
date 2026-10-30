/**
 * Vertical is the default and the safer choice: labels of any length line up and descriptions
 * have room. Go horizontal only for two or three short options with no descriptions. Either
 * way the arrow keys move the selection and the group is a single tab stop.
 */
import { RadioButton, RadioButtonGroup } from '@wideset/react';

export default function RadioButtonGroupOrientation() {
  return (
    <div className="gap-ws-14 flex flex-wrap items-start justify-center">
      <RadioButtonGroup orientation="vertical" defaultValue="standard" aria-label="Shipping">
        <RadioButton value="standard" label="Standard" description="3–5 business days" />
        <RadioButton value="express" label="Express" description="Next business day" />
        <RadioButton value="pickup" label="Pickup" description="Ready in 2 hours" />
      </RadioButtonGroup>
      <RadioButtonGroup orientation="horizontal" defaultValue="monthly" aria-label="Billing">
        <RadioButton value="monthly" label="Monthly" />
        <RadioButton value="annual" label="Annual" />
      </RadioButtonGroup>
    </div>
  );
}
