import { RiAddLine, RiBugLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { exampleStory } from '../../stories/example';
import { Avatar } from './Avatar';
import type { AvatarCommonProps } from './Avatar.types';
import ColorsExample from './examples/avatar/colors';
import colorsSource from './examples/avatar/colors?raw';
import ContentExample from './examples/avatar/content';
import contentSource from './examples/avatar/content?raw';
import GroupExample from './examples/avatar/group';
import groupSource from './examples/avatar/group?raw';
import ShapesExample from './examples/avatar/shapes';
import shapesSource from './examples/avatar/shapes?raw';
import SizesExample from './examples/avatar/sizes';
import sizesSource from './examples/avatar/sizes?raw';
import StatesExample from './examples/avatar/states';
import statesSource from './examples/avatar/states?raw';

const sizes: AvatarCommonProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const shapes: AvatarCommonProps['shape'][] = ['round', 'square'];

const meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  component: Avatar,
  subcomponents: {
    'Avatar.Group': Avatar.Group,
    'Avatar.More': Avatar.More,
  },
  parameters: {
    docs: {
      description: {
        component: `
Avatar represents a user with an image, initials, an icon, or the agent orb. Use \`Avatar.Group\` to display several together, and place \`Avatar.More\` at the end for an overflow badge or an action.

\`Avatar.More\` is placed rather than derived, and its label is simply its children — \`+8\` for an overflow badge, an icon for an action. Nothing is inferred from the group, so it can read \`+196\` while four avatars render. Without an \`onClick\` it is inert.

**Composition:**
\`\`\`
<Avatar.Group>
  <Avatar />
  <Avatar />
  <Avatar.More onClick={showAll}>+8</Avatar.More>
</Avatar.Group>
\`\`\`

**With an action instead of a count:**
\`\`\`
<Avatar.Group>
  <Avatar />
  <Avatar.More aria-label="Add member" onClick={invite}>
    <RiAddLine />
  </Avatar.More>
</Avatar.Group>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    agent: {
      description: 'Renders the agent orb. Use instead of an image, initials, or an icon.',
      control: 'boolean',
      table: { category: 'Content', type: { summary: 'boolean' } },
    },

    color: { table: { category: 'Appearance', type: { summary: 'AvatarColor' } } },
    selected: { table: { category: 'Appearance', type: { summary: 'boolean' } } },
    size: {
      control: 'radio',
      options: sizes,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" },
      },
    },
    shape: {
      control: 'radio',
      options: shapes,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'round' },
        type: { summary: "'round' | 'square'" },
      },
    },
    status: {
      control: 'radio',
      options: [undefined, 'online', 'offline', 'unavailable'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'undefined' },
        type: { summary: "'online' | 'offline' | 'unavailable'" },
      },
    },
    src: {
      description: 'Image URL. Use instead of Icon or agent; initials may provide a fallback.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    alt: {
      description:
        'Alternative text for the image or agent orb. Defaults to an empty string for images and Agent for the orb.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    initials: {
      description: 'Initials shown instead of an image, or as the image fallback.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    icon: {
      description: 'Custom icon content. Use instead of src, initials, or agent.',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    fallback: {
      description: 'Custom image fallback content displayed if the image fails to load.',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode | string' },
      },
    },
    onClick: {
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent<HTMLSpanElement>) => void' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
  // Storybook auto-injects an onClick into every story, and Avatar shows
  // `cursor-pointer` whenever one is passed. Opt out; `Clickable` passes a real handler.
  args: {
    onClick: undefined,
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default avatar rendered from an image `src`. Starting point with full Storybook controls support.',
      },
    },
  },
  render: (args) => <Avatar {...args} />,
  args: {
    src: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    alt: 'Avatar',
    size: 'md',
    shape: 'round',
  },
};

export const Content: Story = exampleStory(ContentExample, contentSource);

export const Colors: Story = exampleStory(ColorsExample, colorsSource);

export const Shapes: Story = exampleStory(ShapesExample, shapesSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Display: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Avatar supports four content modes: image (`src`), initials, custom `icon`, and the default user icon when nothing is provided.',
      },
    },
  },
  argTypes: {
    src: { table: { disable: true } },
    initials: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
  args: {
    ...Default.args,
    status: 'online',
    src: undefined,
    alt: undefined,
    initials: undefined,
  } as Story['args'],
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <div className="gap-ws-4 flex items-center">
        <Avatar
          {...common}
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=128&h=128&dpr=2&q=80"
        />
        <Avatar {...common} initials="A" />
        <Avatar {...common} icon={<RiBugLine />} />
        <Avatar {...common} />
      </div>
    );
  },
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates overriding the avatar appearance via `className`. Shows the customization pattern without modifying the component source.',
      },
    },
  },
  render: (args) => <Avatar {...args} />,
  args: {
    ...Default.args,
    className: 'border-2 border-black box-border',
  },
};

export const Fallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Per-avatar fallback content shown when an image fails to load. The `fallback` prop accepts a `ReactNode` (custom icon) or a `string` (initials). When omitted, the default user icon is shown.',
      },
    },
  },
  args: {
    ...Default.args,
  },
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <Avatar.Group {...common}>
        <Avatar {...common} src="https://broken.example.com/avatar.png" fallback={<RiBugLine />} />
        <Avatar {...common} src="https://broken.example.com/avatar.png" fallback="TS" />
        <Avatar {...common} src="https://broken.example.com/avatar.png" />
      </Avatar.Group>
    );
  },
};

export const Overflow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Place `Avatar.More` yourself at the end of the group. Its label is just its children, so the same slot takes `+196` or an icon — and because nothing is inferred from the group, a badge can read `+196` while four avatars render. Give it an `onClick` to make it interactive; without one it is inert and takes no cursor. An `svg` child is sized to match the avatars beside it.',
      },
    },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
  } as Story['args'],
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    const shown = ['DS', 'AB', 'CD', 'EF'];
    return (
      <div className="gap-ws-6 flex flex-col">
        <p>Overflow badge — the label is yours to decide</p>
        <Avatar.Group {...common}>
          {shown.map((initials, index) => (
            <Avatar {...common} key={`${initials}-${index}`} initials={initials} />
          ))}
          <Avatar.More onClick={() => {}}>+4</Avatar.More>
        </Avatar.Group>
        <p>{'Four rendered, 200 in the team — no 196 hidden elements'}</p>
        <Avatar.Group {...common}>
          {shown.map((initials, index) => (
            <Avatar {...common} key={`${initials}-${index}`} initials={initials} />
          ))}
          <Avatar.More onClick={() => {}}>+196</Avatar.More>
        </Avatar.Group>
        <p>An action instead of a count</p>
        <Avatar.Group {...common}>
          {shown.map((initials, index) => (
            <Avatar {...common} key={`${initials}-${index}`} initials={initials} />
          ))}
          <Avatar.More aria-label="Add member" onClick={() => {}}>
            <RiAddLine />
          </Avatar.More>
        </Avatar.Group>
        <p>Inert without an onClick</p>
        <Avatar.Group {...common}>
          {shown.slice(0, 2).map((initials, index) => (
            <Avatar {...common} key={`${initials}-${index}`} initials={initials} />
          ))}
          <Avatar.More>+12</Avatar.More>
        </Avatar.Group>
      </div>
    );
  },
};

export const PropsOverrideContext: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Individual Avatar props override the group context. Here, the last avatar has `size="md"` and `shape="square"` while the group has `size="lg"` and `shape="round"`.',
      },
    },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
  } as Story['args'],
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <Avatar.Group {...common} size="lg" shape="round">
        <Avatar {...common} initials="DS" />
        <Avatar {...common} initials="CD" />
        <Avatar {...common} initials="AB" size="md" shape="square" />
      </Avatar.Group>
    );
  },
};

export const Agent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pass `agent` to render the agent orb — Figma calls this content mode `Variant=Orb`. It ships as a flat bitmap per shape, to avoid image import during scaffolding. In Figma it is a raster composite with no defined motion.',
      },
    },
  },
  argTypes: {
    size: { table: { disable: true } },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
    agent: true,
  } as Story['args'],
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <div className="gap-ws-4 flex flex-col">
        <p>All sizes</p>
        <div className="gap-ws-4 flex items-center">
          {sizes.map((size) => (
            <Avatar {...common} key={size} agent size={size} />
          ))}
        </div>
        <p>Square, and with a status</p>
        <div className="gap-ws-4 flex items-center">
          <Avatar {...common} agent shape="square" size="xl" />
          <Avatar {...common} agent shape="round" size="xl" status="online" />
          <Avatar {...common} agent shape="square" size="xl" status="unavailable" />
        </div>
        <p>In a group beside people</p>
        {/* `common` carries `agent: true` from this story's args, and Avatar.Group
            spreads unknown props onto its <div> — so it takes size/shape only. */}
        <Avatar.Group shape={common.shape} size={common.size}>
          <Avatar {...common} agent />
          <Avatar {...common} agent={undefined} initials="DS" />
          <Avatar {...common} agent={undefined} initials="AB" />
        </Avatar.Group>
      </div>
    );
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Group: Story = exampleStory(GroupExample, groupSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Avatar.Group supports two layouts: `row` overlaps avatars on a single line; `grid` wraps them with consistent spacing. Use `grid` in narrow containers where overlap would clip.',
      },
    },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
  } as Story['args'],
  render: function Render(args) {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <div className="gap-ws-4 flex flex-col">
        <div className="gap-ws-2 flex flex-wrap">
          <p>Row layout</p>
          <Avatar.Group {...common} layout="row">
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
          </Avatar.Group>
        </div>
        <div className="max-w-ws-24">
          <p>Grid layout</p>
          <Avatar.Group {...common} layout="grid">
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
            <Avatar {...common} initials="DS" />
          </Avatar.Group>
        </div>
      </div>
    );
  },
};

export const Selected: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `selected` to draw the selection ring — Figma's `Selected=True`, which is the `Focus/Base` effect: a 2px gap and a 2px brand ring. It applies to every content mode. The ring lives on the Avatar root rather than the avatar box, because the box is masked whenever a status dot is present and a mask clips the outline along with everything else the element paints.",
      },
    },
  },
  argTypes: {
    selected: { table: { disable: true } },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
    size: 'xl',
  } as Story['args'],
  render: (args) => {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <div className="gap-ws-6 flex flex-col">
        <p>Every content mode, selected</p>
        <div className="gap-ws-6 flex items-center">
          <Avatar
            {...common}
            selected
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=128&h=128&dpr=2&q=80"
          />
          <Avatar {...common} initials="A" selected />
          <Avatar {...common} selected />
          <Avatar {...common} agent selected />
        </div>
        <p>With a status dot — the ring survives the notch mask</p>
        <div className="gap-ws-6 flex items-center">
          <Avatar {...common} initials="A" selected status="online" />
          <Avatar {...common} selected status="online" />
          <Avatar {...common} agent selected status="online" />
        </div>
        <p>Square, and unselected for comparison</p>
        <div className="gap-ws-6 flex items-center">
          <Avatar {...common} initials="A" selected shape="square" />
          <Avatar {...common} initials="A" shape="square" />
        </div>
      </div>
    );
  },
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'An avatar is only interactive when you give it an `onClick` — that is also the only thing that adds `cursor-pointer`. Every other story here renders without a handler, so the cursor stays default. Pass a cursor utility through `className` if you need a different one.',
      },
    },
  },
  args: {
    ...Default.args,
    src: undefined,
    alt: undefined,
    initials: 'AB',
  } as Story['args'],
  render: (args) => {
    const common = args as AvatarCommonProps & { className?: string };
    return (
      <div className="gap-ws-4 flex items-center">
        <Avatar {...common} initials="AB" onClick={fn()} />
        <Avatar {...common} initials="CD" />
        <Avatar {...common} className="cursor-help" initials="EF" />
      </div>
    );
  },
};
