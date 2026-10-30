/** Header, content and footer are each optional. Add the footer when the popup asks for a decision, and drop it when the popup only shows information or applies changes as the user makes them. The title is not linked to the popup for screen readers: point `aria-labelledby` on the container at it, or give the container an `aria-label`. */
import { Button, Popup } from '@wideset/react';

const frame =
  'flex w-[24rem] max-w-full flex-col rounded-ws-container-lg bg-ws-static-overlay shadow-ws-high';

export default function PopupSections() {
  return (
    <Popup>
      <div className="gap-ws-9 flex flex-wrap items-start justify-center">
        <div className={frame}>
          <Popup.Header>
            <Popup.Title>Share this report</Popup.Title>
          </Popup.Header>
          <Popup.Content>
            <Popup.Description>
              Anyone with the link can view this report, but not edit it.
            </Popup.Description>
          </Popup.Content>
          <Popup.Footer>
            <Button variant="secondary" preset="border" size="sm">
              Cancel
            </Button>
            <Button size="sm">Copy link</Button>
          </Popup.Footer>
        </div>
        <div className={frame}>
          <Popup.Content>
            <Popup.Description>
              Last synced 5 minutes ago. Changes from other devices appear here automatically.
            </Popup.Description>
          </Popup.Content>
        </div>
      </div>
    </Popup>
  );
}
