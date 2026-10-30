/** The playground's stage: one selectable tile with an icon, a title and a description. */
import { RiRocketLine } from '@remixicon/react';
import { Tile, type TileCheckboxProps } from '@wideset/react';

export default function TileDefault(props: TileCheckboxProps) {
  return (
    <Tile.Checkbox
      icon={RiRocketLine}
      title="Pro"
      description="Unlimited projects"
      defaultChecked
      className="w-[20rem] max-w-full"
      {...props}
    >
      <Tile.Indicator />
    </Tile.Checkbox>
  );
}
