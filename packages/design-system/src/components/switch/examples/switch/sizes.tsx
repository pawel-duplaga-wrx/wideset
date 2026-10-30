/**
 * Large is the default and suits settings pages and forms. Small is for dense places such as
 * table rows, toolbars and side panels. Keep one size within a list of switches.
 */
import { Switch } from '@wideset/react';

export default function SwitchSizes() {
  return (
    <div className="gap-ws-12 flex flex-col items-start">
      {(['lg', 'sm'] as const).map((size) => (
        <Switch key={size} size={size} label="Email notifications" defaultChecked />
      ))}
    </div>
  );
}
