/** Hover, press and keyboard focus are live. The indicator only mirrors the tile's state: it is hidden from screen readers, which hear the tile's own checked state. A disabled tile is skipped by Tab and keeps its selection, so the user can still see what was chosen. */
import { RiCloudLine } from '@remixicon/react';
import { Tile } from '@wideset/react';

const states = [
  { label: 'Unselected', checked: false, disabled: false },
  { label: 'Selected', checked: true, disabled: false },
  { label: 'Disabled', checked: false, disabled: true },
  { label: 'Disabled, selected', checked: true, disabled: true },
];

export default function TileStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-5 grid grid-cols-[7rem_minmax(0,18rem)] items-center">
      {states.map((state) => (
        <div key={state.label} className="contents">
          <span className="typography-caption-md text-ws-static-subtle">{state.label}</span>
          <Tile.Checkbox
            icon={RiCloudLine}
            title="Backups"
            description="Daily, kept 30 days"
            defaultChecked={state.checked}
            disabled={state.disabled}
          >
            <Tile.Indicator />
          </Tile.Checkbox>
        </div>
      ))}
    </div>
  );
}
