/**
 * Large is the default and suits forms and settings. Small is for dense places such as filter
 * panels and table toolbars. Keep one size within a group.
 */
import { RadioButton } from '@wideset/react';

export default function RadioButtonSizes() {
  return (
    <div className="gap-ws-16 flex flex-col">
      {(['lg', 'sm'] as const).map((size) => (
        <RadioButton.Group key={size} defaultValue="annual" aria-label="Billing period">
          <RadioButton size={size} value="annual" label="Annual billing" />
          <RadioButton size={size} value="monthly" label="Monthly billing" />
        </RadioButton.Group>
      ))}
    </div>
  );
}
