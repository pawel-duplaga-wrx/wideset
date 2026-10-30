/** The playground's stage: twelve pages with the third active, its props set from the rail. */
import { Pagination, type PaginationProps } from '@wideset/react';

export default function PaginationDefault(props: Partial<PaginationProps>) {
  return <Pagination pagesCount={12} defaultActivePage={3} maxVisiblePages={5} {...props} />;
}
