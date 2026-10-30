import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';

import type { MotionProps } from '../../motion/Motion.types';
import type { actionTileVariants } from './ActionTile.variants';

/** Shared content and behavior options. */
type ActionTileSharedProps = {
  /** Additional CSS classes merged with the rendered element. */
  className?: string;
  /** Renders the tile styling onto the child element via Radix Slot (e.g. a router `<Link>`). */
  asChild?: boolean;
  /** The title text of the tile. */
  title?: string;
  /** The description text of the tile. */
  description?: string;
  /** Leading entity badge icon. */
  entity?: RemixiconComponentType;
  /** Trailing arrow. Decorative: the whole tile is the control. Hidden when disabled. */
  icon?: RemixiconComponentType;
  /** Disables the tile. Native `disabled` on `<button>`, `aria-disabled` otherwise. */
  disabled?: boolean;
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLElement>;
} & MotionProps &
  Omit<VariantProps<typeof actionTileVariants>, 'isInteractive'>;

/**
 * Button path: no `href`. Renders a `<button>` when given `onClick`, `type` or
 * `asChild`, and a plain `div` when given none of those.
 */
type ActionTileAsButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  ActionTileSharedProps & {
    href?: never;
    /**
     * Native button type used for form behavior. Setting `type` alone renders a
     * `<button>`, so `type="submit"` works without an `onClick`.
     */
    type?: 'button' | 'submit' | 'reset';
  };

/**
 * Link path: `href` is required. Renders an `<a>`; native anchor attributes
 * (`target`, `rel`, `download`, …) are accepted, button `type` is not.
 */
type ActionTileAsLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> &
  ActionTileSharedProps & {
    /** Renders an `<a>` instead of a `<button>` and navigates on activation. */
    href: string;
    type?: never;
  };

/** A tile that performs an action or links to a destination. */
export type ActionTileProps = ActionTileAsButtonProps | ActionTileAsLinkProps;

/** The primary title text. */
export type TitleProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLParagraphElement>;
};

/** Supporting descriptive text. */
export type DescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLParagraphElement>;
};

// Both render a `div` wrapper around the icon, so the spread props are div
// attributes.
/** The square icon badge rendered by `ActionTile.Entity`. */
export type EntityProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Icon component from `@remixicon/react`. */
  icon: RemixiconComponentType;
};

/** An icon rendered within `ActionTile`. */
export type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Icon component from `@remixicon/react`. */
  icon: RemixiconComponentType;
};
