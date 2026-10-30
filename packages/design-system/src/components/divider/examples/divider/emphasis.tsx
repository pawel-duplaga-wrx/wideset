/**
 * Emphasis sets the line's contrast. Base is the default. Subtle fades into the surface, for
 * separators that should organise without being noticed; strong stands out, for a break the
 * user must not miss. Weight and emphasis combine, so a thin strong line and a bold subtle one
 * both exist.
 */
import { Divider } from '@wideset/react';

export default function DividerEmphasis() {
  return (
    <div className="gap-ws-11 flex w-[20rem] max-w-full flex-col">
      {(['subtle', 'base', 'strong'] as const).map((emphasis) => (
        <Divider key={emphasis} emphasis={emphasis} />
      ))}
    </div>
  );
}
