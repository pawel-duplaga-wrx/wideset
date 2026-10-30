/** A caption answers the question before the section is opened: a delivery time, a price, a count. Keep it to one short line; anything longer belongs in the content. Title and caption both become part of the trigger's accessible name. */
import { Accordion } from '@wideset/react';

const sections = [
  { value: 'standard', title: 'Standard delivery', caption: '2–4 business days, free' },
  { value: 'express', title: 'Express delivery', caption: 'Next business day, €9' },
  { value: 'pickup', title: 'Pick up in store', caption: 'Ready in two hours, free' },
];

export default function AccordionCaptions() {
  return (
    <div className="w-[22rem] max-w-full">
      <Accordion type="single" collapsible defaultValue="standard">
        {sections.map((section) => (
          <Accordion.Item key={section.value} value={section.value}>
            <Accordion.Trigger>
              <div className="flex flex-col">
                <Accordion.Title>{section.title}</Accordion.Title>
                <Accordion.Caption>{section.caption}</Accordion.Caption>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>
              Tracking details arrive by email once the parcel ships.
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
