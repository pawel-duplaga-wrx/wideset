/**
 * Primary is the default for every ordinary choice. Danger is for a choice with consequences
 * the user must not tick by accident, such as deleting data along with an account. The colour
 * is only a hint: the label has to say what happens.
 */
import { Checkbox } from '@wideset/react';

export default function CheckboxVariants() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <Checkbox variant="primary" label="Keep me signed in" defaultChecked />
      <Checkbox variant="danger" label="Also delete all my projects" defaultChecked />
    </div>
  );
}
