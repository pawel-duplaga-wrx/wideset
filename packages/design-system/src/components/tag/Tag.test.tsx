import { RiCheckboxCircleFill } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from './Tag';

describe('Tag', () => {
  describe('Basic rendering', () => {
    it('should render children correctly', () => {
      render(<Tag>Test Tag</Tag>);
      expect(screen.getByText('Test Tag')).toBeInTheDocument();
    });

    it('should merge custom className with default classes', () => {
      const { container } = render(<Tag className="custom-class">Test</Tag>);
      const tag = container.firstChild as HTMLElement;
      expect(tag).toHaveClass('custom-class');
    });

    it('should pass through HTML attributes', () => {
      render(
        <Tag data-testid="tag" aria-label="Test tag">
          Test
        </Tag>,
      );
      const tag = screen.getByTestId('tag');
      expect(tag).toHaveAttribute('data-testid', 'tag');
      expect(tag).toHaveAttribute('aria-label', 'Test tag');
    });
  });

  describe('Truncate prop', () => {
    const text = 'Very long text that should be truncated when it exceeds the container width';

    it('should truncate long text when truncate is true', () => {
      render(
        <Tag truncate className="w-32">
          {text}
        </Tag>,
      );
      const content = screen.getByText(text).closest('span');
      expect(content).toHaveClass('truncate');
    });
  });

  describe('Tag.Icon', () => {
    it('should render icon inside tag', () => {
      render(
        <Tag>
          <Tag.Icon icon={RiCheckboxCircleFill} />
          Label
        </Tag>,
      );
      const svg = screen.getByText('Label').closest('div')?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });
});

describe('Tag Snapshots', () => {
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  const colors: Array<
    | 'brand'
    | 'red'
    | 'pink'
    | 'violet'
    | 'purple'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
  > = [
    'brand',
    'red',
    'pink',
    'violet',
    'purple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
  ];
  const presets: Array<'filled' | 'border'> = ['filled', 'border'];

  describe('Size, Preset, and Shape combinations', () => {
    sizes.forEach((size) => {
      presets.forEach((preset) => {
        (['square', 'rounded'] as const).forEach((shape) => {
          it(`matches snapshot for size ${size}, preset ${preset}, shape ${shape}`, () => {
            const { container } = render(
              <Tag size={size} preset={preset} shape={shape}>
                Label
              </Tag>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('Color variants', () => {
    colors.forEach((color) => {
      it(`matches snapshot for color ${color} with filled preset and without icon`, () => {
        const { container } = render(
          <Tag color={color} preset="filled">
            {color}
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it(`matches snapshot for color ${color} with filled preset and icon`, () => {
        const { container } = render(
          <Tag color={color} preset="filled">
            <Tag.Icon icon={RiCheckboxCircleFill} />
            {color}
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it(`matches snapshot for color ${color} with border preset and without icon`, () => {
        const { container } = render(
          <Tag color={color} preset="border">
            {color}
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      it(`matches snapshot for color ${color} with border preset and icon`, () => {
        const { container } = render(
          <Tag color={color} preset="border">
            <Tag.Icon icon={RiCheckboxCircleFill} />
            {color}
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('IconOnly variants', () => {
    sizes.forEach((size) => {
      it(`matches snapshot for iconOnly size ${size}`, () => {
        const { container } = render(
          <Tag iconOnly size={size}>
            <Tag.Icon icon={RiCheckboxCircleFill} />
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    presets.forEach((preset) => {
      it(`matches snapshot for iconOnly preset ${preset}`, () => {
        const { container } = render(
          <Tag iconOnly preset={preset}>
            <Tag.Icon icon={RiCheckboxCircleFill} />
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('With Icon', () => {
    sizes.forEach((size) => {
      it(`matches snapshot for tag with icon size ${size}`, () => {
        const { container } = render(
          <Tag size={size}>
            <Tag.Icon icon={RiCheckboxCircleFill} />
            Label
          </Tag>,
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('Truncate', () => {
    it('matches snapshot for truncated tag', () => {
      const { container } = render(
        <Tag truncate className="w-32">
          Very long text that should be truncated
        </Tag>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for truncated tag with icon', () => {
      const { container } = render(
        <Tag truncate className="w-32">
          <Tag.Icon icon={RiCheckboxCircleFill} />
          Very long text that should be truncated
        </Tag>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe('Tag data-slot', () => {
  it('marks each part with data-slot', () => {
    const { container } = render(
      <Tag>
        <Tag.Icon icon={RiCheckboxCircleFill} />
        Done
      </Tag>,
    );
    expect(container.querySelector('[data-slot="tag"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="tag-icon"]')).toBeInTheDocument();
  });

  it("lets a caller's data-slot win", () => {
    const { container } = render(<Tag data-slot="custom">Done</Tag>);
    expect(container.querySelector('[data-slot="custom"]')).toBeInTheDocument();
  });
});
