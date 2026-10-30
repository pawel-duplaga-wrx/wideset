import { cn } from 'src/lib/utils';

import { Button } from '../button/Button';
import { useTextInputContext } from './TextInput.context';
import type { TextInputButtonProps } from './TextInput.types';

/** Negative inline margin that cancels each Button size's own `px-*`. */
const BUTTON_PADDING_RESET = { sm: '-mx-ws-6', md: '-mx-ws-7', lg: '-mx-ws-9' } as const;

export const TextInputButton = ({
  onClick,
  className,
  defaultMotion,
  ...props
}: TextInputButtonProps) => {
  const { size, motion } = useTextInputContext();

  return (
    <Button
      data-slot="text-input-button"
      preset="ghost"
      variant="secondary"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      // Figma's `Type=Text` affix is bare text inset by the affix padding alone
      // (Gap/7 at every size). A ghost Button brings its own px, so cancel it
      // exactly and let the affix own the visible inset.
      className={cn(BUTTON_PADDING_RESET[size ?? 'md'], className)}
      defaultMotion={defaultMotion ?? motion}
      {...props}
      size={size}
    />
  );
};

TextInputButton.displayName = 'TextInput.Button';
