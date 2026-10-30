/**
 * `side` on `Sidepanel.Panel` anchors it to the `right` edge (the default) or the `left` one.
 * Open details and edit forms from the right, next to the content they describe; keep the left
 * for navigation or filters that read before the content. The panel is full height either way,
 * moves focus inside while open, and returns it to the trigger on close.
 */
import { Button, Sidepanel } from '@wideset/react';

export default function SidepanelSide() {
  return (
    <div className="gap-ws-6 flex flex-wrap">
      <Sidepanel>
        <Sidepanel.Trigger asChild>
          <Button variant="secondary" preset="border">
            Order details
          </Button>
        </Sidepanel.Trigger>
        <Sidepanel.Panel side="right">
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
            <Sidepanel.Close asChild>
              <Button variant="secondary" preset="border">
                Close
              </Button>
            </Sidepanel.Close>
          </Sidepanel.Footer>
        </Sidepanel.Panel>
      </Sidepanel>
      <Sidepanel>
        <Sidepanel.Trigger asChild>
          <Button variant="secondary" preset="border">
            Filters
          </Button>
        </Sidepanel.Trigger>
        <Sidepanel.Panel side="left">
          <Sidepanel.Header>
            <Sidepanel.Title>Filters</Sidepanel.Title>
            <Sidepanel.Description>Narrow the order list</Sidepanel.Description>
          </Sidepanel.Header>
          <Sidepanel.Content>
            <p className="typography-body-md text-ws-static-base">
              Status, date placed and shipping country.
            </p>
          </Sidepanel.Content>
          <Sidepanel.Footer>
            <Sidepanel.Close asChild>
              <Button>Show results</Button>
            </Sidepanel.Close>
          </Sidepanel.Footer>
        </Sidepanel.Panel>
      </Sidepanel>
    </div>
  );
}
