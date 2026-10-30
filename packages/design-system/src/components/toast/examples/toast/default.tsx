/** The playground's stage: one toast with a message, an action and a dismiss button. */
import { Toast, type ToastProps } from '@wideset/react';

export default function ToastDefault(props: ToastProps) {
  return (
    <div className="w-[25rem] max-w-full">
      <Toast onDismiss={() => {}} {...props}>
        <Toast.Message>Workspace synced</Toast.Message>
        <Toast.Action>Open</Toast.Action>
      </Toast>
    </div>
  );
}
