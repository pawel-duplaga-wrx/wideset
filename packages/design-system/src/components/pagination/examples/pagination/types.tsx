/** `numbers` shows up to `maxVisiblePages` page buttons and folds the pages in between into an ellipsis menu, so users can jump to a nearby page in one click. `overflow` swaps the buttons for Prev, a page select and Next: it stays the same width however many pages there are, which suits long result sets and narrow toolbars. The current page carries `aria-current="page"` and the arrow buttons have their own accessible names. */
import { Pagination } from '@wideset/react';

export default function PaginationTypes() {
  return (
    <div className="gap-ws-12 flex flex-col">
      <Pagination type="numbers" pagesCount={10} defaultActivePage={3} />
      <Pagination type="overflow" pagesCount={10} defaultActivePage={3} />
    </div>
  );
}
