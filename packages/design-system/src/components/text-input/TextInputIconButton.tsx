import { cn } from 'src/lib/utils';

import { IconButton } from '../button/IconButton';
import { useTextInputContext } from './TextInput.context';
import type { TextInputIconButtonProps } from './TextInput.types';

/**
 * Figma sizes an in-field icon button one step below the field it sits in:
 * `Components/Forms/XSmall` (24) inside a Small field, `Forms/Small` (32) inside
 * both Medium and Large. That mapping also lands the radius Figma asks for —
 * `Control/md` at xs, `Control/lg` at sm.
 */
const ICON_BUTTON_SIZE = { sm: 'xs', md: 'sm', lg: 'sm' } as const;

export const TextInputIconButton = ({
  onClick,
  className,
  defaultMotion,
  ...props
}: TextInputIconButtonProps) => {
  const { size, motion } = useTextInputContext();

  return (
    <IconButton
      data-slot="text-input-icon-button"
      preset="ghost"
      variant="secondary"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      className={cn(className)}
      defaultMotion={defaultMotion ?? motion}
      {...props}
      size={ICON_BUTTON_SIZE[size ?? 'md']}
    />
  );
};

TextInputIconButton.displayName = 'TextInput.IconButton';
