/**
 * Primary is the default for every ordinary choice. Danger marks the one option with
 * consequences, such as deleting the data instead of archiving it. The colour is only a hint:
 * the label has to say what happens.
 */
import { RadioButton } from '@wideset/react';

export default function RadioButtonVariants() {
  return (
    <RadioButton.Group defaultValue="delete" aria-label="When the project ends">
      <RadioButton variant="primary" value="archive" label="Archive the project" />
      <RadioButton variant="danger" value="delete" label="Delete the project and its files" />
    </RadioButton.Group>
  );
}
