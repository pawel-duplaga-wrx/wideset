/** Vertical is the default and the safer choice: labels of any length line up and descriptions have room. Go horizontal only for two or three short labels with no descriptions. Either way the group is a plain `div`, so give it `role="group"` and an `aria-labelledby` pointing at its heading. */
import { Checkbox, CheckboxGroup } from '@wideset/react';

export default function CheckboxGroupOrientation() {
  return (
    <div className="gap-ws-14 flex flex-wrap items-start justify-center">
      <CheckboxGroup orientation="vertical">
        <Checkbox label="Email" description="A daily digest at 8:00" defaultChecked />
        <Checkbox label="Push" description="Mentions and replies only" defaultChecked />
        <Checkbox label="SMS" description="Security alerts only" />
      </CheckboxGroup>
      <CheckboxGroup orientation="horizontal">
        <Checkbox label="Email" defaultChecked />
        <Checkbox label="Push" defaultChecked />
        <Checkbox label="SMS" />
      </CheckboxGroup>
    </div>
  );
}
