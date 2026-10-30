import { RiCloseLine } from '@remixicon/react';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { useArgs } from 'storybook/preview-api';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';
import PositionsExample from './examples/popup/positions';
import positionsSource from './examples/popup/positions?raw';
import SectionsExample from './examples/popup/sections';
import sectionsSource from './examples/popup/sections?raw';
import { Popup } from './Popup';
import type { PopupContainerProps } from './Popup.types';
import { PopupContainer } from './PopupContainer';
import { PopupContent } from './PopupContent';

type PopupStoryArgs = Pick<ComponentPropsWithoutRef<typeof Popup>, 'open' | 'onOpenChange'> &
  PopupContainerProps;

const argTypes = {
  open: {
    description: 'Controlled open state. Pair with onOpenChange to update it.',
    control: 'boolean',
    table: { category: 'Behavior', type: { summary: 'boolean' } },
  },
  onOpenChange: {
    description:
      'Called with the next open state when the trigger or a dismiss action is activated.',
    control: false,
    table: { category: 'Events', type: { summary: '(open: boolean) => void' } },
  },
  persistent: {
    description: 'Prevents closing the popup by clicking outside or pressing Escape.',
    control: 'boolean',
    table: {
      category: 'Behavior',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  align: {
    description: 'The preferred alignment of the popup against the trigger.',
    control: 'radio',
    options: ['start', 'center', 'end'],
    table: {
      category: 'Appearance',
      type: { summary: "'start' | 'center' | 'end'" },
      defaultValue: { summary: "'start'" },
    },
  },
  side: {
    description: 'The preferred side of the trigger to render against.',
    control: 'radio',
    options: ['top', 'right', 'bottom', 'left'],
    table: {
      category: 'Appearance',
      type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
      defaultValue: { summary: "'bottom'" },
    },
  },
  sideOffset: {
    description: 'Distance in pixels between the popup and the trigger.',
    control: { type: 'number', min: 0, max: 40, step: 1 },
    table: {
      category: 'Appearance',
      type: { summary: 'number' },
      defaultValue: { summary: '8' },
    },
  },
  portalContainer: {
    description: 'DOM element to portal the popup content into. Defaults to `document.body`.',
    control: false,
    table: {
      category: 'Behavior',
      type: { summary: 'HTMLElement | null' },
    },
  },
} satisfies ArgTypes<PopupStoryArgs>;

const meta = {
  title: 'Components/Popup',
  tags: ['autodocs'],
  component: Popup,
  subcomponents: {
    'Popup.Container': PopupContainer,
    'Popup.Content': PopupContent,
  },
  parameters: {
    docs: {
      description: {
        component: `Popup is an anchored overlay that appears relative to a trigger element. Use it for contextual actions, confirmations, or detail views that don't require full-page interruption.

Prefer \`Modal\` when the interaction requires full focus lock or a backdrop overlay.

**Composition:**
\`\`\`
<Popup>                    — root; controls open state
  <Popup.Trigger>          — element that opens the popup
  <Popup.Container>        — anchored surface; controls position and persistent mode
    <Popup.Header>         — top section; place title and optional close button here
      <Popup.Title>        — accessible heading
    <Popup.Content>        — scrollable body
      <Popup.Description>  — optional supporting text
    <Popup.Footer>         — action area (flex container)
  <Popup.Close>            — closes the popup when triggered
</Popup>
\`\`\``,
      },
    },
  },
  argTypes,
  render: (args: PopupStoryArgs) => <Popup open={args.open} onOpenChange={args.onOpenChange} />,
} satisfies Meta<typeof Popup>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyLayoutClassName = 'min-h-53 pb-64';

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground — click Open popup, then use the controls panel to change alignment, side, offset, and persistent mode.',
      },
    },
  },
  render: function Render({ open = false, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopupStoryArgs>();
    return (
      <div className={storyLayoutClassName}>
        <Popup
          open={open}
          onOpenChange={(nextOpen) => {
            updateArgs({ open: nextOpen });
            onOpenChange?.(nextOpen);
          }}
        >
          <Popup.Trigger asChild>
            <Button size="md">Open popup</Button>
          </Popup.Trigger>
          <Popup.Container {...args}>
            <Popup.Header>
              <div className="gap-ws-5 flex items-center justify-between">
                <Popup.Title>Popup Title</Popup.Title>
                <Popup.Close asChild>
                  <IconButton
                    aria-label="Close popup"
                    icon={RiCloseLine}
                    preset="border"
                    variant="secondary"
                    size="sm"
                    className="size-ws-forms-sm shrink-0 p-0"
                  />
                </Popup.Close>
              </div>
            </Popup.Header>
            <Popup.Content>
              <Popup.Description>Popup description text</Popup.Description>
            </Popup.Content>
            <Popup.Footer>
              <Popup.Close asChild>
                <Button variant="secondary" preset="border" size="sm">
                  Cancel
                </Button>
              </Popup.Close>
              <Popup.Close asChild>
                <Button preset="filled" size="sm">
                  Accept
                </Button>
              </Popup.Close>
            </Popup.Footer>
          </Popup.Container>
        </Popup>
      </div>
    );
  },
  args: {
    persistent: false,
    align: 'start',
    sideOffset: 8,
    side: 'bottom',
  },
};

export const Sections: Story = exampleStory(SectionsExample, sectionsSource);

export const Positions: Story = exampleStory(PositionsExample, positionsSource);

export const Header: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Popup with a header and content but no footer — suitable for read-only detail views or informational overlays that require no action.',
      },
    },
  },
  render: function Render({ open = false, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopupStoryArgs>();
    return (
      <div className={storyLayoutClassName}>
        <Popup
          open={open}
          onOpenChange={(nextOpen) => {
            updateArgs({ open: nextOpen });
            onOpenChange?.(nextOpen);
          }}
        >
          <Popup.Trigger asChild>
            <Button size="md">Open popup</Button>
          </Popup.Trigger>
          <Popup.Container {...args}>
            <Popup.Header>
              <div className="gap-ws-5 flex items-center justify-between">
                <Popup.Title>Popup Title</Popup.Title>
                <Popup.Close asChild>
                  <IconButton
                    aria-label="Close popup"
                    icon={RiCloseLine}
                    preset="border"
                    variant="secondary"
                    size="sm"
                    className="size-ws-forms-sm shrink-0 p-0"
                  />
                </Popup.Close>
              </div>
            </Popup.Header>
            <Popup.Content>
              <Popup.Description>Popup description text</Popup.Description>
            </Popup.Content>
          </Popup.Container>
        </Popup>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Popup with content and footer — use when the user needs to take an explicit action before closing.',
      },
    },
  },
  render: function Render({ open = false, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopupStoryArgs>();
    return (
      <div className={storyLayoutClassName}>
        <Popup
          open={open}
          onOpenChange={(nextOpen) => {
            updateArgs({ open: nextOpen });
            onOpenChange?.(nextOpen);
          }}
        >
          <Popup.Trigger asChild>
            <Button size="md">Open popup</Button>
          </Popup.Trigger>
          <Popup.Container {...args}>
            <Popup.Content>
              <Popup.Description>Popup description text</Popup.Description>
            </Popup.Content>
            <Popup.Footer>
              <Popup.Close asChild>
                <Button variant="secondary" preset="border" size="sm">
                  Cancel
                </Button>
              </Popup.Close>
              <Popup.Close asChild>
                <Button preset="filled" size="sm">
                  Accept
                </Button>
              </Popup.Close>
            </Popup.Footer>
          </Popup.Container>
        </Popup>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const Content: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal popup with only `Popup.Content` — no `Popup.Header` or `Popup.Footer`. No header separator is shown because no header is present.',
      },
    },
  },
  render: function Render({ open = false, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopupStoryArgs>();
    return (
      <div className={storyLayoutClassName}>
        <Popup
          open={open}
          onOpenChange={(nextOpen) => {
            updateArgs({ open: nextOpen });
            onOpenChange?.(nextOpen);
          }}
        >
          <Popup.Trigger asChild>
            <Button size="md">Open popup</Button>
          </Popup.Trigger>
          <Popup.Container {...args}>
            <Popup.Content>Simple content without header or footer.</Popup.Content>
          </Popup.Container>
        </Popup>
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A persistent popup ignores outside clicks and Escape key presses. Use when the user must take an explicit action — e.g. confirming a destructive operation — before the popup can be dismissed.',
      },
    },
  },
  render: function Render({ open = false, onOpenChange, ...args }) {
    const [, updateArgs] = useArgs<PopupStoryArgs>();
    return (
      <div className={storyLayoutClassName}>
        <Popup
          open={open}
          onOpenChange={(nextOpen) => {
            updateArgs({ open: nextOpen });
            onOpenChange?.(nextOpen);
          }}
        >
          <Popup.Trigger asChild>
            <Button size="md">Open persistent popup</Button>
          </Popup.Trigger>
          <Popup.Container {...args}>
            <Popup.Header>
              <Popup.Title>Persistent Popup</Popup.Title>
            </Popup.Header>
            <Popup.Content>Try clicking outside or pressing Escape.</Popup.Content>
            <Popup.Footer>
              <Popup.Close asChild>
                <Button preset="filled" size="sm">
                  Close
                </Button>
              </Popup.Close>
            </Popup.Footer>
          </Popup.Container>
        </Popup>
      </div>
    );
  },
  args: {
    ...Default.args,
    persistent: true,
  },
};
