import { cn } from 'src/lib/utils';

import type { AccordionIconProps } from './Accordion.types';

// Figma centres a 16px glyph (`Size/9`) inside a 20px `Entity` slot (`Size/11`),
// so the glyph sits 2px in from the slot on every side.
const AccordionIcon = ({ className, icon: Icon, ...props }: AccordionIconProps) => (
  <span
    data-slot="accordion-icon"
    aria-hidden="true"
    className="size-ws-11 flex shrink-0 items-center justify-center"
  >
    <Icon
      aria-hidden="true"
      className={cn(
        'text-ws-static-strong radix-disabled:text-ws-static-strong size-ws-9',
        className,
      )}
      {...props}
    />
  </span>
);

AccordionIcon.displayName = 'AccordionIcon';

export { AccordionIcon };
