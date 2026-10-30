/**
 * The playground's stage: the trigger that opens a confirmation modal, the content's props set
 * from the rail.
 */
import { Button, Modal, type ModalContentProps } from '@wideset/react';

export default function ModalDefault(props: ModalContentProps) {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <Button variant="secondary" preset="border">
          Archive project
        </Button>
      </Modal.Trigger>
      <Modal.Content {...props}>
        <Modal.Header>
          <Modal.Title>Archive “Website redesign”?</Modal.Title>
          <Modal.Description>Your team will lose edit access.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          Archived projects are read-only. You can restore them from Settings at any time.
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="secondary" preset="border">
              Cancel
            </Button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button>Archive</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
