import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { ButtonTruncatedText } from './ButtonTruncatedText';
import type { LinkButtonWithSubComponents } from './LinkButton.types';
import { linkButtonMotionVariants, linkButtonVariants } from './LinkButton.variants';

const LinkButton = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      underlined,
      asChild = false,
      defaultMotion,
      children,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'a';
    const motion = useDefaultMotion(defaultMotion);

    return (
      <Comp
        className={cn(
          linkButtonVariants({ size, variant, underlined }),
          linkButtonMotionVariants({ enabled: motion }),
          className,
        )}
        ref={ref}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-slot="link-button"
        {...props}
        onClickCapture={
          disabled
            ? (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                event.stopPropagation();
              }
            : props.onClickCapture
        }
        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {children}
      </Comp>
    );
  },
) as LinkButtonWithSubComponents;

LinkButton.displayName = 'LinkButton';
export const LinkButtonTruncatedText = ButtonTruncatedText;
LinkButton.TruncatedText = LinkButtonTruncatedText;

export { LinkButton };
