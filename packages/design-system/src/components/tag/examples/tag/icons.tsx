/**
 * A leading icon helps the eye find a category in a long list. The icon is hidden from screen
 * readers, so an `iconOnly` tag needs its name in text: put it in a visually hidden span, or the
 * tag says nothing at all.
 */
import { RiFlashlightFill } from '@remixicon/react';
import { Tag } from '@wideset/react';

export default function TagIcons() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <Tag>
        <Tag.Icon icon={RiFlashlightFill} />
        Quick win
      </Tag>
      <Tag iconOnly>
        <Tag.Icon icon={RiFlashlightFill} />
        <span className="sr-only">Quick win</span>
      </Tag>
    </div>
  );
}
