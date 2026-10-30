/**
 * Medium is the default. Small fits table cells and dense lists; large sits next to larger text,
 * such as a card title. Tags in one row share a size.
 */
import { Tag } from '@wideset/react';

export default function TagSizes() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Tag key={size} size={size}>
          Design
        </Tag>
      ))}
    </div>
  );
}
