# Pagination

## When to use

- Below a `Table` or a result list whose data is fetched or sliced per page.
- When users need to reach a specific page or change how many rows a page shows.

## When not to use

- Steps of a flow that must be done in order → `ProgressStepper`.
- Switching between sections of a page → `Tabs`.
- Fewer items than one page holds: render no pagination at all.

## Do / Don't

- Do reset to page 1 in `onChangeItemsPerPage`; Pagination does not do it for you.
- Do recompute `pagesCount` when the page size or the data changes.
- Don't put `Pagination.Numbers` and `Pagination.Overflow` in the same bar.
- Don't render Pagination for a single page of results.

## Gotchas

- Callbacks are `onChangeActivePage` and `onChangeItemsPerPage`, not `onValueChange` or
  `onPageChange`, and they receive numbers.
- `Pagination.RowsPerPage` renders nothing unless `rowsPerPageOptions` is set on the root or
  `options` on the part.
- Pagination does not slice data; it only reports the page. Fetch or slice yourself.
- Parts throw outside `<Pagination>`.
