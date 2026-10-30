/**
 * `disabled` on one `Tabs.Item` takes that tab out of the keyboard order while the others keep
 * working; `disabled` on `Tabs` disables every tab at once. Keep a disabled tab only when the
 * user can tell why it is unavailable.
 */
import { Tabs } from '@wideset/react';

export default function TabsStates() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Item value="overview">
            <Tabs.Label>Overview</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="members" disabled>
            <Tabs.Label>Members</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="comments">
            <Tabs.Label>Comments</Tabs.Label>
          </Tabs.Item>
        </Tabs.List>
      </Tabs>
      <Tabs disabled defaultValue="overview">
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
    </div>
  );
}
