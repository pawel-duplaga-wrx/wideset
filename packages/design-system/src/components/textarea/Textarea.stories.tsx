import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import { FormField } from '../form-field/FormField';
import SizesExample from './examples/textarea/sizes';
import sizesSource from './examples/textarea/sizes?raw';
import StatesExample from './examples/textarea/states';
import statesSource from './examples/textarea/states?raw';
import VariantsExample from './examples/textarea/variants';
import variantsSource from './examples/textarea/variants?raw';
import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea.types';

const sizes: TextareaProps['size'][] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Form/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
Textarea is a multi-line text field for free-form input such as comments, descriptions, or messages.
Use \`TextInput\` instead when the input is a single line.`,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    variant: {
      control: 'radio',
      description:
        'The visual style variant of the textarea. `danger` also sets `aria-invalid` on the textarea; an explicit `aria-invalid` prop wins.',
      options: ['primary', 'danger'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'primary'" },
        type: { summary: "'primary' | 'danger'" },
      },
    },
    size: {
      description: 'The size of the textarea',
      control: 'select',
      options: sizes,
      table: {
        category: 'Appearance',
        defaultValue: { summary: "'md'" },
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    rows: {
      description: 'Number of visible text lines for the textarea',
      control: 'number',
      table: { category: 'Behavior', type: { summary: 'number' } },
    },
    cols: {
      description: 'Number of visible character widths for the textarea',
      control: 'number',
      table: { category: 'Behavior', type: { summary: 'number' } },
    },
    resize: {
      control: 'radio',
      options: ['none', 'vertical', 'horizontal', 'both'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: "'vertical'" },
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
      },
    },
    disabled: {
      description: 'When true, the textarea is disabled',
      control: 'boolean',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      description: 'Placeholder text for the textarea',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    defaultValue: {
      description: 'Default value for the textarea (uncontrolled)',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    value: {
      description: 'Controlled value for the textarea',
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    contentClassName: {
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The minimal setup: a single-control textarea wired to the Controls panel. Use it to experiment with `variant`, `size`, and native props.',
      },
    },
  },
  render: (args) => (
    <div className="max-w-xs">
      <Textarea {...args} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    placeholder: 'Placeholder...',
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Resize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The `resize` prop controls the directions the user can drag the corner handle: `none`, `vertical` (default), `horizontal`, or `both`.',
      },
    },
  },
  render: () => (
    <div className="gap-ws-6 flex max-w-md flex-col">
      <Textarea resize="none" placeholder="resize: none" />
      <Textarea resize="vertical" placeholder="resize: vertical" />
      <Textarea resize="horizontal" placeholder="resize: horizontal" />
      <Textarea resize="both" placeholder="resize: both" />
    </div>
  ),
};

export const RowsAndCols: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Native `rows` and `cols` control the initial height and width. Without `cols` the field fills its container width; with `cols` it sizes to the given character count.',
      },
    },
  },
  render: () => (
    <div className="gap-ws-6 flex max-w-xs flex-col items-start">
      <Textarea rows={1} placeholder="Textarea with 1 row" />
      <Textarea rows={4} placeholder="Textarea with 4 rows" />
      <Textarea cols={10} placeholder="Textarea with 10 cols" />
      <Textarea rows={4} cols={50} placeholder="Textarea with 4 rows and 50 cols" />
    </div>
  ),
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A controlled comment field with a character counter and a native length limit.',
      },
    },
  },
  args: { ...Default.args },
  render: function Render(args) {
    const [comment, setComment] = useState('');
    return (
      <FormField
        label="Comment"
        htmlFor="comment-input"
        suffix={`${comment.length}/100`}
        helperText="Max 100 characters"
        helperTextId="comment-limit"
      >
        <Textarea
          {...args}
          id="comment-input"
          aria-describedby="comment-limit"
          maxLength={100}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </FormField>
    );
  },
};
