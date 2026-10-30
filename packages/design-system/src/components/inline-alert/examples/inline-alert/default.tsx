/** The playground's stage: one alert with a title, a message and an action, its props set from the rail. */
import { InlineAlert, type InlineAlertProps } from '@wideset/react';

export default function InlineAlertDefault(props: InlineAlertProps) {
  return (
    <InlineAlert
      className="w-[30rem] max-w-full"
      title="New billing cycle"
      message="Invoices are now issued on the 1st."
      {...props}
    >
      <InlineAlert.Action>Details</InlineAlert.Action>
    </InlineAlert>
  );
}
