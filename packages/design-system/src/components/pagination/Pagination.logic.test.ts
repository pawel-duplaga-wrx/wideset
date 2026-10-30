import { describe, expect, it } from 'vitest';

import { clampPage, getPagesToDisplay } from './Pagination.logic';

describe('clampPage', () => {
  it('returns 1 when value is below range', () => {
    expect(clampPage(0, 10)).toBe(1);
  });

  it('returns pagesCount when value is above range', () => {
    expect(clampPage(11, 10)).toBe(10);
  });

  it('returns value when it is within range', () => {
    expect(clampPage(6, 10)).toBe(6);
  });

  it('returns 1 when pagesCount is 0', () => {
    expect(clampPage(3, 0)).toBe(1);
  });
});

describe('getPagesToDisplay', () => {
  it('returns correct pages when active page is at the beginning', () => {
    const result = getPagesToDisplay(1, 10);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 10]);
  });

  it('returns correct pages when active page is at the end', () => {
    const result = getPagesToDisplay(10, 10);
    expect(result).toEqual([1, 5, 6, 7, 8, 9, 10]);
  });

  it('returns correct pages when active page is in the middle', () => {
    const result = getPagesToDisplay(5, 10);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 10]);
  });

  it('returns all pages when pagesCount is less than or equal to 7', () => {
    const result = getPagesToDisplay(2, 7);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns all pages when pagesCount is less than or equal to maxVisiblePages argument', () => {
    const result = getPagesToDisplay(2, 8, 8);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('collapses pages when pagesCount exceeds maxVisiblePages argument', () => {
    const result = getPagesToDisplay(2, 8, 5);
    expect(result).toEqual([1, 2, 3, 4, 8]);
  });

  it('changes visible pages count based on maxVisiblePages', () => {
    const result = getPagesToDisplay(5, 20, 9);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 20]);
  });

  it('supports maxVisiblePages lower than 5', () => {
    const result = getPagesToDisplay(5, 10, 4);
    expect(result).toEqual([1, 4, 5, 10]);
  });

  it('supports maxVisiblePages equal to 2', () => {
    const result = getPagesToDisplay(5, 10, 2);
    expect(result).toEqual([5, 6]);
  });

  it('supports maxVisiblePages equal to 1', () => {
    const result = getPagesToDisplay(5, 10, 1);
    expect(result).toEqual([5]);
  });

  it('returns undefined when pagesCount is 0', () => {
    const result = getPagesToDisplay(0, 0);
    expect(result).toBeUndefined();
  });
});
