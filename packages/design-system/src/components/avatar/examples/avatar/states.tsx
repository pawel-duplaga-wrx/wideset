/** `status` is presence: online, offline or unavailable. The dot is announced to screen readers by its name, so do not repeat it in text next to the avatar. `selected` draws a ring for the avatar the user picked, for example the current assignee in a picker. */
import { Avatar } from '@wideset/react';

const statuses = ['online', 'offline', 'unavailable'] as const;

export default function AvatarStates() {
  return (
    <div className="gap-ws-11 flex flex-wrap items-center justify-center">
      <div className="gap-ws-7 flex items-center">
        {statuses.map((status) => (
          <Avatar key={status} size="xl" initials="AK" status={status} />
        ))}
      </div>
      <div className="gap-ws-7 flex items-center">
        <Avatar size="xl" initials="TS" selected />
        <Avatar size="xl" agent selected />
      </div>
    </div>
  );
}
