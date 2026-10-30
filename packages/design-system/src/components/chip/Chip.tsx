import { forwardRef, type KeyboardEvent } from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { ChipContext } from './Chip.context';
import type { ChipProps, ChipWithSubComponents } from './Chip.types';
import { chipMotionVariants, chipVariants } from './Chip.variants';
import { ChipIcon } from './ChipIcon';

const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      size = 'md',
      variant = 'primary',
      style = 'filled',
      disabled,
      defaultMotion,
      children,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.target !== event.currentTarget) return;
      if (event.key === ' ') {
        event.preventDefault();
        return;
      }
      if (event.key === 'Enter' && !disabled) {
        event.preventDefault();
        event.currentTarget.click();
      }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyUp?.(event);
      if (event.defaultPrevented || event.target !== event.currentTarget) return;
      if (event.key === ' ' && !disabled) {
        event.currentTarget.click();
      }
    };

    return (
      <ChipContext.Provider value={{ size, variant, style }}>
        <div
          className={cn(
            chipVariants({ size, variant, style }),
            chipMotionVariants({ enabled: motion }),
            className,
          )}
          ref={ref}
          tabIndex={disabled ? -1 : 0}
          data-disabled={disabled || undefined}
          aria-disabled={disabled || undefined}
          role="button"
          data-slot="chip"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          {...props}
        >
          {children}
        </div>
      </ChipContext.Provider>
    );
  },
) as ChipWithSubComponents;

Chip.displayName = 'Chip';
Chip.Icon = ChipIcon;

export { Chip };
