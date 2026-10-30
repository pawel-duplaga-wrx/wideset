import * as RadixAccordion from '@radix-ui/react-accordion';
import { RiArrowDownSLine } from '@remixicon/react';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useAccordionContext } from './Accordion.context';
import type { AccordionTriggerProps } from './Accordion.types';
import { accordionChevronMotionVariants, accordionTriggerVariants } from './Accordion.variants';
import { useAccordionItemContext } from './AccordionItem.context';

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { contained, motion } = useAccordionContext();
    const { disabled } = useAccordionItemContext();

    return (
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ contained }), className)}
        aria-disabled={disabled || undefined}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <RiArrowDownSLine
          aria-hidden="true"
          className={cn(
            'text-ws-dynamic-on-secondary-default size-ws-11 ml-auto group-data-[state=open]/trigger:rotate-180',
            accordionChevronMotionVariants({ enabled: motion }),
          )}
        />
      </RadixAccordion.Trigger>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

export { AccordionTrigger };
