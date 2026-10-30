/** The playground's stage: one tag with a short label, its props set from the rail. */
import { Tag, type TagProps } from '@wideset/react';

export default function TagDefault(props: TagProps) {
  return <Tag {...props}>Design</Tag>;
}
