import { RiBugLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { exampleStory } from '../../stories/example';
import { Card } from '../card/Card';
import { Button } from './Button';
import type { ButtonProps } from './Button.types';
import IconsExample from './examples/button/icons';
import iconsSource from './examples/button/icons?raw';
import PresetsExample from './examples/button/presets';
import presetsSource from './examples/button/presets?raw';
import SizesExample from './examples/button/sizes';
import sizesSource from './examples/button/sizes?raw';
import StatesExample from './examples/button/states';
import statesSource from './examples/button/states?raw';
import VariantsExample from './examples/button/variants';
import variantsSource from './examples/button/variants?raw';

const variants: ButtonProps['variant'][] = ['primary', 'secondary', 'danger', 'success', 'inverse'];

const presets: ButtonProps['preset'][] = ['filled', 'border', 'ghost'];

const sizes: ButtonProps['size'][] = ['xs', 'sm', 'md', 'lg'];

const meta = {
  title: 'Components/Button/Button',
  tags: ['autodocs'],
  component: Button,
  subcomponents: {
    'Button.Icon': Button.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `Button is the primary control for triggering an action, submitting data, or confirming a decision.

Use LinkButton when activation navigates to another page, and IconButton when an accessible icon alone is sufficient.`,
      },
    },
  },
  argTypes: {
    defaultMotion: {
      description:
        "Turns the component's built-in animations on or off. When omitted, inherits the value from the nearest `MotionProvider`.",
      control: 'boolean',
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    variant: {
      description: 'Visual variant that controls the semantic color treatment of the button.',
      options: variants,
      control: 'radio',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
        type: { summary: "'primary' | 'secondary' | 'danger' | 'success' | 'inverse'" },
      },
    },
    preset: {
      description: 'Visual preset that controls emphasis through fill, border, and text treatment.',
      options: presets,
      control: 'radio',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'filled' },
        type: { summary: "'filled' | 'border' | 'ghost'" },
      },
    },
    size: {
      description: 'Size of the button affecting spacing and hit area.',
      options: sizes,
      control: 'radio',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    children: {
      description: 'Button label or custom content rendered inside the root.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      description: 'Additional CSS classes merged with the button root.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Disables the button visually and functionally.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    type: {
      description: 'Native button type used for form behavior.',
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'button' },
        type: { summary: "'button' | 'submit' | 'reset'" },
      },
    },
    asChild: {
      description: 'Whether to render the button styling onto its child element via Radix Slot.',
      control: false,
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      description: 'Called when the user activates the button.',
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example with the default `primary`, `filled`, `md` configuration and active controls.',
      },
    },
  },
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
  args: {
    children: 'Save',
    variant: 'primary',
    preset: 'filled',
    size: 'md',
    disabled: false,
    type: 'button',
    asChild: false,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Stretch a button with `w-full` to fill a padded container such as a card. The button is border-box sized, so `w-full` includes its own padding and border and stays inside the container padding — no extra sizing classes needed.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <Card className="w-87.5">
      <Card.Header>
        <Card.Title>Delete workspace</Card.Title>
        <Card.Description>This action is permanent and cannot be undone.</Card.Description>
      </Card.Header>
      <Card.Content contentClassName="flex flex-col gap-ws-8">
        <Button {...args} variant="danger" className="w-full">
          Delete workspace
        </Button>
        <Button {...args} variant="secondary" preset="border" className="w-full">
          Cancel
        </Button>
      </Card.Content>
    </Card>
  ),
  args: Default.args,
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Common composition patterns: add an icon for quicker recognition, use `Button.TruncatedText` in constrained layouts, and use `asChild` when the action needs link semantics with button styling.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    asChild: { table: { disable: true } },
  },
  render: (args) => (
    <div
      className={
        args.variant === 'inverse'
          ? 'bg-ws-static-inverse-background gap-ws-12 p-ws-8 flex flex-col'
          : 'gap-ws-12 flex flex-col'
      }
    >
      <Button {...args}>
        <Button.Icon icon={RiBugLine} />
        Report issue
      </Button>
      <Button {...args} className="w-80">
        <Button.Icon icon={RiBugLine} />
        <Button.TruncatedText>
          Report an issue with a much longer title that should truncate cleanly
        </Button.TruncatedText>
      </Button>
      <Button {...args} asChild>
        <a href="https://example.com" onClick={(event) => event.preventDefault()}>
          Open details
        </a>
      </Button>
    </div>
  ),
  args: {
    ...Default.args,
    variant: 'success',
    preset: 'border',
  },
};
