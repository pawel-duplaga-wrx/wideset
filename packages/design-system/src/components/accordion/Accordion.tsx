import * as RadixAccordion from '@radix-ui/react-accordion';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { AccordionContext } from './Accordion.context';
import type { AccordionProps, AccordionWithSubComponents } from './Accordion.types';
import { AccordionCaption } from './AccordionCaption';
import { AccordionContent } from './AccordionContent';
import { AccordionIcon } from './AccordionIcon';
import { AccordionItem } from './AccordionItem';
import { AccordionTitle } from './AccordionTitle';
import { AccordionTrigger } from './AccordionTrigger';

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, contained, defaultMotion, ...props }, ref) => {
    const motion = useDefaultMotion(defaultMotion);

    return (
      <AccordionContext.Provider value={{ contained, motion }}>
        <RadixAccordion.Root
          ref={ref}
          className={cn('w-full', contained && 'space-y-ws-5', className)}
          data-slot="accordion"
          {...props}
        >
          {children}
        </RadixAccordion.Root>
      </AccordionContext.Provider>
    );
  },
) as AccordionWithSubComponents;

Accordion.displayName = 'Accordion';
Accordion.Item = AccordionItem;
Accordion.Content = AccordionContent;
Accordion.Trigger = AccordionTrigger;
Accordion.Title = AccordionTitle;
Accordion.Caption = AccordionCaption;
Accordion.Icon = AccordionIcon;

export { Accordion };
