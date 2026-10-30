import * as RadixAccordion from '@radix-ui/react-accordion';
import React from 'react';
import { cn } from 'src/lib/utils';

import { useAccordionContext } from './Accordion.context';
import type { AccordionItemProps } from './Accordion.types';
import { AccordionItemContext } from './AccordionItem.context';

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, children, disabled, ...props }, ref) => {
    const { contained } = useAccordionContext();

    return (
      <AccordionItemContext.Provider value={{ disabled }}>
        <RadixAccordion.Item
          ref={ref}
          disabled={disabled}
          className={cn(
            'group/item border-ws-static-strong bg-ws-dynamic-secondary-alpha-default overflow-hidden',
            contained
              ? 'radix-disabled:border-ws-dynamic-secondary-disabled border'
              : // Figma's Focused variant carries no stroke at all — the focus ring replaces it.
                'border-b has-focus-visible:border-transparent',
            contained &&
              'hover:bg-ws-dynamic-secondary-alpha-hover has-active:bg-ws-dynamic-secondary-alpha-pressed rounded-ws-container-md',
            contained
              ? 'has-focus-visible:rounded-ws-container-md'
              : 'has-focus-visible:rounded-ws-container-sm',
            'has-focus-visible:outline-ws-dynamic-primary-strong-default has-focus-visible:wds-focus-visible',
            className,
          )}
          data-slot="accordion-item"
          {...props}
        >
          {children}
        </RadixAccordion.Item>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem };
