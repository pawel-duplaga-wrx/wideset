/** Pick the status by what the user has to do: `error` when something must be fixed, `warning` before a risky step, `success` to confirm a finished task, `info` for neutral guidance. `error` gets `role="alert"` and is read out at once; the other statuses are `role="status"`, read when the screen reader is idle. Place the alert next to the section it is about, not at the top of the page. */
import { InlineAlert } from '@wideset/react';

const alerts = [
  {
    status: 'error',
    title: 'Publishing failed',
    message: 'We could not publish your changes. Check the required fields and try again.',
    action: 'Retry',
  },
  {
    status: 'warning',
    title: 'Review before publishing',
    message: 'This update affects 12 records. Confirm the details before you continue.',
    action: 'Review',
  },
  {
    status: 'success',
    title: 'Changes saved',
    message: 'Your workspace was updated and is ready to share.',
    action: 'Open',
  },
  {
    status: 'info',
    title: 'New comments',
    message: 'A teammate left comments on this file. Review them before the next handoff.',
    action: 'View',
  },
] as const;

export default function InlineAlertStatuses() {
  return (
    <div className="gap-ws-12 flex flex-col">
      {alerts.map(({ status, title, message, action }) => (
        <InlineAlert key={status} status={status} title={title} message={message}>
          <InlineAlert.Action>{action}</InlineAlert.Action>
        </InlineAlert>
      ))}
    </div>
  );
}
