/** `horizontal` keeps the message and its actions on one row, which fits a short message in a wide section. `vertical` puts the actions under the message: use it for longer copy, more than one action, or a narrow column such as a side panel, where a single row would squeeze the text. */
import { InlineAlert } from '@wideset/react';

export default function InlineAlertOrientation() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <InlineAlert
        status="info"
        orientation="horizontal"
        title="New billing cycle"
        message="Invoices are now issued on the 1st."
      >
        <InlineAlert.Action>Details</InlineAlert.Action>
      </InlineAlert>
      <InlineAlert
        status="info"
        orientation="vertical"
        title="New billing cycle"
        message="Invoices are now issued on the 1st of each month. Payments already scheduled for this month keep their original date."
      >
        <InlineAlert.Action>Details</InlineAlert.Action>
        <InlineAlert.Action preset="ghost">Billing settings</InlineAlert.Action>
      </InlineAlert>
    </div>
  );
}
