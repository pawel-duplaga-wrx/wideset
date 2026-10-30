/** `low` is the default for news the user can read later. `high` is for a problem that blocks work, such as a failed payment; keep it rare, or every banner looks urgent. Actions and the dismiss button switch to the inverse style on a high alert by themselves, except on `notice`. */
import { SystemAlert } from '@wideset/react';

export default function SystemAlertEmphasis() {
  return (
    <div className="gap-ws-5 flex w-[30rem] max-w-full flex-col">
      <SystemAlert status="negative" emphasis="low" message="Payment failed for your plan">
        <SystemAlert.Action>Update card</SystemAlert.Action>
      </SystemAlert>
      <SystemAlert status="negative" emphasis="high" message="Payment failed for your plan">
        <SystemAlert.Action>Update card</SystemAlert.Action>
      </SystemAlert>
    </div>
  );
}
