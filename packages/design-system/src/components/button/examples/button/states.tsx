/**
 * Hover, press and keyboard focus are live. A disabled button cannot be focused or clicked and
 * gives no reason why, so disable an action only while it is temporarily unavailable and the
 * user can tell what will enable it, such as an empty required field.
 */
import { Button } from '@wideset/react';

export default function ButtonStates() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Button>Send invite</Button>
      <Button disabled>Send invite</Button>
    </div>
  );
}
