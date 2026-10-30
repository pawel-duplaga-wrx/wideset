/**
 * The status sets the icon and the tint behind the title. `neutral` has no icon: use it for an
 * ordinary confirmation. `positive` confirms that something finished, `notice` warns before it is
 * too late, `information` announces something new, and `error` says what failed and how to retry.
 * The icon is hidden from screen readers, so the title has to carry the meaning on its own.
 */
import { Button, StatusModal, type StatusModalStatus } from '@wideset/react';

const statuses: { status: StatusModalStatus; title: string; body: string; confirm: string }[] = [
  {
    status: 'neutral',
    title: 'Delete workspace',
    body: 'This workspace and all its contents will be permanently deleted.',
    confirm: 'Delete',
  },
  {
    status: 'positive',
    title: 'Payment successful',
    body: 'Your subscription is active. You now have access to every premium feature.',
    confirm: 'Get started',
  },
  {
    status: 'notice',
    title: 'Session expiring',
    body: 'Your session expires in 5 minutes. Save your work to avoid losing changes.',
    confirm: 'Stay signed in',
  },
  {
    status: 'information',
    title: 'New components available',
    body: 'Version 2.4 adds DataGrid, Timeline and updated form controls.',
    confirm: 'View changelog',
  },
  {
    status: 'error',
    title: 'Failed to save',
    body: 'Your changes could not be saved. Check your connection and try again.',
    confirm: 'Retry',
  },
];

export default function StatusModalStatuses() {
  return (
    <div className="gap-ws-6 flex flex-wrap">
      {statuses.map(({ status, title, body, confirm }) => (
        <StatusModal key={status} status={status}>
          <StatusModal.Trigger asChild>
            <Button variant="secondary" preset="border">
              {title}
            </Button>
          </StatusModal.Trigger>
          <StatusModal.Content>
            <StatusModal.Title>{title}</StatusModal.Title>
            <StatusModal.Body>{body}</StatusModal.Body>
            <StatusModal.Footer>
              <StatusModal.Close asChild>
                <Button size="sm" variant="secondary" preset="border">
                  Cancel
                </Button>
              </StatusModal.Close>
              <StatusModal.Close asChild>
                <Button size="sm" preset="border">
                  {confirm}
                </Button>
              </StatusModal.Close>
            </StatusModal.Footer>
          </StatusModal.Content>
        </StatusModal>
      ))}
    </div>
  );
}
