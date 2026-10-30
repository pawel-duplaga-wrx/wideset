/**
 * The playground's stage: one radio with its label and description, in the group that owns
 * the selection, its look set from the rail.
 */
import { RadioButton, type RadioButtonProps } from '@wideset/react';

export default function RadioButtonDefault(
  props: Pick<RadioButtonProps, 'variant' | 'size' | 'disabled'>,
) {
  return (
    <RadioButton.Group defaultValue="annual">
      <RadioButton value="annual" {...props}>
        <RadioButton.Label>Annual billing</RadioButton.Label>
        <RadioButton.Description>Two months free every year</RadioButton.Description>
      </RadioButton>
    </RadioButton.Group>
  );
}
