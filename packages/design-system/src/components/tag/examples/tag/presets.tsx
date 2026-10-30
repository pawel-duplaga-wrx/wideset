/**
 * Filled has a solid tint and stands out in lists and cards. Border keeps only the outline, for
 * long rows of tags or busy layouts where filled tags would compete with the content. Use one
 * preset per list.
 */
import { Tag } from '@wideset/react';

export default function TagPresets() {
  return (
    <div className="gap-ws-8 flex flex-wrap items-center">
      <Tag preset="filled">Design</Tag>
      <Tag preset="border">Design</Tag>
    </div>
  );
}
