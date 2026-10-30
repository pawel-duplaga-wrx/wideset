import type { MotionProps } from '../../motion/Motion.types';
import type { BreadcrumbsDivider } from './BreadcrumbsDivider';
import type { BreadcrumbsItem } from './BreadcrumbsItem';

/** Navigation showing the current location in a hierarchy. */
export type BreadcrumbsProps = React.HTMLAttributes<HTMLElement> & {
  /** The separator rendered automatically between items. Omit to place `Breadcrumbs.Divider` manually. */
  separator?: 'slash' | 'arrow';
};

/** An individual item within `Breadcrumbs`. */
export type BreadcrumbsItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    /** Merges props onto the child element instead of rendering a `<button>`. */
    asChild?: boolean;
  };

/** A separator between neighboring items. */
export type BreadcrumbsDividerProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Predefined separator icon to render. Ignored when `children` are provided. */
  separator?: BreadcrumbsProps['separator'];
};

export type BreadcrumbsWithSubComponents = React.ForwardRefExoticComponent<
  BreadcrumbsProps & React.RefAttributes<HTMLElement>
> & {
  Item: typeof BreadcrumbsItem;
  Divider: typeof BreadcrumbsDivider;
};
