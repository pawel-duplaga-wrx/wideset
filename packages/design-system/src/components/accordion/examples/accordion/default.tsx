/** The playground's stage: three sections, the first one open, the root's props set from the rail (a single-open accordion, so `type` stays `single`). */
import { Accordion, type AccordionProps } from '@wideset/react';

export default function AccordionDefault(
  props: Omit<AccordionProps, 'type' | 'value' | 'defaultValue' | 'onValueChange' | 'collapsible'>,
) {
  return (
    <div className="w-[22rem] max-w-full">
      <Accordion {...props} type="single" collapsible defaultValue="shipping">
        <Accordion.Item value="shipping">
          <Accordion.Trigger>Shipping</Accordion.Trigger>
          <Accordion.Content>
            Orders leave the warehouse within two business days.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="returns">
          <Accordion.Trigger>Returns</Accordion.Trigger>
          <Accordion.Content>
            Send anything back within 30 days of delivery, free of charge.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="warranty">
          <Accordion.Trigger>Warranty</Accordion.Trigger>
          <Accordion.Content>Every device we sell is covered for two years.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
