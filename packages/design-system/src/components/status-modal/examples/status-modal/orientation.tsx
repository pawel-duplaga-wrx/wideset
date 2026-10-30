/**
 * `horizontal` puts the icon above a left-aligned title and right-aligns the actions under a
 * divider: the compact layout for most dialogs. `vertical` centres the icon, text and actions,
 * for a moment that deserves more weight, such as a finished payment or a failed import. Set it
 * once on `StatusModal`; every part follows.
 */
import { Button, StatusModal } from '@wideset/react';

export default function StatusModalOrientation() {
  return (
    <div className="gap-ws-6 flex flex-wrap">
      {(['horizontal', 'vertical'] as const).map((orientation) => (
        <StatusModal key={orientation} status="positive" orientation={orientation}>
          <StatusModal.Trigger asChild>
            <Button variant="secondary" preset="border">
              {orientation === 'horizontal' ? 'Horizontal' : 'Vertical'}
            </Button>
          </StatusModal.Trigger>
          <StatusModal.Content>
            <StatusModal.Title>Payment successful</StatusModal.Title>
            <StatusModal.Body>
              Your subscription is active. You now have access to every premium feature.
            </StatusModal.Body>
            <StatusModal.Footer>
              <StatusModal.Close asChild>
                <Button size="sm" variant="secondary" preset="border">
                  Close
                </Button>
              </StatusModal.Close>
              <StatusModal.Close asChild>
                <Button size="sm" preset="border">
                  Get started
                </Button>
              </StatusModal.Close>
            </StatusModal.Footer>
          </StatusModal.Content>
        </StatusModal>
      ))}
    </div>
  );
}
