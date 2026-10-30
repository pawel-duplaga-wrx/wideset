import { RiBarChartFill, RiMusic2Fill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Thumbnail } from './Thumbnail';
import { getThumbnailType } from './Thumbnail.logic';
import type { ThumbnailFileType, ThumbnailSize, ThumbnailType } from './Thumbnail.types';

const sizes: ThumbnailSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const types: ThumbnailType[] = [
  'icon',
  'image',
  'logo',
  'text',
  'pdf',
  'spreadsheet',
  'document',
  'video',
  'picture',
];

const PHOTO =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';
const LOGO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path d="M15.6 12.9l.5-3.1h-3v-2c0-.9.4-1.7 1.8-1.7h1.4V3.4S15 3.2 13.8 3.2c-2.6 0-4.3 1.6-4.3 4.4v2.3H6.8v3.1h2.7V21h3.4v-8.1h2.7z" fill="#fff"/></svg>',
  );

const meta = {
  title: 'Helper Components/Thumbnail',
  tags: ['autodocs'],
  component: Thumbnail,
  parameters: {
    docs: {
      description: {
        component:
          'A small square tile that stands for a thing. The content mode follows the prop you pass — `icon` for a glyph, `src` for a picture, `text` for a letter, `type="logo"` with `src` for a brand — or `type` names one of the fixed file kinds (`pdf`, `spreadsheet`, `document`, `video`, `picture`), which carry their own glyph and hue. `getThumbnailType(name, mimeType)` picks that kind for you from a file.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: sizes,
      description: 'Figma `Size` — 16 / 20 / 24 / 32 / 40px.',
      table: {
        category: 'Appearance',
        type: { summary: sizes.join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: types,
      description:
        'Figma `Type`. Inferred from `src` / `text` / `icon` when omitted; required for `logo` and the file kinds.',
      table: {
        category: 'Appearance',
        type: { summary: types.join(' | ') },
        defaultValue: { summary: 'icon' },
      },
    },
    icon: {
      control: false,
      description: 'Glyph for `type="icon"`. Defaults to a bar chart.',
      table: { category: 'Content', type: { summary: 'RemixiconComponentType' } },
    },
    src: {
      control: 'text',
      description: 'Picture for `type="image"` (fills the tile) or `type="logo"` (glyph-sized).',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: 'Alternative text for `src`. Use `""` when decorative.',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    text: {
      control: 'text',
      description: 'A letter or two for `type="text"`.',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    className: {
      description: 'Additional CSS classes merged with the thumbnail root.',
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    type: 'icon',
  },
};

const Labelled = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="gap-ws-4 flex flex-col items-center">
    {children}
    <span className="typography-caption-sm text-ws-static-subtle">{label}</span>
  </div>
);

export const Sizes: Story = {
  argTypes: { size: { control: false } },
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {sizes.map((size) => (
        <Labelled key={size} label={size}>
          <Thumbnail size={size} />
        </Labelled>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The five Figma sizes. The glyph steps 12 / 12 / 16 / 20 / 24 and the radius 4 / 6 / 6 / 8 / 8.',
      },
    },
  },
};

const contentFor = (type: ThumbnailType, size: ThumbnailSize) => {
  switch (type) {
    case 'image':
      return <Thumbnail size={size} src={PHOTO} alt="" />;
    case 'logo':
      return <Thumbnail size={size} type="logo" src={LOGO} alt="Facebook" />;
    case 'text':
      return <Thumbnail size={size} text="W" />;
    case 'icon':
      return <Thumbnail size={size} icon={RiBarChartFill} />;
    default:
      return <Thumbnail size={size} type={type} />;
  }
};

export const Types: Story = {
  argTypes: { size: { control: false }, type: { control: false } },
  render: () => (
    <table className="border-spacing-x-ws-8 border-spacing-y-ws-5 border-separate">
      <thead>
        <tr>
          <th />
          {sizes.map((size) => (
            <th key={size} className="typography-caption-sm text-ws-static-subtle text-center">
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {types.map((type) => (
          <tr key={type}>
            <th className="typography-label-sm text-ws-static-subtle text-left capitalize">
              {type}
            </th>
            {sizes.map((size) => (
              <td key={size} className="text-center">
                <div className="flex justify-center">{contentFor(type, size)}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Figma’s `Type` × `Size` matrix. `icon`, `image`, `logo` and `text` take content from you; the five file kinds are fixed.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-center">
      <Labelled label="default">
        <Thumbnail size="lg" />
      </Labelled>
      <Labelled label="custom Icon">
        <Thumbnail size="lg" icon={RiMusic2Fill} />
      </Labelled>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {sizes.map((size) => (
        <Labelled key={size} label={size}>
          <Thumbnail size={size} src={PHOTO} alt={`Thumbnail ${size}`} />
        </Labelled>
      ))}
    </div>
  ),
};

export const WithLogo: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {sizes.map((size) => (
        <Labelled key={size} label={size}>
          <Thumbnail size={size} type="logo" src={LOGO} alt="Facebook" />
        </Labelled>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A logo sits at glyph size on a white tile with a subtle border, so any brand mark reads against any page.',
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {sizes.map((size) => (
        <Labelled key={size} label={size}>
          <Thumbnail size={size} text="W" />
        </Labelled>
      ))}
    </div>
  ),
};

const files = ['report.pdf', 'budget.xlsx', 'brief.docx', 'clip.mp4', 'photo.jpg', 'archive.zip'];

export const FromFile: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {files.map((name) => (
        <Labelled key={name} label={name}>
          <Thumbnail size="lg" type={getThumbnailType(name)} />
        </Labelled>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`getThumbnailType(name, mimeType?)` maps a file to one of the file kinds — MIME type first, extension second, `document` for anything it does not recognise (the `.zip` here).',
      },
    },
  },
};

export const FileKinds: Story = {
  render: () => (
    <div className="gap-ws-8 flex items-end">
      {(['pdf', 'spreadsheet', 'document', 'video', 'picture'] as ThumbnailFileType[]).map(
        (type) => (
          <Labelled key={type} label={type}>
            <Thumbnail size="lg" type={type} />
          </Labelled>
        ),
      )}
    </div>
  ),
};
