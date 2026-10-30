import type * as RadixAccordion from '@radix-ui/react-accordion';
import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, HTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { RemixiconProps } from '../../types/icon.types';
import type { accordionTriggerVariants } from './Accordion.variants';
import type { AccordionCaption } from './AccordionCaption';
import type { AccordionContent } from './AccordionContent';
import type { AccordionIcon } from './AccordionIcon';
import type { AccordionItem } from './AccordionItem';
import type { AccordionTitle } from './AccordionTitle';
import type { AccordionTrigger } from './AccordionTrigger';

/** Visual options shared by the accordion root and its items. */
type CommonProps = {
  /**
   * Whether the accordion items are contained in separate cards.
   *
   * - `true` — each item wrapped in a bordered card
   * - `false` | undefined — items separated by dividers only
   */
  contained?: VariantProps<typeof accordionTriggerVariants>['contained'];
};

export type AccordionContextType = CommonProps & { motion: boolean };

/** An individual item within `Accordion`. */
export type AccordionItemProps = ComponentProps<typeof RadixAccordion.Item>;

/** The control that opens or toggles the associated content. */
export type AccordionTriggerProps = ComponentProps<typeof RadixAccordion.Trigger>;

/** The content surface rendered within `Accordion`. */
export type AccordionContentProps = ComponentProps<typeof RadixAccordion.Content>;

/** Props for `Accordion.Title` — the trigger's main text. */
export type AccordionTitleProps = HTMLAttributes<HTMLDivElement>;

/** Props for `Accordion.Caption` — secondary text rendered under the title. */
export type AccordionCaptionProps = HTMLAttributes<HTMLDivElement>;

/** An icon rendered within `Accordion`. */
export type AccordionIconProps = RemixiconProps & {
  /**
   * The Icon that will be used within the accordion trigger
   */
  icon: RemixiconComponentType;
};

/** Collapsible sections with single or multiple expanded items. */
export type AccordionProps = ComponentProps<typeof RadixAccordion.Root> & CommonProps & MotionProps;

export type AccordionWithSubComponents = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<AccordionProps> & React.RefAttributes<HTMLDivElement>
> & {
  displayName?: string;
  Item: typeof AccordionItem;
  Content: typeof AccordionContent;
  Trigger: typeof AccordionTrigger;
  Title: typeof AccordionTitle;
  Caption: typeof AccordionCaption;
  Icon: typeof AccordionIcon;
};
