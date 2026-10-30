/** The playground's stage: three tabs with counts and their panels, its props set from the rail. */
import { Tabs, type TabsProps } from '@wideset/react';

export default function TabsDefault(props: Partial<TabsProps>) {
  return (
    <Tabs defaultValue="overview" className="w-[22rem] max-w-full" {...props}>
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
      <Tabs.Content value="overview" className="py-ws-8 typography-body-md text-ws-static-subtle">
        Project summary, milestones and recent activity.
      </Tabs.Content>
      <Tabs.Content value="members" className="py-ws-8 typography-body-md text-ws-static-subtle">
        Everyone with access to this project.
      </Tabs.Content>
      <Tabs.Content value="comments" className="py-ws-8 typography-body-md text-ws-static-subtle">
        Feedback left on designs and documents.
      </Tabs.Content>
    </Tabs>
  );
}
