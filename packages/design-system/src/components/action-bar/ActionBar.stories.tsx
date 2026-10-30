import { RiDeleteBinLine, RiDownloadLine, RiMoreFill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';
import { ListItem } from '../list-item/ListItem';
import { ActionBar } from './ActionBar';
import type { ActionBarProps } from './ActionBar.types';
import AlignmentsExample from './examples/action-bar/alignments';
import alignmentsSource from './examples/action-bar/alignments?raw';
import PositionsExample from './examples/action-bar/positions';
import positionsSource from './examples/action-bar/positions?raw';

const positions: ActionBarProps['position'][] = ['bottom', 'top'];

const aligns: ActionBarProps['align'][] = ['left', 'center', 'right'];

const meta = {
  title: 'Components/ActionBar',
  tags: ['autodocs'],
  component: ActionBar,
  parameters: {
    docs: {
      description: {
        component: `ActionBar is a fixed floating toolbar that appears at the top or bottom of the screen, used to surface contextual actions when items are selected. Embedded buttons should be of size 'sm'.

Use a standard toolbar for actions that are always available without a selection.`,
      },
    },
  },
  argTypes: {
    closeAriaLabel: { table: { category: 'Content', type: { summary: 'string' } } },
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    position: {
      description: 'Vertical placement of the action bar on the screen.',
      control: 'radio',
      options: positions,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'bottom' },
        type: { summary: "'bottom' | 'top'" },
      },
    },
    align: {
      description: 'Horizontal alignment of the action bar on the screen.',
      control: 'radio',
      options: aligns,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'center' },
        type: { summary: "'left' | 'center' | 'right'" },
      },
    },
    amountSelected: {
      control: 'select',
      options: [undefined, 0, 1, 2, 5, 10, 500, 1000],
      table: {
        category: 'Content',
        type: { summary: 'number | undefined | readonly [number, (amount: number) => ReactNode]' },
      },
    },
    onClose: {
      control: false,
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    isOpen: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      description: 'Additional CSS classes to apply to the action bar.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof ActionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE_ITEMS = [
  { id: '1', name: 'Q1 Financial Report.pdf' },
  { id: '2', name: 'Product Roadmap 2026.docx' },
  { id: '3', name: 'Brand Guidelines v3.pdf' },
  { id: '4', name: 'User Research Summary.docx' },
  { id: '5', name: 'Engineering Spec — Auth.md' },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Open the bar with **Show action bar**; dismiss with the close control. Enter/leave motion matches Sidepanel (tailwindcss-animate `data-state` + slide/fade).',
      },
    },
  },
  render: (args) => (
    <div className="py-ws-20">
      <ActionBar {...args}>
        <>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Export
          </Button>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Download
          </Button>
          <Button preset="border" variant="danger" size="sm">
            <Button.Icon icon={RiDeleteBinLine} />
            Delete
          </Button>
          <IconButton
            preset="border"
            variant="secondary"
            size="sm"
            icon={RiMoreFill}
            aria-label="More options"
          />
        </>
      </ActionBar>
    </div>
  ),
  args: {
    position: 'bottom',
    align: 'center',
    amountSelected: 3,
    isOpen: true,
    onClose: fn(),
  },
};

export const Positions: Story = exampleStory(PositionsExample, positionsSource);

export const Alignments: Story = exampleStory(AlignmentsExample, alignmentsSource);

export const AmountSelected: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pass `amountSelected` as a number for default copy. Omit it to hide the label.',
      },
    },
  },
  argTypes: {
    position: { table: { disable: true } },
    amountSelected: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <>
      {[1, 42, undefined].map((amount) => (
        <div key={String(amount)} className="py-ws-20 pt-ws-14 relative w-full">
          <ActionBar {...args} amountSelected={amount} className="absolute" isOpen>
            <>
              <Button preset="border" variant="secondary" size="sm">
                <Button.Icon icon={RiDownloadLine} />
                Export
              </Button>
              <Button preset="border" variant="secondary" size="sm">
                <Button.Icon icon={RiDownloadLine} />
                Download
              </Button>
              <Button preset="border" variant="danger" size="sm">
                <Button.Icon icon={RiDeleteBinLine} />
                Delete
              </Button>
              <IconButton
                preset="border"
                variant="secondary"
                size="sm"
                icon={RiMoreFill}
                aria-label="More options"
              />
            </>
          </ActionBar>
        </div>
      ))}
    </>
  ),
  args: Default.args,
};

export const CustomAmountSelectedFormatter: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `[amount, (amount) => …]` when you need translations or wording other than “selected” (e.g. rows).',
      },
      source: {
        code: `
          <ActionBar amountSelected={[12, (n: number) => (n === 1 ? \`\${n} row\` : \`\${n} rows\`)]}>
              <>
    <Button preset="border" variant="secondary" size="sm">
      <Button.Icon icon={RiDownloadLine} />
      Export
    </Button>
    <Button preset="border" variant="secondary" size="sm">
      <Button.Icon icon={RiDownloadLine} />
      Download
    </Button>
    <Button preset="border" variant="danger" size="sm">
      <Button.Icon icon={RiDeleteBinLine} />
      Delete
    </Button>
    <IconButton
      preset="border"
      variant="secondary"
      size="sm"
      icon={RiMoreFill}
      aria-label="More options"
    />
  </>
          </ActionBar>
        `,
      },
    },
  },
  render: (args) => (
    <div className="py-ws-20 relative w-full">
      <ActionBar {...args} isOpen>
        <>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Export
          </Button>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Download
          </Button>
          <Button preset="border" variant="danger" size="sm">
            <Button.Icon icon={RiDeleteBinLine} />
            Delete
          </Button>
          <IconButton
            preset="border"
            variant="secondary"
            size="sm"
            icon={RiMoreFill}
            aria-label="More options"
          />
        </>
      </ActionBar>
    </div>
  ),
  args: {
    ...Default.args,
    amountSelected: [12, (n: number) => (n === 1 ? `${n} row` : `${n} rows`)],
  },
};

export const NoCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `onClose` is omitted, no close button is rendered — useful when dismissal is handled externally.',
      },
    },
  },
  render: (args) => (
    <div className="py-ws-20 relative w-full">
      <ActionBar {...args} isOpen>
        <>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Export
          </Button>
          <Button preset="border" variant="secondary" size="sm">
            <Button.Icon icon={RiDownloadLine} />
            Download
          </Button>
          <Button preset="border" variant="danger" size="sm">
            <Button.Icon icon={RiDeleteBinLine} />
            Delete
          </Button>
          <IconButton
            preset="border"
            variant="secondary"
            size="sm"
            icon={RiMoreFill}
            aria-label="More options"
          />
        </>
      </ActionBar>
    </div>
  ),
  args: {
    ...Default.args,
    onClose: undefined,
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Selecting rows opens the ActionBar; the count updates as more are toggled. Clicking the close button deselects everything and dismisses the bar.',
      },
    },
  },
  argTypes: {
    isOpen: { table: { disable: true } },
    amountSelected: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(args: Partial<ActionBarProps>) {
    const [selected, setSelected] = useState<Record<string, boolean>>({ '1': true });

    const toggle = (id: string) => setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

    const selectedCount = Object.values(selected).filter(Boolean).length;

    return (
      <div className="pb-ws-24">
        <div className="gap-ws-3 flex flex-col">
          {SAMPLE_ITEMS.map((item) => {
            const isSelected = !!selected[item.id];

            return (
              <ListItem
                key={item.id}
                data-state={isSelected ? 'checked' : 'unchecked'}
                onClick={() => toggle(item.id)}
                shouldDisplayCheckmark={false}
                className="rounded-none"
              >
                <ListItem.Prefix>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer"
                  />
                </ListItem.Prefix>
                <ListItem.Content>
                  <ListItem.Label>{item.name}</ListItem.Label>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </div>
        <ActionBar
          {...args}
          isOpen={selectedCount > 0}
          amountSelected={selectedCount}
          onClose={() => {
            setSelected({});
            args.onClose?.();
          }}
        >
          <>
            <Button preset="border" variant="secondary" size="sm">
              <Button.Icon icon={RiDownloadLine} />
              Export
            </Button>
            <Button preset="border" variant="secondary" size="sm">
              <Button.Icon icon={RiDownloadLine} />
              Download
            </Button>
            <Button preset="border" variant="danger" size="sm">
              <Button.Icon icon={RiDeleteBinLine} />
              Delete
            </Button>
            <IconButton
              preset="border"
              variant="secondary"
              size="sm"
              icon={RiMoreFill}
              aria-label="More options"
            />
          </>
        </ActionBar>
      </div>
    );
  },
  args: Default.args,
};
