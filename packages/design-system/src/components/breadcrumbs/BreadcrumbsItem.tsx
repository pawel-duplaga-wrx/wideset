import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { BreadcrumbsItemProps } from './Breadcrumbs.types';
import { breadcrumbsItemMotionVariants } from './Breadcrumbs.variants';

/**
 * Figma wraps the crumb's text in a `Page Label Container` frame with `Gap/2` (2px)
 * of horizontal padding, while the prefix/suffix icons sit flush. Text children are
 * wrapped here to reproduce that inset; elements are passed through untouched.
 */
const withLabelInset = (children: React.ReactNode) =>
  React.Children.map(children, (child) =>
    typeof child === 'string' || typeof child === 'number' ? (
      <span className="px-ws-2">{child}</span>
    ) : (
      child
    ),
  );

const BreadcrumbsItem = React.forwardRef<HTMLButtonElement, BreadcrumbsItemProps>(
  ({ children, className, asChild = false, defaultMotion, ...props }, ref) => {
    const motion = useDefaultMotion(defaultMotion);
    const composedItemClassName = cn(
      'outline-ws-dynamic-primary-strong-default typography-caption-md h-ws-forms-sm min-h-ws-forms-sm rounded-ws-control-lg bg-ws-dynamic-secondary-alpha-default text-ws-static-subtle gap-ws-3 px-ws-5 flex items-center',
      props['aria-disabled'] === true
        ? 'text-ws-static-base wds-disabled'
        : 'focus-visible:wds-focus-visible hover:bg-ws-dynamic-secondary-alpha-hover focus-visible:bg-ws-dynamic-secondary-alpha-hover active:bg-ws-dynamic-secondary-alpha-pressed cursor-pointer',
      breadcrumbsItemMotionVariants({ enabled: motion }),
      className,
    );

    const compProps = {
      'data-slot': 'breadcrumbs-item',
      className: composedItemClassName,
      ...props,
      tabIndex: props['aria-disabled'] === true ? -1 : (props.tabIndex ?? 0),
    };

    return asChild ? (
      <Slot ref={ref as React.Ref<HTMLElement>} {...compProps}>
        {children}
      </Slot>
    ) : (
      <button ref={ref} type="button" {...compProps}>
        {withLabelInset(children)}
      </button>
    );
  },
);

BreadcrumbsItem.displayName = 'Breadcrumbs.Item';

export { BreadcrumbsItem };
