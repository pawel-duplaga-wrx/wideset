/** The playground's stage: three views with icons and labels, its props set from the rail. */
import { RiCalendarLine, RiLayoutColumnLine, RiListCheck2 } from '@remixicon/react';
import { SegmentedControl, type SegmentedControlProps } from '@wideset/react';

export default function SegmentedControlDefault(props: Partial<SegmentedControlProps>) {
  return (
    <SegmentedControl aria-label="View" defaultValue="board" {...props}>
      <SegmentedControl.Item value="list">
        <SegmentedControl.Icon icon={RiListCheck2} />
        List
      </SegmentedControl.Item>
      <SegmentedControl.Item value="board">
        <SegmentedControl.Icon icon={RiLayoutColumnLine} />
        Board
      </SegmentedControl.Item>
      <SegmentedControl.Item value="calendar">
        <SegmentedControl.Icon icon={RiCalendarLine} />
        Calendar
      </SegmentedControl.Item>
    </SegmentedControl>
  );
}
