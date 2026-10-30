import {
  RiArrowDownSLine,
  RiBugLine,
  RiDownloadLine,
  RiLogoutBoxRLine,
  RiStarFill,
} from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { DropdownMenu } from '../dropdown/DropdownMenu';
import { ListItem } from '../list-item/ListItem';
import PresetsExample from './examples/split-button/presets';
import presetsSource from './examples/split-button/presets?raw';
import SizesExample from './examples/split-button/sizes';
import sizesSource from './examples/split-button/sizes?raw';
import StatesExample from './examples/split-button/states';
import statesSource from './examples/split-button/states?raw';
import VariantsExample from './examples/split-button/variants';
import variantsSource from './examples/split-button/variants?raw';
import { SplitButton } from './SplitButton';
import type { SplitButtonProps } from './SplitButton.types';

const variants: SplitButtonProps['variant'][] = [
  'primary',
  'secondary',
  'danger',
  'success',
  'inverse',
];

const presets: SplitButtonProps['preset'][] = ['filled', 'border'];

const sizes: SplitButtonProps['size'][] = ['xs', 'sm', 'md', 'lg'];

const defaultMenuContent = (
  <>
    <DropdownMenu.Item>
      <ListItem.Content>
        <ListItem.Label>Save as draft</ListItem.Label>
      </ListItem.Content>
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <ListItem.Content>
        <ListItem.Label>Schedule for later</ListItem.Label>
      </ListItem.Content>
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item variant="danger">
      <ListItem.Content>
        <ListItem.Label>Discard</ListItem.Label>
      </ListItem.Content>
    </DropdownMenu.Item>
  </>
);

const meta = {
  title: 'Components/Button/SplitButton',
  tags: ['autodocs'],
  component: SplitButton,
  subcomponents: {
    'SplitButton.Icon': SplitButton.Icon,
  },
  decorators: [
    (Story) => (
      <div className="p-ws-24 flex w-full items-center justify-center">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: `SplitButton is two independent interactive elements sharing a single visual unit: the left button triggers the primary action; the right icon button opens a dropdown menu.

The dropdown is managed internally. Pass items via the \`menuContent\` prop using \`DropdownMenu.Item\` from the design system.

Use \`open\` / \`onOpenChange\` to control the dropdown from outside.
Use \`disabled\` to disable only the main button; use \`iconDisabled\` to disable only the dropdown trigger.`,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
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
      description: 'Visual preset that controls emphasis through fill and border treatment.',
      options: presets,
      control: 'radio',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'filled' },
        type: { summary: "'filled' | 'border'" },
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
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    iconDisabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'button' },
        type: { summary: "'button' | 'submit' | 'reset'" },
      },
    },
    icon: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'RemixiconComponentType' },
      },
    },
    menuContent: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    open: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
    menuSide: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'bottom' },
        type: { summary: "'top' | 'right' | 'bottom' | 'left'" },
      },
    },
    menuAlign: {
      control: 'radio',
      options: ['start', 'center', 'end'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'end' },
        type: { summary: "'start' | 'center' | 'end'" },
      },
    },
    iconAriaLabel: {
      control: 'text',
      table: {
        category: 'Content',
        defaultValue: { summary: 'More options' },
        type: { summary: 'string' },
      },
    },
    onClick: {
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
  },
} satisfies Meta<typeof SplitButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example with the default `primary`, `filled`, `md` configuration. Click the chevron to open the dropdown; click the label to trigger the primary action independently.',
      },
      source: {
        code: `<SplitButton
  onClick={() => console.log('Primary action')}
  icon={RiArrowDownSLine}
  menuContent={
    <>
      <DropdownMenu.Item>
        <ListItem.Content><ListItem.Label>Save as draft</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <ListItem.Content><ListItem.Label>Schedule for later</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item variant="danger">
        <ListItem.Content><ListItem.Label>Discard</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
    </>
  }
>
  Publish
</SplitButton>`,
      },
    },
  },
  render: ({ children, ...args }) => (
    <SplitButton {...args} menuContent={defaultMenuContent}>
      {children}
    </SplitButton>
  ),
  args: {
    children: 'Publish',
    variant: 'primary',
    preset: 'filled',
    size: 'md',
    disabled: false,
    type: 'button',
    icon: RiArrowDownSLine,
  },
};

export const Variants: Story = {
  ...exampleStory(VariantsExample, variantsSource),
  args: { icon: RiArrowDownSLine },
};

export const Presets: Story = {
  ...exampleStory(PresetsExample, presetsSource),
  args: { icon: RiArrowDownSLine },
};

export const Sizes: Story = {
  ...exampleStory(SizesExample, sizesSource),
  args: { icon: RiArrowDownSLine },
};

export const WithRichMenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass any `DropdownMenu.Item` composition into `menuContent` — labels, prefixes, separators, disabled items, and danger variants all work as expected.',
      },
      source: {
        code: `<SplitButton
  onClick={() => console.log('Primary action')}
  icon={RiArrowDownSLine}
  menuContent={
    <>
      <DropdownMenu.Label>Actions</DropdownMenu.Label>
      <DropdownMenu.Item>
        <ListItem.Prefix><RiDownloadLine className="size-ws-9" /></ListItem.Prefix>
        <ListItem.Content><ListItem.Label>Download</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <ListItem.Prefix><RiStarFill className="size-ws-9" /></ListItem.Prefix>
        <ListItem.Content><ListItem.Label>Favourite</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item variant="danger">
        <ListItem.Prefix><RiLogoutBoxRLine className="size-ws-9" /></ListItem.Prefix>
        <ListItem.Content><ListItem.Label>Remove</ListItem.Label></ListItem.Content>
      </DropdownMenu.Item>
    </>
  }
>
  Submit
</SplitButton>`,
      },
    },
  },
  render: ({ children, ...args }) => (
    <SplitButton
      {...args}
      menuContent={
        <>
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Item>
            <ListItem.Prefix>
              <RiDownloadLine className="size-ws-9" />
            </ListItem.Prefix>
            <ListItem.Content>
              <ListItem.Label>Download</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListItem.Prefix>
              <RiStarFill className="size-ws-9" />
            </ListItem.Prefix>
            <ListItem.Content>
              <ListItem.Label>Favourite</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item variant="danger">
            <ListItem.Prefix>
              <RiLogoutBoxRLine className="size-ws-9" />
            </ListItem.Prefix>
            <ListItem.Content>
              <ListItem.Label>Remove</ListItem.Label>
            </ListItem.Content>
          </DropdownMenu.Item>
        </>
      }
    >
      {children}
    </SplitButton>
  ),
  args: {
    ...Default.args,
    children: 'Submit',
  },
};

export const States: Story = {
  ...exampleStory(StatesExample, statesSource),
  args: { icon: RiArrowDownSLine },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A common composition pattern combines a leading icon with `SplitButton.Icon` and a constrained label with `SplitButton.TruncatedText`, while the trailing `icon` prop opens the dropdown.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-12 flex flex-col">
      <SplitButton {...args} icon={RiArrowDownSLine} menuContent={defaultMenuContent}>
        <SplitButton.Icon icon={RiBugLine} />
        Report issue
      </SplitButton>
      <SplitButton
        {...args}
        className="w-80"
        icon={RiArrowDownSLine}
        menuContent={defaultMenuContent}
      >
        <SplitButton.Icon icon={RiBugLine} />
        <SplitButton.TruncatedText>
          Report an issue with the current table layout and open follow-up actions
        </SplitButton.TruncatedText>
      </SplitButton>
    </div>
  ),
  args: {
    ...Default.args,
    variant: 'success',
    preset: 'border',
  },
};
