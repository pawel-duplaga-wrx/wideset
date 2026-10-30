/**
 * The initials' background comes from the initials, so the same person gets the same colour on
 * every screen. Inside `Avatar.Group` the colours are spread across the visible avatars, so two
 * people with the same initials still look different. Pass `color` to pin one, for example for a
 * team or a shared inbox.
 */
import { Avatar } from '@wideset/react';

export default function AvatarColors() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <div className="gap-ws-7 flex flex-wrap items-center">
        {['AK', 'TS', 'ML', 'JB', 'PW'].map((initials) => (
          <Avatar key={initials} size="lg" initials={initials} />
        ))}
      </div>
      <Avatar.Group size="lg">
        <Avatar initials="DS" />
        <Avatar initials="DS" />
        <Avatar initials="DS" />
      </Avatar.Group>
      <div className="gap-ws-7 flex flex-wrap items-center">
        {(['brand', 'teal', 'orange'] as const).map((color) => (
          <Avatar key={color} size="lg" initials="OP" color={color} />
        ))}
      </div>
    </div>
  );
}
