import { RiArrowRightSLine, RiDownloadLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Avatar } from '../avatar/Avatar';
import { Checkbox } from '../checkbox/Checkbox';
import { Switch } from '../switch/Switch';
import AffixesExample from './examples/list-item/affixes';
import affixesSource from './examples/list-item/affixes?raw';
import StatesExample from './examples/list-item/states';
import statesSource from './examples/list-item/states?raw';
import VariantsExample from './examples/list-item/variants';
import variantsSource from './examples/list-item/variants?raw';
import { ListItem } from './ListItem';
import type { ListItemProps } from './ListItem.types';

type ListItemStoryArgs = ListItemProps & {
  label?: string;
  description?: string;
  showPrefix?: boolean;
  showSuffix?: boolean;
};

const meta = {
  title: 'Helper Components/ListItem',
  tags: ['autodocs'],
  component: ListItem,
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    'data-disabled': { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    shouldDisplayCheckmark: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    variant: {
      description: 'Visual style variant.',
      control: 'select',
      options: ['primary', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: 'primary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'data-state': {
      control: 'select',
      options: ['checked', 'unchecked'],
      table: {
        category: 'Behavior',
        type: { summary: 'checked | unchecked' },
        defaultValue: { summary: 'unchecked' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ListItem provides a composable row for menus and selection controls. Use it inside DropdownMenu, Select, MultiSelect, or ComboBox to share consistent row styling. Use ActionTile for a standalone navigation or action surface.',
      },
    },
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  render: (args: ListItemStoryArgs) => (
    <div className="w-80">
      <ListItem {...args}>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
      </ListItem>
    </div>
  ),
  args: {
    variant: 'primary',
    disabled: false,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Affixes: Story = exampleStory(AffixesExample, affixesSource);

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  render: () => (
    <div className="w-80">
      <ListItem onClick={() => console.log('clicked')}>
        <ListItem.Label>Label</ListItem.Label>
      </ListItem>

      <ListItem>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
      </ListItem>

      <ListItem>
        <ListItem.Content>
          <ListItem.Label>Label that is longer than one line will be truncated</ListItem.Label>
          <ListItem.Description>
            The same trancation will be applied on description
          </ListItem.Description>
        </ListItem.Content>
      </ListItem>

      <ListItem>
        <ListItem.Prefix>
          <Avatar size="xs" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
      </ListItem>

      <ListItem>
        <ListItem.Prefix>
          <Avatar size="xs" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>Suffix</ListItem.Suffix>
      </ListItem>

      <ListItem>
        <ListItem.Prefix>
          <RiDownloadLine className="size-ws-9" />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>
          <Switch />
        </ListItem.Suffix>
      </ListItem>

      <ListItem>
        <ListItem.Prefix>
          <Checkbox />
        </ListItem.Prefix>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>
          <Switch />
        </ListItem.Suffix>
      </ListItem>

      <ListItem>
        <ListItem.Content>
          <ListItem.Label>Label</ListItem.Label>
          <ListItem.Description>Description</ListItem.Description>
        </ListItem.Content>
        <ListItem.Suffix>
          Suffix
          <RiArrowRightSLine />
        </ListItem.Suffix>
      </ListItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compose prefixes, labels, descriptions, and suffixes inside a menu or selection control.',
      },
    },
  },
};
