/**
 * Large is the default and suits forms and settings. Small is for dense places such as table
 * rows and filter panels. Keep one size within a group.
 */
import { Checkbox } from '@wideset/react';

export default function CheckboxSizes() {
  return (
    <div className="gap-ws-12 flex flex-col">
      {(['lg', 'sm'] as const).map((size) => (
        <Checkbox key={size} size={size} label="Email me about product updates" defaultChecked />
      ))}
    </div>
  );
}
