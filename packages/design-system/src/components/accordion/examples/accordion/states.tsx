/** Hover, press and focus are live. `disabled` on an item locks that section and keeps it in its current open or closed state; on the root it locks them all. Arrow keys skip disabled triggers. */
import { Accordion } from '@wideset/react';

export default function AccordionStates() {
  return (
    <div className="gap-ws-11 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {[false, true].map((contained) => (
        <Accordion key={String(contained)} type="single" collapsible contained={contained}>
          <Accordion.Item value="profile">
            <Accordion.Trigger>Profile</Accordion.Trigger>
            <Accordion.Content>Name, photo and contact details.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="billing" disabled>
            <Accordion.Trigger>Billing</Accordion.Trigger>
            <Accordion.Content>Only owners can change billing.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="security">
            <Accordion.Trigger>Security</Accordion.Trigger>
            <Accordion.Content>Password and two-step sign-in.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}
