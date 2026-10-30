/** `contained` turns each section into its own card with a border and a hover fill, so sections read as separate blocks. Use it when the accordion stands alone on a page or the sections are unrelated; keep the default dividers when it sits inside a card or a side panel that already frames it. */
import { Accordion } from '@wideset/react';

export default function AccordionContained() {
  return (
    <div className="gap-ws-11 grid w-full grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {[false, true].map((contained) => (
        <Accordion
          key={String(contained)}
          type="single"
          collapsible
          defaultValue="shipping"
          contained={contained}
        >
          <Accordion.Item value="shipping">
            <Accordion.Trigger>Shipping</Accordion.Trigger>
            <Accordion.Content>
              Orders leave the warehouse within two business days.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="returns">
            <Accordion.Trigger>Returns</Accordion.Trigger>
            <Accordion.Content>
              Send anything back within 30 days, free of charge.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="warranty">
            <Accordion.Trigger>Warranty</Accordion.Trigger>
            <Accordion.Content>Every device we sell is covered for two years.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
}
