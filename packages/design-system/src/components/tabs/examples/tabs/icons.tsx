/** An icon goes before the label and is hidden from screen readers, so the label still names the tab. A count goes after the label and becomes part of the tab's accessible name; use it for how many items wait behind the tab, not for a status. Give every tab an icon or none. */
import { RiChat3Line, RiFileList3Line, RiTeamLine } from '@remixicon/react';
import { Tabs } from '@wideset/react';

export default function TabsIcons() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Item value="overview">
            <Tabs.Icon icon={RiFileList3Line} />
            <Tabs.Label>Overview</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="members">
            <Tabs.Icon icon={RiTeamLine} />
            <Tabs.Label>Members</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="comments">
            <Tabs.Icon icon={RiChat3Line} />
            <Tabs.Label>Comments</Tabs.Label>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Item value="overview">
            <Tabs.Label>Overview</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="members">
            <Tabs.Label>Members</Tabs.Label>
            <Tabs.Count>8</Tabs.Count>
          </Tabs.Item>
          <Tabs.Item value="comments">
            <Tabs.Label>Comments</Tabs.Label>
            <Tabs.Count>12</Tabs.Count>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>
    </div>
  );
}
