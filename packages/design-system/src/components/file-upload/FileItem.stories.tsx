import { RiMusic2Fill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import StatesExample from './examples/file-item/states';
import statesSource from './examples/file-item/states?raw';
import ThumbnailsExample from './examples/file-item/thumbnails';
import thumbnailsSource from './examples/file-item/thumbnails?raw';
import VariantsExample from './examples/file-item/variants';
import variantsSource from './examples/file-item/variants?raw';
import { FileItem } from './FileItem';
import type { FileItemProps } from './FileItem.types';

const variants: NonNullable<FileItemProps['variant']>[] = ['contained', 'uncontained'];

const PHOTO =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

const meta = {
  title: 'Form/FileUpload/FileItem',
  tags: ['autodocs'],
  component: FileItem,
  subcomponents: {
    'FileItem.Thumbnail': FileItem.Thumbnail,
  },
  parameters: {
    docs: {
      description: {
        component: `FileItem displays a file with its thumbnail, metadata, and upload state. It shows a spinner while loading, a remove button once done, or a warning icon on error. Place the parts as children; the error icon and the remove button belong to the container. Anything that is not a part renders under the row, which is where an error description goes.

Pairs with \`FileUpload\` — the trigger sits above, the \`FileItem\` rows beneath.

Use a plain image when only a file preview is needed, without file metadata or actions.`,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    variant: {
      description: 'Figma’s `Container`: contained adds the tinted background and padding.',
      control: 'radio',
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: variants.join(' | ') },
        defaultValue: { summary: 'contained' },
      },
    },
    isLoading: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasError: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    onRemove: {
      table: { category: 'Events', type: { summary: '() => void' } },
    },
    removeLabel: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    children: {
      description:
        '`FileItem.Thumbnail`, `FileItem.Title`, `FileItem.Description`, `FileItem.Loading`, plus anything else for the message area.',
      control: false,
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof FileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const samples = [
  { name: 'report.pdf', size: '1.2 MB' },
  { name: 'budget.xlsx', size: '640 KB' },
  { name: 'brief.docx', size: '88 KB' },
  { name: 'clip.mp4', size: '48 MB' },
  { name: 'photo.jpg', size: '3.4 MB' },
  { name: 'archive.zip', size: '12 MB' },
];

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  args: {
    variant: 'contained',
    isLoading: false,
    hasError: false,
  },
  render: (args) => (
    <div className="w-96">
      <FileItem {...args}>
        <FileItem.Thumbnail name="report.pdf" />
        <FileItem.Title>report.pdf</FileItem.Title>
        <FileItem.Description>1.2 MB</FileItem.Description>
      </FileItem>
    </div>
  ),
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Thumbnails: Story = exampleStory(ThumbnailsExample, thumbnailsSource);

export const Loading: Story = {
  args: { ...Default.args },
  argTypes: { isLoading: { table: { category: 'Behavior' }, control: false } },
  render: (args) => (
    <div className="gap-ws-5 flex w-96 flex-col">
      <FileItem {...args} isLoading onRemove={() => {}}>
        <FileItem.Thumbnail name="clip.mp4" />
        <FileItem.Title>clip.mp4</FileItem.Title>
        <FileItem.Description>48 MB{'4 seconds left'}</FileItem.Description>
      </FileItem>

      <FileItem {...args} onRemove={() => {}}>
        <FileItem.Thumbnail name="clip.mp4" />
        <FileItem.Title>clip.mp4</FileItem.Title>
        <FileItem.Description>48 MB{'Calculating…'}</FileItem.Description>
        <FileItem.Loading />
      </FileItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Two spellings of the same state: `isLoading` on the container, or `FileItem.Loading` placed as a child. Either hides the remove button and widens the row gap to Figma’s `Uploading` 16px.',
      },
    },
  },
};

export const Errors: Story = {
  args: { ...Default.args },
  argTypes: {
    hasError: { table: { category: 'Behavior' }, control: false },
    error: { table: { category: 'Behavior' }, control: false },
  },
  render: (args) => (
    <div className="gap-ws-5 flex w-96 flex-col">
      <FileItem {...args} hasError onRemove={() => {}}>
        <FileItem.Thumbnail name="archive.zip" />
        <FileItem.Title>archive.zip</FileItem.Title>
        <FileItem.Description>1.2 GB</FileItem.Description>
      </FileItem>

      <FileItem {...args} error="File too large" onRemove={() => {}}>
        <FileItem.Thumbnail name="archive.zip" />
        <FileItem.Title>archive.zip</FileItem.Title>
        <FileItem.Description>1.2 GB</FileItem.Description>
      </FileItem>

      <FileItem {...args} error="File too large" onRemove={() => {}}>
        <FileItem.Thumbnail name="archive.zip" />
        <FileItem.Title>archive.zip</FileItem.Title>
        <FileItem.Description>1.2 GB</FileItem.Description>
        <span className="typography-body-md text-ws-static-base">Maximum file size is 10 MB.</span>
      </FileItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`hasError` alone tints the row and shows the icon; `error` adds the headline; any further child lands beneath it.',
      },
    },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  args: { ...Default.args },
  render: (args) => (
    <div className="gap-ws-5 flex w-96 flex-col">
      {samples.map((sample) => (
        <FileItem key={sample.name} {...args} onRemove={() => {}}>
          <FileItem.Thumbnail name={sample.name} />
          <FileItem.Title>{sample.name}</FileItem.Title>
          <FileItem.Description>{sample.size}</FileItem.Description>
        </FileItem>
      ))}
      <FileItem {...args} onRemove={() => {}}>
        <FileItem.Thumbnail src={PHOTO} alt="" />
        <FileItem.Title>photo-with-preview.jpg</FileItem.Title>
        <FileItem.Description>3.4 MB{'Preview via src'}</FileItem.Description>
      </FileItem>
      <FileItem {...args} onRemove={() => {}}>
        <FileItem.Thumbnail icon={RiMusic2Fill} />
        <FileItem.Title>track.mp3</FileItem.Title>
        <FileItem.Description>9.8 MB{'Custom Icon'}</FileItem.Description>
      </FileItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`FileItem.Thumbnail name` reads the kind off the extension — `.zip` falls back to `document`. Any `Thumbnail` content prop pins it instead: `src` for a preview, `type` for a kind, `icon` or `text` for your own.',
      },
    },
  },
};
