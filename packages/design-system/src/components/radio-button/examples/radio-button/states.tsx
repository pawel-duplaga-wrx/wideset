/**
 * A radio never stands alone: it lives in a group that owns the selection, and once one option
 * is picked the user cannot clear it, only pick another. A disabled radio is skipped by the
 * arrow keys and keeps its selection, so the user still sees what was chosen.
 */
import { RadioButton } from '@wideset/react';

const states = [
  { label: 'Unselected', selected: false, disabled: false },
  { label: 'Selected', selected: true, disabled: false },
  { label: 'Disabled', selected: false, disabled: true },
  { label: 'Disabled, selected', selected: true, disabled: true },
];

export default function RadioButtonStates() {
  return (
    <div className="gap-x-ws-11 gap-y-ws-7 grid grid-cols-[8rem_auto] items-center">
      {states.map((state) => (
        <div key={state.label} className="contents">
          <span className="typography-caption-md text-ws-static-subtle">{state.label}</span>
          <RadioButton.Group
            aria-label={state.label}
            defaultValue={state.selected ? 'annual' : undefined}
          >
            <RadioButton value="annual" label="Annual billing" disabled={state.disabled} />
          </RadioButton.Group>
        </div>
      ))}
    </div>
  );
}
