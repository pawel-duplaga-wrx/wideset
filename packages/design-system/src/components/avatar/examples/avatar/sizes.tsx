/**
 * Medium is the default, for lists and comments. Extra small and small fit table cells, chips and
 * menus; large to 2xl are for profile headers and cards where the person is the subject. Initials
 * and the status dot scale with the avatar.
 */
import { Avatar } from '@wideset/react';

export default function AvatarSizes() {
  return (
    <div className="gap-ws-7 flex flex-wrap items-center">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Avatar key={size} size={size} initials="AK" />
      ))}
    </div>
  );
}
