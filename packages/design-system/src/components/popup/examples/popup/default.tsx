/**
 * The playground's stage: the trigger that opens a share popup, the container's props set from
 * the rail.
 */
import { RiCloseLine, RiShareLine } from '@remixicon/react';
import { Button, IconButton, Popup, type PopupContainerProps } from '@wideset/react';

export default function PopupDefault(props: PopupContainerProps) {
  return (
    <Popup>
      <Popup.Trigger asChild>
        <Button variant="secondary" preset="border">
          <Button.Icon icon={RiShareLine} />
          Share
        </Button>
      </Popup.Trigger>
      <Popup.Container {...props}>
        <Popup.Header>
          <div className="gap-ws-5 flex items-center justify-between">
            <Popup.Title>Share this report</Popup.Title>
            <Popup.Close asChild>
              <IconButton
                aria-label="Close"
                icon={RiCloseLine}
                preset="border"
                variant="secondary"
                size="sm"
                className="size-ws-forms-sm shrink-0 p-0"
              />
            </Popup.Close>
          </div>
        </Popup.Header>
        <Popup.Content>
          <Popup.Description>
            Anyone with the link can view this report, but not edit it.
          </Popup.Description>
        </Popup.Content>
        <Popup.Footer>
          <Popup.Close asChild>
            <Button variant="secondary" preset="border" size="sm">
              Cancel
            </Button>
          </Popup.Close>
          <Popup.Close asChild>
            <Button size="sm">Copy link</Button>
          </Popup.Close>
        </Popup.Footer>
      </Popup.Container>
    </Popup>
  );
}
