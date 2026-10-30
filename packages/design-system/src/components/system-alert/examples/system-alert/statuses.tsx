/** A system alert speaks for the whole product, so it sits at the top of the page, above everything else. `negative` gets `role="alert"` and is read out at once; every other status is `role="status"`, read when the screen reader is idle. Only `neutral` has no icon. */
import { SystemAlert } from '@wideset/react';

export default function SystemAlertStatuses() {
  return (
    <div className="gap-ws-5 flex w-[30rem] max-w-full flex-col">
      <SystemAlert status="positive" message="Your workspace is back online" />
      <SystemAlert status="negative" message="Payment failed for your plan" />
      <SystemAlert status="notice" message="Scheduled maintenance tonight at 22:00" />
      <SystemAlert status="info" message="A new version is ready to install" />
      <SystemAlert status="neutral" message="You are viewing a shared copy" />
    </div>
  );
}
