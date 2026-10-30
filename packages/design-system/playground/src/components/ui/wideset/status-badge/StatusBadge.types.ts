import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';

import type { statusBadgeVariants } from './StatusBadge.variants';
import type { StatusBadgeIcon } from './StatusBadgeIcon';
import type { StatusBadgeLabel } from './StatusBadgeLabel';

/** A compact status label with optional icon. */
export type StatusBadgeProps = {
  /** The content of the badge. */
  children?: React.ReactNode;
  /** Additional CSS classes to apply to the badge. */
  className?: string;
} & Omit<React.ComponentProps<'div'>, 'color'> &
  VariantProps<typeof statusBadgeVariants>;

/** An icon rendered within `StatusBadge`. */
export type StatusBadgeIconProps = {
  /** Additional CSS classes to apply to the badge. */
  className?: string;
  /** Icon component from `@remixicon/react`. */
  icon: RemixiconComponentType;
};

/** Props for `StatusBadge.Label`. */
export type StatusBadgeLabelProps = React.HTMLAttributes<HTMLDivElement>;

export type StatusBadgeContextType = {
  size: VariantProps<typeof statusBadgeVariants>['size'];
};

export type StatusBadgeWithSubComponents = React.ForwardRefExoticComponent<
  StatusBadgeProps & React.RefAttributes<HTMLDivElement>
> & {
  Icon: typeof StatusBadgeIcon;
  Label: typeof StatusBadgeLabel;
};
