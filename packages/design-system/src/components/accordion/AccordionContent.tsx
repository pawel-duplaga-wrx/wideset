import * as RadixAccordion from '@radix-ui/react-accordion';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useAccordionContext } from './Accordion.context';
import type { AccordionContentProps } from './Accordion.types';
import { accordionContentMotionVariants } from './Accordion.variants';

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { contained, motion } = useAccordionContext();

    return (
      <RadixAccordion.Content
        ref={ref}
        className={cn(
          'text-ws-static-subtle typography-body-md pb-ws-7',
          contained && 'px-ws-9 pb-ws-9',
          accordionContentMotionVariants({ enabled: motion }),
          className,
        )}
        data-slot="accordion-content"
        {...props}
      >
        {children}
      </RadixAccordion.Content>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';

export { AccordionContent };
