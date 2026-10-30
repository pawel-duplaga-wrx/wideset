/** The playground's stage: the closed trigger of an order panel with a header, content and footer. */
import { RiCloseLine } from '@remixicon/react';
import { Button, IconButton, Sidepanel } from '@wideset/react';
import type { ComponentProps } from 'react';

export default function SidepanelDefault(props: ComponentProps<typeof Sidepanel>) {
  return (
    <Sidepanel {...props}>
      <Sidepanel.Trigger asChild>
        <Button variant="secondary" preset="border">
          View order details
        </Button>
      </Sidepanel.Trigger>
      <Sidepanel.Panel>
        <Sidepanel.Actions>
          <Sidepanel.Close asChild>
            <IconButton
              aria-label="Close"
              icon={RiCloseLine}
              preset="border"
              variant="secondary"
              size="sm"
              className="size-ws-forms-sm p-0"
            />
          </Sidepanel.Close>
        </Sidepanel.Actions>
        <Sidepanel.Header>
          <Sidepanel.Title>Order #4821</Sidepanel.Title>
          <Sidepanel.Description>Awaiting shipment</Sidepanel.Description>
        </Sidepanel.Header>
        <Sidepanel.Content>
          <p className="typography-body-md text-ws-static-base">
            Placed on 12 October. Two items, paid by card, shipping to Warsaw.
          </p>
        </Sidepanel.Content>
        <Sidepanel.Footer>
          <Button>Mark as shipped</Button>
          <Sidepanel.Close asChild>
            <Button variant="secondary" preset="border">
              Cancel
            </Button>
          </Sidepanel.Close>
        </Sidepanel.Footer>
      </Sidepanel.Panel>
    </Sidepanel>
  );
}
