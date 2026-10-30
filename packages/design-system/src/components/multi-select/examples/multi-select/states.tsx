/** Hover, press and focus are live. Disabled blocks the trigger and every option, and hides the clear button; to lock a single choice instead, set `disabled` on that option. */
import { MultiSelect } from '@wideset/react';

const TEAMS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'marketing', label: 'Marketing' },
];

export default function MultiSelectStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-5 grid w-[28rem] max-w-full grid-cols-[4.5rem_1fr] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Default</span>
      <MultiSelect options={TEAMS} defaultValue={['design']} clearable aria-label="Teams" />
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <MultiSelect
        options={TEAMS}
        defaultValue={['design']}
        clearable
        disabled
        aria-label="Teams"
      />
    </div>
  );
}
