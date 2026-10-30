/** The label sits on the right by default, which reads best in a form. Put it on the left in a settings list, where the labels line up on one edge and the switches on the other. The whole label is part of the click target either way. */
import { Switch } from '@wideset/react';

export default function SwitchLabelPosition() {
  return (
    <div className="gap-ws-11 flex flex-wrap items-center justify-center">
      <Switch labelPosition="right" label="Email notifications" defaultChecked />
      <Switch labelPosition="left" label="Email notifications" defaultChecked />
    </div>
  );
}
