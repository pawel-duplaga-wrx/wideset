/**
 * Round stands for a person. Square stands for everything else that has an avatar: a team, a
 * workspace, a company. Keeping the two apart lets users tell people from groups at a glance.
 */
import { Avatar } from '@wideset/react';

export default function AvatarShapes() {
  return (
    <div className="gap-ws-7 flex flex-wrap items-center">
      <Avatar size="xl" shape="round" initials="AK" />
      <Avatar size="xl" shape="square" initials="WS" />
    </div>
  );
}
