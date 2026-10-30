/** `default` right-aligns the actions under a divider: the usual confirm or cancel. `extension` spreads them across a tinted band, for a footer that also carries a secondary action or a note on the left, such as a step count or a link to help. */
import { Button, Modal } from '@wideset/react';

const frame =
  'flex w-[600px] max-w-full flex-col overflow-hidden rounded-ws-container-md border border-ws-dynamic-secondary-default bg-ws-static-overlay shadow-ws-high';

export default function ModalFooters() {
  return (
    <Modal>
      <div className="gap-ws-9 flex flex-col items-center">
        <div className={frame}>
          <Modal.Header>
            <Modal.Title>Rename project</Modal.Title>
          </Modal.Header>
          <Modal.Body>The new name is shown to everyone on the team.</Modal.Body>
          <Modal.Footer variant="default">
            <Button variant="secondary" preset="border">
              Cancel
            </Button>
            <Button>Save</Button>
          </Modal.Footer>
        </div>
        <div className={frame}>
          <Modal.Header>
            <Modal.Title>Invite people</Modal.Title>
          </Modal.Header>
          <Modal.Body>Invited people get an email with a link to join the workspace.</Modal.Body>
          <Modal.Footer variant="extension">
            <Button variant="secondary" preset="ghost">
              Copy invite link
            </Button>
            <Button>Send invites</Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  );
}
