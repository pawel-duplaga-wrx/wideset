/**
 * `size` on `Sidepanel.Panel` caps its width: `sm` (560px) for details and short forms, `md`
 * (704px) for longer forms, `lg` (960px) for tables or side-by-side content. On a narrow screen
 * the panel takes the full width at every size. Pick the smallest size that fits the content.
 */
import { Button, Sidepanel } from '@wideset/react';

const sizes = [
  { size: 'sm', label: 'Small', title: 'Order #4821' },
  { size: 'md', label: 'Medium', title: 'Edit shipping address' },
  { size: 'lg', label: 'Large', title: 'Order history' },
] as const;

export default function SidepanelSizes() {
  return (
    <div className="gap-ws-6 flex flex-wrap">
      {sizes.map(({ size, label, title }) => (
        <Sidepanel key={size}>
          <Sidepanel.Trigger asChild>
            <Button variant="secondary" preset="border">
              {label}
            </Button>
          </Sidepanel.Trigger>
          <Sidepanel.Panel size={size}>
            <Sidepanel.Header>
              <Sidepanel.Title>{title}</Sidepanel.Title>
            </Sidepanel.Header>
            <Sidepanel.Content>
              <p className="typography-body-md text-ws-static-base">
                Placed on 12 October. Two items, paid by card, shipping to Warsaw.
              </p>
            </Sidepanel.Content>
            <Sidepanel.Footer>
              <Sidepanel.Close asChild>
                <Button variant="secondary" preset="border">
                  Close
                </Button>
              </Sidepanel.Close>
            </Sidepanel.Footer>
          </Sidepanel.Panel>
        </Sidepanel>
      ))}
    </div>
  );
}
