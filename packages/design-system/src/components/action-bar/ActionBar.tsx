import { RiCloseLine } from '@remixicon/react';
import { forwardRef, useMemo } from 'react';

import { cn } from '../../lib/utils';
import { useDefaultMotion } from '../../motion/MotionProvider';
import { IconButton } from '../button/IconButton';
import type { ActionBarProps } from './ActionBar.types';
import { actionBarMotionVariants, actionBarVariants } from './ActionBar.variants';

export const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  (
    {
      amountSelected,
      isOpen,
      position,
      align,
      className,
      children,
      onClose,
      closeAriaLabel = 'Close',
      defaultMotion,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const hasAmountForLeading =
      amountSelected !== undefined &&
      (typeof amountSelected !== 'number' || !Number.isNaN(amountSelected));

    const hasLeading = Boolean(onClose || hasAmountForLeading);
    const hasActions = children != null;

    const amountSelectedLabel = useMemo(() => {
      if (amountSelected === undefined) {
        return undefined;
      }

      if (typeof amountSelected === 'number') {
        if (Number.isNaN(amountSelected)) {
          return undefined;
        }
        return `${amountSelected} selected`;
      }

      const [count, format] = amountSelected;
      return format(count);
    }, [amountSelected]);

    return (
      <div
        ref={ref}
        data-slot="action-bar"
        data-state={isOpen ? 'open' : 'closed'}
        aria-hidden={isOpen ? undefined : true}
        inert={isOpen ? undefined : true}
        className={cn(
          actionBarVariants({ position, align }),
          actionBarMotionVariants({ enabled: motion, position }),
          hasLeading && hasActions && 'gap-ws-19',
          className,
        )}
        {...props}
      >
        {hasLeading && (
          <div className="gap-ws-9 flex items-center">
            {onClose && (
              <IconButton
                preset="border"
                variant="secondary"
                size="sm"
                icon={RiCloseLine}
                onClick={onClose}
                aria-label={closeAriaLabel}
                defaultMotion={motion}
              />
            )}
            {amountSelectedLabel != null && (
              <span className="text-ws-static-base typography-label-strong-sm tracking-ws-tight-25 font-ws-medium whitespace-nowrap">
                {amountSelectedLabel}
              </span>
            )}
          </div>
        )}
        {hasActions && <div className="gap-ws-5 flex min-w-0 items-center">{children}</div>}
      </div>
    );
  },
);

ActionBar.displayName = 'ActionBar';
