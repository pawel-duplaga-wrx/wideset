/** `Accordion.Icon` goes first inside the trigger, before the label. It is hidden from screen readers, so the label alone names the section. Give every section an icon or none, so the labels stay aligned. */
import { RiArrowGoBackLine, RiShieldCheckLine, RiTruckLine } from '@remixicon/react';
import { Accordion } from '@wideset/react';

const sections = [
  {
    value: 'shipping',
    icon: RiTruckLine,
    title: 'Shipping',
    body: 'Orders leave the warehouse within two business days.',
  },
  {
    value: 'returns',
    icon: RiArrowGoBackLine,
    title: 'Returns',
    body: 'Send anything back within 30 days, free of charge.',
  },
  {
    value: 'warranty',
    icon: RiShieldCheckLine,
    title: 'Warranty',
    body: 'Every device we sell is covered for two years.',
  },
];

export default function AccordionIcons() {
  return (
    <div className="w-[22rem] max-w-full">
      <Accordion type="single" collapsible defaultValue="shipping">
        {sections.map((section) => (
          <Accordion.Item key={section.value} value={section.value}>
            <Accordion.Trigger>
              <Accordion.Icon icon={section.icon} />
              {section.title}
            </Accordion.Trigger>
            <Accordion.Content>{section.body}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
