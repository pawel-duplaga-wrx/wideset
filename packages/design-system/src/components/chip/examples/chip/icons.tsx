/** A leading icon says what kind of value the chip holds; a trailing close icon says it can be removed. The icons are decorative (`aria-hidden`), so a removable chip needs an accessible name that says so, such as `aria-label="Remove Warsaw"`. */
import { RiCloseLine, RiMapPinLine } from '@remixicon/react';
import { Chip } from '@wideset/react';

export default function ChipIcons() {
  return (
    <div className="gap-ws-5 flex flex-wrap items-center justify-center">
      <Chip variant="secondary">
        <Chip.Icon icon={RiMapPinLine} />
        Warsaw
      </Chip>
      <Chip aria-label="Remove Warsaw">
        Warsaw
        <Chip.Icon icon={RiCloseLine} />
      </Chip>
      <Chip variant="secondary" style="border" aria-label="Remove Warsaw">
        <Chip.Icon icon={RiMapPinLine} />
        Warsaw
        <Chip.Icon icon={RiCloseLine} />
      </Chip>
    </div>
  );
}
