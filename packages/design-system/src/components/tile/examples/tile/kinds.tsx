/** Pick the kind by what the tile is, not by how it looks. `Tile` is static text with no role and no tab stop. `Tile.Checkbox` is one checkbox per tile, each its own tab stop, toggled with Space. `Tile.Radio` inside `Tile.RadioGroup` is a single choice: the group is one tab stop and the arrow keys move the selection. For a tile that runs an action or opens a link, use Action tile. */
import { RiCloudLine, RiRocketLine, RiShieldCheckLine, RiTeamLine } from '@remixicon/react';
import { Tile } from '@wideset/react';

export default function TileKinds() {
  return (
    <div className="gap-ws-9 grid w-full grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] items-start">
      <div className="gap-ws-5 flex flex-col">
        <span className="typography-caption-md text-ws-static-subtle">Static</span>
        <Tile icon={RiTeamLine} title="Team" description="8 members" />
      </div>
      <div className="gap-ws-5 flex flex-col">
        <span className="typography-caption-md text-ws-static-subtle">Checkbox</span>
        <Tile.Checkbox icon={RiCloudLine} title="Backups" description="Daily" defaultChecked>
          <Tile.Indicator />
        </Tile.Checkbox>
        <Tile.Checkbox icon={RiShieldCheckLine} title="Audit log" description="Every change">
          <Tile.Indicator />
        </Tile.Checkbox>
      </div>
      <div className="gap-ws-5 flex flex-col">
        <span className="typography-caption-md text-ws-static-subtle">Radio group</span>
        <Tile.RadioGroup aria-label="Plan" defaultValue="pro">
          <Tile.Radio value="starter" icon={RiCloudLine} title="Starter" description="3 projects">
            <Tile.Indicator />
          </Tile.Radio>
          <Tile.Radio value="pro" icon={RiRocketLine} title="Pro" description="Unlimited">
            <Tile.Indicator />
          </Tile.Radio>
        </Tile.RadioGroup>
      </div>
    </div>
  );
}
