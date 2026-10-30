import { RiBugLine, RiCloudLine, RiDatabase2Line } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import KindsExample from './examples/tile/kinds';
import kindsSource from './examples/tile/kinds?raw';
import StatesExample from './examples/tile/states';
import statesSource from './examples/tile/states?raw';
import { Tile } from './Tile';

const meta = {
  title: 'Components/Tile/Tile',
  tags: ['autodocs'],
  component: Tile,
  subcomponents: {
    'Tile.Checkbox': Tile.Checkbox,
    'Tile.Radio': Tile.Radio,
    'Tile.RadioGroup': Tile.RadioGroup,
    'Tile.Icon': Tile.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `Tile groups related information in a bordered container. Use it for a set of comparable options or summaries. For a single piece of content with rich hierarchy and several actions, use Card instead.

\`Tile\` itself is static: it renders a \`div\` with no role, no tab stop and no selection state. Figma calls this component set *Select Tile*, and in code the selection lives in \`Tile.Checkbox\` and \`Tile.Radio\`. Pick the component that matches what the tile *is*, so screen readers and the keyboard get the right contract:

| Component | Renders | Use for |
| --- | --- | --- |
| \`Tile\` | \`div\` | static content |
| \`Tile.Checkbox\` | \`role="checkbox"\` | multiple selection |
| \`Tile.Radio\` in \`Tile.RadioGroup\` | \`role="radio"\` / \`radiogroup\` | single selection |
| \`ActionTile\` | \`button\`, or \`a\` with \`href\` | performing an action or navigating |

**Composition:**
\`\`\`jsx
// static
<Tile icon={IconBug} title="Title" description="Description" />

// multiple selection: the whole tile is the checkbox
<Tile.Checkbox checked={on} onCheckedChange={setOn} title="Title">
  <Tile.Indicator />
</Tile.Checkbox>

// single selection: the group owns arrow keys and the tab stop
<Tile.RadioGroup label="Plan" value={value} onValueChange={setValue}>
  <Tile.Radio value="a" title="A"><Tile.Indicator /></Tile.Radio>
  <Tile.Radio value="b" title="B"><Tile.Indicator /></Tile.Radio>
</Tile.RadioGroup>

// hand-composed content
<Tile>
  <div className="flex flex-1 items-start gap-ws-3">
    <Tile.Icon icon={IconBug} />
    <div className="flex flex-1 flex-col gap-ws-3">
      <Tile.Title>Title</Tile.Title>
      <Tile.Description>Description</Tile.Description>
    </div>
  </div>
</Tile>
\`\`\`

\`Tile.Indicator\` is a **non-interactive** switch visual. Never put a real \`Switch\` or \`Checkbox\` inside a selectable tile. The tile root is already the control, and a control nested in a control is invalid HTML and an axe \`nested-interactive\` failure.`,
      },
    },
  },
  argTypes: {
    ref: { control: false, table: { disable: true } },
    title: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    icon: {
      control: false,
      table: { category: 'Content', type: { summary: 'RemixiconComponentType' } },
    },
    asChild: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
    children: {
      control: false,
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof Tile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // Storybook prints the raw CSF object for this one rather than generating JSX,
  // so the snippet is pinned by hand.
  parameters: {
    docs: {
      description: { story: 'Minimal example with editable controls.' },
      source: {
        code: `<Tile className="w-80" title="Title" description="Description" icon={IconBug} />`,
      },
    },
  },
  args: {
    className: 'w-80',
    title: 'Title',
    description: 'Description',
    icon: RiBugLine,
  },
};

export const Kinds: Story = exampleStory(KindsExample, kindsSource);

export const MultipleSelection: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['logs']);

    const toggle = (value: string, checked: boolean) =>
      setSelected((current) =>
        checked ? [...current, value] : current.filter((item) => item !== value),
      );

    return (
      <div className="gap-ws-5 flex w-full flex-col items-center">
        {[
          {
            value: 'logs',
            title: 'Logs',
            description: 'Application and access logs',
            icon: RiBugLine,
          },
          {
            value: 'metrics',
            title: 'Metrics',
            description: 'Latency and error rates',
            icon: RiCloudLine,
          },
          {
            value: 'traces',
            title: 'Traces',
            description: 'Distributed request traces',
            icon: RiDatabase2Line,
          },
        ].map((option) => (
          <Tile.Checkbox
            checked={selected.includes(option.value)}
            className="w-80"
            description={option.description}
            icon={option.icon}
            key={option.value}
            onCheckedChange={(checked) => toggle(option.value, checked === true)}
            title={option.title}
          >
            <Tile.Indicator />
          </Tile.Checkbox>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Each tile is its own checkbox: `role="checkbox"`, `aria-checked`, and Space toggles it. The indicator is decoration, and the tile is the control.',
      },
      source: {
        code: `<Tile.Checkbox
  title="Logs"
  description="Application and access logs"
  icon={IconBug}
  checked={checked}
  onCheckedChange={setChecked}
>
  <Tile.Indicator />
</Tile.Checkbox>`,
      },
    },
  },
};

export const SingleSelection: Story = {
  render: function Render() {
    const [plan, setPlan] = useState('starter');

    return (
      <div className="flex w-full justify-center">
        <Tile.RadioGroup className="w-80" label="Plan" onValueChange={setPlan} value={plan}>
          <Tile.Radio description="Up to 3 projects" title="Starter" value="starter">
            <Tile.Indicator />
          </Tile.Radio>
          <Tile.Radio description="Unlimited projects" title="Pro" value="pro">
            <Tile.Indicator />
          </Tile.Radio>
          <Tile.Radio description="Talk to sales" disabled title="Enterprise" value="enterprise">
            <Tile.Indicator />
          </Tile.Radio>
        </Tile.RadioGroup>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The group is a single tab stop; arrow keys move between tiles. That roving-focus behaviour is what a radio group gives you and a `role="button"` tile cannot.',
      },
      source: {
        code: `<Tile.RadioGroup label="Plan" value={plan} onValueChange={setPlan}>
  <Tile.Radio value="starter" title="Starter" description="Up to 3 projects">
    <Tile.Indicator />
  </Tile.Radio>
  <Tile.Radio value="pro" title="Pro" description="Unlimited projects">
    <Tile.Indicator />
  </Tile.Radio>
  <Tile.Radio value="enterprise" title="Enterprise" description="Talk to sales" disabled>
    <Tile.Indicator />
  </Tile.Radio>
</Tile.RadioGroup>`,
      },
    },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  render: () => (
    <div className="flex w-full justify-center">
      <Tile className="w-80">
        <div className="gap-ws-3 flex flex-1 items-start">
          <Tile.Icon icon={RiBugLine} />
          <div className="gap-ws-3 flex flex-1 flex-col">
            <Tile.Title>Title</Tile.Title>
            <Tile.Description>Description</Tile.Description>
          </div>
        </div>
      </Tile>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compose the content by hand with `Tile.Icon`, `Tile.Title` and `Tile.Description` when the `icon`/`title`/`description` props are not enough. The wrapper reproduces the content group Figma nests inside the tile frame: `gap-ws-3` between icon and text.',
      },
      source: {
        code: `<Tile>
  <div className="flex flex-1 items-start gap-ws-3">
    <Tile.Icon icon={IconBug} />
    <div className="flex flex-1 flex-col gap-ws-3">
      <Tile.Title>Title</Tile.Title>
      <Tile.Description>Description</Tile.Description>
    </div>
  </div>
</Tile>`,
      },
    },
  },
};
