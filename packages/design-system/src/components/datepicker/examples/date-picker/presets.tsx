/**
 * Border outlines the field, for forms where it sits among other inputs. Ghost drops the
 * outline and adds a leading calendar icon, for toolbars and filter rows where the field
 * should read as part of the surface. Keep one preset per form.
 */
import { DatePicker } from '@wideset/react';

export default function DatePickerPresets() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <DatePicker key={preset} preset={preset} defaultSelected="2026-11-03" />
      ))}
    </div>
  );
}
