/**
 * `neutral` is for general updates and has no icon. `info` reports something new from the
 * system, `success` confirms a finished action, and `error` says what failed and offers a retry.
 * An error toast is announced right away (`role="alert"`); the others wait until the screen
 * reader is idle (`role="status"`). Never rely on colour alone: the message says what happened.
 */
import { Toast, type ToastStatus } from '@wideset/react';

const statuses: { status: ToastStatus; message: string; action: string }[] = [
  { status: 'neutral', message: 'Changes saved', action: 'View' },
  { status: 'info', message: 'A new version is available', action: 'Reload' },
  { status: 'success', message: 'Invoice #1042 sent', action: 'Open' },
  { status: 'error', message: 'Unable to publish changes', action: 'Retry' },
];

export default function ToastStatuses() {
  return (
    <div className="gap-ws-9 flex w-[25rem] max-w-full flex-col">
      {statuses.map(({ status, message, action }) => (
        <Toast key={status} status={status} onDismiss={() => {}}>
          <Toast.Message>{message}</Toast.Message>
          <Toast.Action>{action}</Toast.Action>
        </Toast>
      ))}
    </div>
  );
}
