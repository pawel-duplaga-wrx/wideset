'use client';

import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/wideset/utils';

import { useButtonContext } from './Button.context';
import type { ButtonIconProps } from './Button.types';
import { buttonIconVariants } from './ButtonIcon.variants';

const ButtonIcon = ({ icon: Icon, className }: ButtonIconProps) => {
  const { size } = useButtonContext();

  return (
    <Slot
      data-slot="button-icon"
      className={cn(
        buttonIconVariants({
          size,
        }),
        className,
      )}
    >
      <Icon aria-hidden="true" focusable="false" />
    </Slot>
  );
};

ButtonIcon.displayName = 'Button.Icon';

export { ButtonIcon };
