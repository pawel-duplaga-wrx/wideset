/** Hover, press and focus are live. A switch takes effect the moment it flips, with no save button; Space or Enter toggles it from the keyboard. A disabled switch leaves the tab order, so say near it why it is locked. */
import { Switch } from '@wideset/react';

export default function SwitchStates() {
  return (
    <div className="gap-x-ws-11 gap-y-ws-7 grid grid-cols-[4rem_repeat(2,auto)] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Default</span>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <Switch label="Off" disabled />
      <Switch label="On" defaultChecked disabled />
    </div>
  );
}
