import * as React from 'react';
import { cn } from 'src/lib/utils';

import { breadcrumbsDividersByType } from './Breadcrumbs.logic';
import type { BreadcrumbsDividerProps } from './Breadcrumbs.types';
import { breadcrumbsDividerVariants } from './Breadcrumbs.variants';

const BreadcrumbsDivider = React.forwardRef<HTMLDivElement, BreadcrumbsDividerProps>(
  ({ className, separator, children, ...props }, ref) => {
    if (!separator && !children) return null;
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(breadcrumbsDividerVariants({ separator }), className)}
        data-slot="breadcrumbs-divider"
        {...props}
      >
        {children ?? (separator ? breadcrumbsDividersByType[separator] : null)}
      </div>
    );
  },
);

BreadcrumbsDivider.displayName = 'Breadcrumbs.Divider';

export { BreadcrumbsDivider };
