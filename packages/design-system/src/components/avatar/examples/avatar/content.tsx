/** The content follows the prop you pass: `src` for a photo, `initials` for a monogram, `icon` for a custom glyph, `agent` for the orb, nothing for the default user icon. A photo whose `alt` is left out is decorative, so put the person's name in text next to it or in `alt`. If the image fails to load, the initials show instead. */
import { RiRobot2Line } from '@remixicon/react';
import { Avatar } from '@wideset/react';

export default function AvatarContent() {
  return (
    <div className="gap-ws-7 flex flex-wrap items-center justify-center">
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Anna Kowalska"
        initials="AK"
      />
      <Avatar size="xl" initials="TS" />
      <Avatar size="xl" icon={<RiRobot2Line />} />
      <Avatar size="xl" agent />
      <Avatar size="xl" />
    </div>
  );
}
