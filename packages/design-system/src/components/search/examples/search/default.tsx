/** The playground's stage: one search field, its props set from the rail. */
import { Search, type SearchProps } from '@wideset/react';

export default function SearchDefault(props: SearchProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <Search placeholder="Search projects" aria-label="Search" {...props} />
    </div>
  );
}
