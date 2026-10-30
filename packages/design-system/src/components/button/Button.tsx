import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { ButtonContext } from './Button.context';
import type { ButtonWithSubComponents } from './Button.types';
import { buttonMotionVariants, buttonVariants } from './Button.variants';
import { ButtonIcon } from './ButtonIcon';
import { ButtonTruncatedText } from './ButtonTruncatedText';

/**
 * Figma wraps the Button's label in its own frame with a 2px horizontal inset
 * at every size, so text sits `padX + 2` from the edge and `gap + 2` from an
 * icon. Raw text children are wrapped to reproduce that; element children
 * (icons, `Button.TruncatedText`) pass through untouched so icon-to-edge
 * spacing stays exactly `padX`.
 *
 * Not applied under `asChild`: `React.Children.map` returns an array and
 * Radix's `Slot` requires exactly one element child. The consumer owns the
 * rendered element there anyway.
 */
const withLabelInset = (children: React.ReactNode): React.ReactNode =>
  React.Children.map(children, (child) =>
    typeof child === 'string' || typeof child === 'number' ? (
      <span className="px-ws-2">{child}</span>
    ) : (
      child
    ),
  );

const Button = React.forwardRef(
  (
    {
      className,
      type = 'button' as const,
      preset,
      variant,
      size,
      asChild = false,
      defaultMotion,
      children,
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
            buttonVariants({ preset, size, variant }),
            buttonMotionVariants({ enabled: motion }),
            className,
          )}
          ref={ref}
          type={asChild ? undefined : type}
          data-slot="button"
          {...props}
        >
          {asChild ? children : withLabelInset(children)}
        </Comp>
      </ButtonContext.Provider>
    );
  },
) as ButtonWithSubComponents;

Button.displayName = 'Button';
Button.Icon = ButtonIcon;
Button.TruncatedText = ButtonTruncatedText;

export { Button };
