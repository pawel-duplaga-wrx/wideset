import { Slot, Slottable } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { Button } from './Button';
import { ButtonContext } from './Button.context';
import { ButtonIcon } from './ButtonIcon';
import type { IconButtonWithSubComponents } from './IconButton.types';
import { iconButtonMotionVariants, iconButtonVariants } from './IconButton.variants';

const IconButton = React.forwardRef(
  (
    {
      className,
      children,
      iconClassName,
      type = 'button' as const,
      preset,
      variant,
      size,
      asChild = false,
      defaultMotion,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const motion = useDefaultMotion(defaultMotion);

    return (
      <ButtonContext.Provider value={{ size, preset }}>
        <Comp
          className={cn(
            iconButtonVariants({ preset, size, variant }),
            iconButtonMotionVariants({ enabled: motion }),
            className,
          )}
          ref={ref}
          type={asChild ? undefined : type}
          data-slot="icon-button"
          {...props}
        >
          {children ? <Slottable>{children}</Slottable> : null}
          <Button.Icon icon={Icon} className={iconClassName} />
        </Comp>
      </ButtonContext.Provider>
    );
  },
) as IconButtonWithSubComponents;

IconButton.displayName = 'IconButton';
export const IconButtonIcon = ButtonIcon;
IconButton.Icon = IconButtonIcon;

export { IconButton };
