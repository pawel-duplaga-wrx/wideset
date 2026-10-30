/** Pass `rowsPerPageOptions` when users should choose how dense each page is, such as a long table of invoices; leave it out when the page size is fixed or set elsewhere. The selector and the page controls then sit at opposite ends of the bar. Pagination does not move the user back to page 1 when the size changes: do that in `onChangeItemsPerPage`, or the active page may point past the end. */
import { Pagination } from '@wideset/react';

export default function PaginationRowsPerPage() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <Pagination pagesCount={10} defaultActivePage={3} />
      <Pagination
        pagesCount={10}
        defaultActivePage={3}
        defaultItemsPerPage={25}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </div>
  );
}
