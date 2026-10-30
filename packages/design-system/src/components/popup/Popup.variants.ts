import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

export const popupContainerClassName = cn(
  'rounded-ws-container-lg flex w-[492px] flex-col',
  'bg-ws-static-overlay',
  'shadow-ws-high',
  'z-ws-popout',
  'outline-hidden',
);

export const popupContainerMotionVariants = cva('', {
  variants: {
    enabled: {
      true: cn(
        'origin-radix-popover',
        'transition-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:ws-slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-ws-2',
        'data-[side=right]:ws-slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-ws-2',
        'ease-(--ws-motion-ease-smooth-out) data-[state=open]:duration-(--ws-motion-duration-fast)',
        'data-[state=closed]:duration-(--ws-motion-duration-quick)',
      ),
      false: '',
    },
  },
  defaultVariants: { enabled: true },
});
