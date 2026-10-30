/**
 * Hover, press and keyboard focus are live. `disabled` on one item takes only that segment out
 * of reach; `disabled` on the control disables all of them and keeps the current selection
 * visible. Say why a segment is unavailable when the reason is not obvious.
 */
import { SegmentedControl } from '@wideset/react';

export default function SegmentedControlStates() {
  return (
    <div className="gap-ws-12 flex flex-col items-start">
      <SegmentedControl aria-label="Period" defaultValue="week">
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month" disabled>
          Month
        </SegmentedControl.Item>
      </SegmentedControl>
      <SegmentedControl aria-label="Period" defaultValue="week" disabled>
        <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
        <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
        <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
}
