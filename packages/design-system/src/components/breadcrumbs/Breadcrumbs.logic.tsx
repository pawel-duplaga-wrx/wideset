import { RiArrowRightSLine } from '@remixicon/react';
import React from 'react';

import type { BreadcrumbsProps } from './Breadcrumbs.types';
import { BreadcrumbsDivider } from './BreadcrumbsDivider';

export const breadcrumbsDividersByType = {
  slash: <span aria-hidden="true">/</span>,
  arrow: <RiArrowRightSLine aria-hidden="true" focusable="false" />,
};

const isDivider = (node: React.ReactNode): boolean =>
  React.isValidElement(node) && node.type === BreadcrumbsDivider;

const wrapInListItem = (node: React.ReactNode, key: React.Key) => (
  <li key={key} aria-hidden={isDivider(node) ? true : undefined}>
    {node}
  </li>
);

export const separateBreadcrumbsItems = (
  items: React.ReactNode[],
  separatorType?: BreadcrumbsProps['separator'],
) =>
  items.reduce((allElements: React.ReactNode[], current: React.ReactNode, index: number) => {
    const isLast = index === items.length - 1;

    allElements.push(
      wrapInListItem(
        isLast
          ? React.cloneElement(
              current as React.ReactElement<{
                'aria-disabled'?: boolean;
                'aria-current'?: string;
              }>,
              {
                'aria-current': 'page',
                'aria-disabled': true,
              },
            )
          : current,
        `item-${index}`,
      ),
    );

    if (!isLast && separatorType) {
      allElements.push(
        wrapInListItem(<BreadcrumbsDivider separator={separatorType} />, `separator-${index}`),
      );
    }

    return allElements;
  }, []);
