/**
 * Small is the default, with a compact label for panels and dense screens. Large gives the tabs
 * more height and a larger label, for the top level of a page; use one size per screen.
 */
import { Tabs } from '@wideset/react';

export default function TabsSizes() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      {(['sm', 'lg'] as const).map((size) => (
        <Tabs key={size} size={size} defaultValue="overview">
          <Tabs.List>
            <Tabs.Item value="overview">
              <Tabs.Label>Overview</Tabs.Label>
            </Tabs.Item>
            <Tabs.Item value="members">
              <Tabs.Label>Members</Tabs.Label>
            </Tabs.Item>
            <Tabs.Item value="comments">
              <Tabs.Label>Comments</Tabs.Label>
            </Tabs.Item>
          </Tabs.List>
        </Tabs>
      ))}
    </div>
  );
}
