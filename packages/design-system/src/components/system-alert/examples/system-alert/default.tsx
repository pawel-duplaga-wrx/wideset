/** The playground's stage: one alert with a message and an action, its props set from the rail. */
import { SystemAlert, type SystemAlertProps } from '@wideset/react';

export default function SystemAlertDefault(props: SystemAlertProps) {
  return (
    <div className="w-[26rem] max-w-full">
      <SystemAlert message="Your workspace is back online" {...props}>
        <SystemAlert.Action>View status</SystemAlert.Action>
      </SystemAlert>
    </div>
  );
}
