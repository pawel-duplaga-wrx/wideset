/**
 * Square is the default and lines up with other rectangular elements such as inputs and table
 * cells. Rounded is a pill, a softer look for tags on cards and profiles. Pick one shape per
 * product.
 */
import { Tag } from '@wideset/react';

export default function TagShapes() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <Tag shape="square">Design</Tag>
      <Tag shape="rounded">Design</Tag>
    </div>
  );
}
