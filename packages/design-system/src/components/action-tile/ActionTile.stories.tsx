import { RiArrowRightLine, RiBugLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { ActionTile } from './ActionTile';
import IconsExample from './examples/action-tile/icons';
import iconsSource from './examples/action-tile/icons?raw';
import StatesExample from './examples/action-tile/states';
import statesSource from './examples/action-tile/states?raw';
import VariantsExample from './examples/action-tile/variants';
import variantsSource from './examples/action-tile/variants?raw';

const meta = {
  title: 'Components/Tile/ActionTile',
  tags: ['autodocs'],
  component: ActionTile,
  subcomponents: {
    'ActionTile.Entity': ActionTile.Entity,

    'ActionTile.Icon': ActionTile.Icon,
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `ActionTile is a tile-shaped entry point to an action or a destination: an entity badge, a title and description, and a trailing arrow. Use it for navigation lists and setup steps. For a tile that only presents information, or one used for selection, use Tile.

The whole tile is the control and the trailing arrow is decoration, so there is no nested button to tab into. The arrow is hidden when the tile is disabled, matching Figma.

The rendered element follows what you pass: \`href\` gives an \`<a>\`, a click handler gives a \`<button>\`, and neither gives a plain \`div\`, because a decorative tile is not a tab stop that does nothing.

**Composition:**
\`\`\`jsx
// action
<ActionTile
  entity={IconBug}
  icon={IconArrowRight}
  title="Title"
  description="Description"
  onClick={openIssue}
/>

// destination
<ActionTile title="Settings" href="/settings" icon={IconArrowRight} />

// router link
<ActionTile asChild>
  <Link to="/settings">…</Link>
</ActionTile>
\`\`\``,
      },
    },
  },
  argTypes: {
    ref: { control: false, table: { disable: true } },
    defaultMotion: {
      control: 'boolean',
      description:
        "Turns the component's built-in animations on or off. When omitted, inherits the value from the nearest `MotionProvider`.",
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description:
        'Native button type used for form behavior. Setting type alone renders a button. Unavailable when href is provided.',
      table: { category: 'Behavior', type: { summary: "'button' | 'submit' | 'reset'" } },
    },
    children: {
      description:
        'Additional tile content, or the element receiving tile styling when asChild is enabled.',
      control: false,
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    title: {
      description: 'The title text of the tile.',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    description: {
      description: 'The description text of the tile.',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    entity: {
      description: 'Leading entity badge icon.',
      control: false,
      table: { category: 'Content', type: { summary: 'RemixiconComponentType' } },
    },
    icon: {
      description:
        'Trailing arrow. Decorative: the whole tile is the control. Hidden when disabled.',
      control: false,
      table: { category: 'Content', type: { summary: 'RemixiconComponentType' } },
    },
    variant: {
      control: 'radio',
      options: ['border', 'filled'],
      description: 'The visual variant of the tile.',
      table: {
        category: 'Appearance',
        type: { summary: "'border' | 'filled'" },
        defaultValue: { summary: "'border'" },
      },
    },
    disabled: {
      description: 'Disables the tile. Native `disabled` on `<button>`, `aria-disabled` otherwise.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      description: 'Destination URL. Creates a link; omit for a button or static tile.',
      control: 'text',
      table: { category: 'Behavior', type: { summary: 'string' } },
    },
    asChild: {
      description:
        'Renders the tile styling onto the child element via Radix Slot (e.g. a router `<Link>`).',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description:
        'Called when the tile is activated. The event element follows the button or link branch.',
      table: { category: 'Events', type: { summary: '(event: MouseEvent) => void' } },
    },
    className: {
      description: 'Additional CSS classes merged with the rendered element.',
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof ActionTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  args: {
    className: 'w-80',
    title: 'Title',
    description: 'Description',
    entity: RiBugLine,
    icon: RiArrowRightLine,
    variant: 'border',
    disabled: false,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const Elements: Story = {
  render: () => (
    <div className="gap-ws-5 flex w-full flex-col items-center">
      <ActionTile
        className="w-80"
        description="Renders a <button>"
        entity={RiBugLine}
        icon={RiArrowRightLine}
        onClick={() => alert('clicked')}
        title="With onClick"
      />
      <ActionTile
        className="w-80"
        description="Renders an <a href>"
        entity={RiBugLine}
        href="#action-tile-link"
        icon={RiArrowRightLine}
        title="With href"
      />
      <ActionTile
        className="w-80"
        description="Renders a <div>, no tab stop"
        entity={RiBugLine}
        icon={RiArrowRightLine}
        title="Decorative"
      />
      <ActionTile
        className="w-80"
        description="Arrow is hidden, as in Figma"
        disabled
        entity={RiBugLine}
        icon={RiArrowRightLine}
        onClick={() => alert('clicked')}
        title="Disabled"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The rendered element follows the props: `href` → `<a>`, click handler → `<button>`, neither → `<div>`. Tab through these to see that only the first two are focusable.',
      },
      source: {
        code: `// button
<ActionTile title="With onClick" entity={IconBug} icon={IconArrowRight} onClick={openIssue} />

// a href
<ActionTile title="With href" entity={IconBug} icon={IconArrowRight} href="/settings" />

// div, no tab stop
<ActionTile title="Decorative" entity={IconBug} icon={IconArrowRight} />

// disabled, arrow hidden
<ActionTile title="Disabled" entity={IconBug} icon={IconArrowRight} onClick={openIssue} disabled />`,
      },
    },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  render: () => (
    <div className="flex w-full items-center justify-center">
      <ActionTile className="w-80" onClick={() => alert('clicked')}>
        <ActionTile.Entity icon={RiBugLine} />
        <div className="gap-ws-3 flex flex-1 flex-col">
          <ActionTile.Title>Title</ActionTile.Title>
          <ActionTile.Description>Description</ActionTile.Description>
        </div>
        <ActionTile.Icon className="ml-auto" icon={RiArrowRightLine} />
      </ActionTile>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compose the content by hand with `ActionTile.Entity`, `ActionTile.Title`, `ActionTile.Description` and `ActionTile.Icon` when the shorthand props are not enough.',
      },
      source: {
        code: `<ActionTile onClick={openIssue}>
  <ActionTile.Entity icon={IconBug} />
  <div className="flex flex-1 flex-col gap-ws-3">
    <ActionTile.Title>Title</ActionTile.Title>
    <ActionTile.Description>Description</ActionTile.Description>
  </div>
  <ActionTile.Icon className="ml-auto" icon={IconArrowRight} />
</ActionTile>`,
      },
    },
  },
};
