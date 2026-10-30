/** `Avatar.Group` sets size and shape for its avatars and keeps their colours distinct. It does not count or hide anything: render the avatars you want shown and put `Avatar.More` last with the rest as its label. With an `onClick` it becomes a button that opens the full list; without one it is plain text. */
import { RiAddLine } from '@remixicon/react';
import { Avatar } from '@wideset/react';

export default function AvatarGroup() {
  return (
    <div className="gap-ws-9 flex flex-col items-center">
      <Avatar.Group size="lg">
        <Avatar initials="AK" />
        <Avatar initials="TS" />
        <Avatar initials="ML" />
        <Avatar initials="JB" />
        <Avatar.More>+12</Avatar.More>
      </Avatar.Group>
      <Avatar.Group size="lg">
        <Avatar initials="AK" />
        <Avatar initials="TS" />
        <Avatar.More aria-label="Add member" onClick={() => {}}>
          <RiAddLine />
        </Avatar.More>
      </Avatar.Group>
    </div>
  );
}
