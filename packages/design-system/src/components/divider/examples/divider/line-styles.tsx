/** Solid separates sections that stand on their own. Dashed is lighter and suggests the parts still belong together, such as optional fields under the required ones. The dashes are drawn as an SVG stroke at a fixed 4 px rhythm, so they look the same in every browser. */
import { Divider } from '@wideset/react';

export default function DividerLineStyles() {
  return (
    <div className="gap-ws-11 flex w-[20rem] max-w-full flex-col">
      <Divider lineStyle="solid" />
      <Divider lineStyle="dashed" />
    </div>
  );
}
