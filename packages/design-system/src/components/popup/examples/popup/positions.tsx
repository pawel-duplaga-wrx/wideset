/**
 * `side` on `Popup.Container` picks the edge of the trigger the popup opens against, and
 * `sideOffset` sets the gap (8px by default). When the chosen side has no room, the popup flips
 * to the opposite one, so a popup near the bottom of the screen may still open upwards. Prefer
 * `bottom` and keep one side for every popup of the same kind.
 */
import { Button, Popup } from '@wideset/react';

const sides = [
  { side: 'top', label: 'Top' },
  { side: 'right', label: 'Right' },
  { side: 'bottom', label: 'Bottom' },
  { side: 'left', label: 'Left' },
] as const;

export default function PopupPositions() {
  return (
    <div className="gap-ws-6 flex flex-wrap justify-center">
      {sides.map(({ side, label }) => (
        <Popup key={side}>
          <Popup.Trigger asChild>
            <Button variant="secondary" preset="border">
              {label}
            </Button>
          </Popup.Trigger>
          <Popup.Container side={side} align="center" aria-label="Sync status">
            <Popup.Content>
              <Popup.Description>
                Last synced 5 minutes ago. Changes from other devices appear here automatically.
              </Popup.Description>
            </Popup.Content>
          </Popup.Container>
        </Popup>
      ))}
    </div>
  );
}
