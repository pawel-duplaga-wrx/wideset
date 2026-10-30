export const clampPage = (value: number, pagesCount: number) => {
  if (pagesCount <= 0) return 1;

  return Math.min(Math.max(1, value), pagesCount);
};

export const getPagesToDisplay = (activePage: number, pagesCount: number, maxVisiblePages = 7) => {
  if (pagesCount <= 0) return;

  const safeMaxVisiblePages = Math.max(1, Math.floor(maxVisiblePages));
  const clampedActivePage = clampPage(activePage, pagesCount);

  const allPages = Array.from({ length: pagesCount }).map((_, index) => index + 1);

  if (pagesCount <= safeMaxVisiblePages) return allPages;

  if (safeMaxVisiblePages === 1) {
    return [clampedActivePage];
  }

  if (safeMaxVisiblePages === 2) {
    if (clampedActivePage <= 1) return [1, 2];
    if (clampedActivePage >= pagesCount) return [pagesCount - 1, pagesCount];

    return [clampedActivePage, clampedActivePage + 1];
  }

  const middleSlots = safeMaxVisiblePages - 2;
  const edgeThreshold = safeMaxVisiblePages - 2;

  if (clampedActivePage <= edgeThreshold)
    return [...allPages.slice(0, safeMaxVisiblePages - 1), pagesCount];

  if (clampedActivePage >= pagesCount - (edgeThreshold - 1))
    return [1, ...allPages.slice(-(safeMaxVisiblePages - 1))];

  let start = clampedActivePage - Math.floor(middleSlots / 2);
  let end = start + middleSlots - 1;

  if (start < 2) {
    start = 2;
    end = start + middleSlots - 1;
  }

  if (end > pagesCount - 1) {
    end = pagesCount - 1;
    start = end - middleSlots + 1;
  }

  return [1, ...allPages.slice(start - 1, end), pagesCount];
};
