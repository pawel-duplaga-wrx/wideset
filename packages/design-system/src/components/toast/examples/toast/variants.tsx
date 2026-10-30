/**
 * `basic` is one line with an optional action, for a short confirmation such as "Profile updated".
 * `expanded` adds room for a description, a footer and a progress bar, for a task that is still
 * running or needs a sentence of explanation. In an app, show toasts with `useToast()` inside a
 * `ToastProvider`; it stacks them and closes them after their duration.
 */
import { Toast } from '@wideset/react';

export default function ToastVariants() {
  return (
    <div className="gap-ws-9 flex w-[25rem] max-w-full flex-col">
      <Toast variant="basic" status="info" onDismiss={() => {}}>
        <Toast.Message>Profile updated</Toast.Message>
        <Toast.Action>Undo</Toast.Action>
      </Toast>
      <Toast
        variant="expanded"
        status="info"
        progress={64}
        footer="Closes in 5 seconds"
        onDismiss={() => {}}
      >
        <Toast.Message>Import is still running</Toast.Message>
        <Toast.Description>
          You can keep working while the remaining files are processed in the background.
        </Toast.Description>
        <Toast.Action variant="secondary">View details</Toast.Action>
      </Toast>
    </div>
  );
}
