import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import PresetsExample from './examples/search/presets';
import presetsSource from './examples/search/presets?raw';
import SizesExample from './examples/search/sizes';
import sizesSource from './examples/search/sizes?raw';
import StatesExample from './examples/search/states';
import statesSource from './examples/search/states?raw';
import VariantsExample from './examples/search/variants';
import variantsSource from './examples/search/variants?raw';
import { Search } from './Search';
import type { SearchProps } from './Search.types';

const presets: NonNullable<SearchProps['preset']>[] = ['border', 'ghost'];

const sizes: NonNullable<SearchProps['size']>[] = ['sm', 'md', 'lg'];

const variants: NonNullable<SearchProps['variant']>[] = ['primary', 'danger'];

const meta = {
  title: 'Components/Search',
  tags: ['autodocs'],
  component: Search,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Search is deprecated: compose a search field from \`TextInput\` instead, as in the TextInput Search example.

It is a thin wrapper over \`TextInput\` with a fixed leading search icon, \`type="search"\` on the input and a clear button, and adds no behaviour of its own. The same composition is \`TextInput.Prefix inner\` with \`TextInput.Icon\`, \`TextInput.Input type="search"\` and \`TextInput.ClearButton\` in \`TextInput.Suffix inner\`. Search stays exported until a future minor release removes it.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      description:
        'Layout and context classes for the outer container. Use variant, preset, and size for visual styling.',
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
    defaultMotion: {
      description:
        'Turns built-in animations on or off. Inherits from MotionProvider when omitted.',
      control: 'boolean',
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },

    onClear: { control: false, table: { category: 'Events' } },
    clearAriaLabel: { table: { category: 'Content', type: { summary: 'string' } } },
    variant: {
      description: 'Visual style variant.',
      control: 'radio',
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: "'primary' | 'danger'" },
        defaultValue: { summary: 'primary' },
      },
    },
    preset: {
      description: 'Visual preset of the input container.',
      control: 'radio',
      options: presets,
      table: {
        category: 'Appearance',
        type: { summary: "'border' | 'ghost'" },
        defaultValue: { summary: 'border' },
      },
    },
    size: {
      description: 'Size of the input.',
      control: 'radio',
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    showClearButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      description: 'Disables the input.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      description: 'Placeholder text for the input.',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example with the default preset and active controls for the main public props.',
      },
    },
  },
  args: {
    preset: 'border',
    size: 'md',
    variant: 'primary',
    placeholder: 'Search...',
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Filter a list with a controlled search field. Clearing the query restores all results.',
      },
    },
  },
  args: { ...Default.args, placeholder: 'Search projects', 'aria-label': 'Search projects' },
  render: function Render(args) {
    const [query, setQuery] = useState('');
    const projects = ['Design system', 'Website', 'Mobile app'];
    const results = projects.filter((project) =>
      project.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <div className="gap-ws-6 flex flex-col">
        <Search {...args} value={query} onChange={(event) => setQuery(event.target.value)} />
        <ul aria-label="Projects" aria-live="polite">
          {results.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
      </div>
    );
  },
};
