/**
 * Indeterminate is for a parent checkbox whose children are only partly selected, such as
 * "Select all" over a table; clicking it checks everything. Screen readers announce it as
 * "mixed". A disabled checkbox leaves the tab order and keeps its value, so use it only when
 * the option is unavailable for a reason the user can see.
 */
import { Checkbox } from '@wideset/react';

const states = [
  { label: 'Unchecked', checked: false, disabled: false },
  { label: 'Checked', checked: true, disabled: false },
  { label: 'Indeterminate', checked: 'indeterminate', disabled: false },
  { label: 'Disabled', checked: false, disabled: true },
  { label: 'Disabled, checked', checked: true, disabled: true },
] as const;

export default function CheckboxStates() {
  return (
    <div className="gap-x-ws-11 gap-y-ws-7 grid grid-cols-[8rem_auto] items-center">
      {states.map((state) => (
        <div key={state.label} className="contents">
          <span className="typography-caption-md text-ws-static-subtle">{state.label}</span>
          <Checkbox
            label="Select all invoices"
            defaultChecked={state.checked}
            disabled={state.disabled}
          />
        </div>
      ))}
    </div>
  );
}
