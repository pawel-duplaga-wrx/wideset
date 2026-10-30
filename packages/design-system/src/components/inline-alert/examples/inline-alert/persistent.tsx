/** By default an alert can be closed, and stays closed until its `alertId` or `messageId` changes. Make it `persistent` when the condition still holds and closing it would only hide the problem, such as a failed payment; let the user dismiss messages that are only informative. Control it with `dismissed` and `onDismiss` when the closed state must survive a reload. */
import { InlineAlert } from '@wideset/react';

export default function InlineAlertPersistent() {
  return (
    <div className="gap-ws-5 flex w-[30rem] max-w-full flex-col">
      <InlineAlert status="info" message="Invoices are now issued on the 1st." />
      <InlineAlert status="error" persistent message="Your card was declined.">
        <InlineAlert.Action>Update card</InlineAlert.Action>
      </InlineAlert>
    </div>
  );
}
