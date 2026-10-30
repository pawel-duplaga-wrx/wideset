/**
 * Border outlines the field, for forms where it sits among other inputs. Ghost drops the
 * outline, for toolbars and report headers where the field should read as part of the surface.
 * Keep one preset per form.
 */
import { DateRangePicker } from '@wideset/react';

export default function DateRangePickerPresets() {
  return (
    <div className="gap-ws-12 flex w-[18rem] max-w-full flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <DateRangePicker
          key={preset}
          preset={preset}
          defaultSelected={{ from: '2026-11-03', to: '2026-11-09' }}
        />
      ))}
    </div>
  );
}
