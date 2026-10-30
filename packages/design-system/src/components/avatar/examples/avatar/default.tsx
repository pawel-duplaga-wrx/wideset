/** The playground's stage: a group of four avatars with an overflow count, the group's props set from the rail. */
import { Avatar, type AvatarProps } from '@wideset/react';

export default function AvatarDefault(props: AvatarProps) {
  return (
    <Avatar.Group {...props}>
      <Avatar initials="AK" />
      <Avatar initials="TS" />
      <Avatar initials="ML" />
      <Avatar initials="JB" />
      <Avatar.More>+5</Avatar.More>
    </Avatar.Group>
  );
}
