/**
 * Medium is the default. Small fits dense toolbars and table headers; large gives the control
 * more presence next to large buttons and inputs. Match the size of the controls beside it.
 */
import { SegmentedControl } from '@wideset/react';

export default function SegmentedControlSizes() {
  return (
    <div className="gap-ws-12 flex flex-col items-start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <SegmentedControl key={size} aria-label="Period" size={size} defaultValue="week">
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
        </SegmentedControl>
      ))}
    </div>
  );
}
