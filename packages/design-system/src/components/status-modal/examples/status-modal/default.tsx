/** The playground's stage: the closed trigger of a status modal with a title, body and footer. */
import { Button, StatusModal } from '@wideset/react';
import type { ComponentProps } from 'react';

export default function StatusModalDefault(props: ComponentProps<typeof StatusModal>) {
  return (
    <StatusModal {...props}>
      <StatusModal.Trigger asChild>
        <Button>Delete workspace</Button>
      </StatusModal.Trigger>
      <StatusModal.Content>
        <StatusModal.Title>Delete workspace</StatusModal.Title>
        <StatusModal.Body>
          This workspace and all its contents will be permanently deleted.
        </StatusModal.Body>
        <StatusModal.Footer>
          <StatusModal.Close asChild>
            <Button size="sm" variant="secondary" preset="border">
              Cancel
            </Button>
          </StatusModal.Close>
          <StatusModal.Close asChild>
            <Button size="sm" preset="border">
              Delete
            </Button>
          </StatusModal.Close>
        </StatusModal.Footer>
      </StatusModal.Content>
    </StatusModal>
  );
}
