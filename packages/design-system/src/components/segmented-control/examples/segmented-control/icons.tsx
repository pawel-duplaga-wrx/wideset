/** An icon next to a label helps recognition; icon-only segments, set with `icon` or with a lone `SegmentedControl.Icon` child, become square and need an `aria-label` each (the item warns in the console without one). Do not mix the two in one control. */
import { RiCalendarLine, RiLayoutColumnLine, RiListCheck2 } from '@remixicon/react';
import { SegmentedControl } from '@wideset/react';

export default function SegmentedControlIcons() {
  return (
    <div className="gap-ws-9 flex flex-wrap items-center justify-center">
      <SegmentedControl aria-label="View" defaultValue="board">
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
      <SegmentedControl aria-label="View" defaultValue="board">
        <SegmentedControl.Item value="list" icon={RiListCheck2} aria-label="List view" />
        <SegmentedControl.Item value="board" icon={RiLayoutColumnLine} aria-label="Board view" />
        <SegmentedControl.Item value="calendar" icon={RiCalendarLine} aria-label="Calendar view" />
      </SegmentedControl>
    </div>
  );
}
