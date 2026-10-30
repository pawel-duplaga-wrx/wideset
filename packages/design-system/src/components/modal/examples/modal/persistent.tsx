/**
 * `persistent` on `Modal.Content` ignores clicks outside and the Escape key, so the modal closes
 * only through its own buttons. Use it when leaving without an answer would lose work, such as an
 * unsaved form or a step that must be confirmed. Keep a visible way out (Cancel or the close
 * button); a modal the user cannot leave traps keyboard and screen reader users.
 */
import { Button, Modal } from '@wideset/react';

export default function ModalPersistent() {
  return (
    <Modal>
      <Modal.Trigger asChild>
        <Button variant="secondary" preset="border">
          Discard changes
        </Button>
      </Modal.Trigger>
      <Modal.Content persistent>
        <Modal.Header>
          <Modal.Title>Discard unsaved changes?</Modal.Title>
          <Modal.Description>Edits to “Invoice #1042” since 10:24 will be lost.</Modal.Description>
        </Modal.Header>
        <Modal.Body>Your draft is not saved. Discarding cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="secondary" preset="border">
              Keep editing
            </Button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button>Discard</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
