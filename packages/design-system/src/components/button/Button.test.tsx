import { RiBugLine } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  describe('Basic rendering', () => {
    it('should render a button element by default', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render children correctly', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should apply default props', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Part markers', () => {
    it('marks each part with data-slot', () => {
      const { container } = render(
        <Button>
          <Button.Icon icon={RiBugLine} />
          <Button.TruncatedText>Report a bug</Button.TruncatedText>
        </Button>,
      );
      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
      expect(container.querySelector('[data-slot="button-icon"]')).toBeInTheDocument();
      expect(container.querySelector('[data-slot="button-truncated-text"]')).toHaveTextContent(
        'Report a bug',
      );
    });

    it("lets a caller's data-slot win", () => {
      render(<Button data-slot="custom">Save</Button>);
      expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'custom');
    });

    it('keeps data-slot on the child under asChild', () => {
      render(
        <Button asChild>
          <a href="/pricing">Pricing</a>
        </Button>,
      );
      expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('data-slot', 'button');
    });
  });

  describe('Disabled state', () => {
    it('should render disabled button', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: 'Disabled' });
      expect(button).toBeDisabled();
    });

    it('should not be clickable when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );
      const button = screen.getByRole('button', { name: 'Disabled' });
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Inverse focus state', () => {
    it.each(['filled', 'border', 'ghost'] as const)(
      'uses the inverse focus treatment for %s buttons',
      (preset) => {
        render(
          <Button variant="inverse" preset={preset}>
            Inverse
          </Button>,
        );

        const button = screen.getByRole('button', { name: 'Inverse' });

        expect(button).toHaveClass('focus-visible:outline-offset-0');
        if (preset === 'border') {
          expect(button).toHaveClass('focus:not-active:bg-ws-static-inverse-alpha-subtle');
          expect(button).not.toHaveClass('focus:not-active:bg-ws-static-highlight-subtle');
        }
      },
    );
  });

  describe('asChild prop', () => {
    it('should render as child element when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>,
      );
      const link = screen.getByRole('link', { name: 'Link Button' });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/test');
    });

    it('should preserve child element props when asChild is true', () => {
      render(
        <Button asChild data-testid="custom-link">
          <a href="/test" className="custom-class">
            Link
          </a>
        </Button>,
      );
      const link = screen.getByTestId('custom-link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('type attribute', () => {
    it('defaults to type="button" on a native button', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'button');
    });

    it('does not put type on the child when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link</a>
        </Button>,
      );
      expect(screen.getByRole('link', { name: 'Link' })).not.toHaveAttribute('type');
    });
  });

  describe('Event handlers', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should pass event to onClick handler', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button', { name: 'Click me' });
      await user.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ type: 'click' }));
    });
  });

  describe('Custom className', () => {
    it('should merge custom className with default classes', () => {
      render(<Button className="custom-class">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to button element', () => {
      const ref = vi.fn();
      render(
        <Button ref={ref} data-testid="button-ref">
          Button
        </Button>,
      );
      const button = screen.getByTestId('button-ref');
      expect(ref).toHaveBeenCalledWith(button);
    });
  });

  describe('HTML attributes', () => {
    it('should pass through HTML attributes', () => {
      render(
        <Button type="submit" data-testid="submit-button" aria-label="Submit form">
          Submit
        </Button>,
      );
      const button = screen.getByTestId('submit-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('aria-label', 'Submit form');
    });

    it('should handle form attributes', () => {
      render(
        <Button form="test-form" name="submit" value="test">
          Submit
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'submit');
      expect(button).toHaveAttribute('value', 'test');
    });
  });
});

describe('Button with Button.Icon', () => {
  it('should render icon inside button', () => {
    render(
      <Button>
        <Button.Icon icon={RiBugLine} />
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const svg = button.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render icon with text', () => {
    render(
      <Button>
        <Button.Icon icon={RiBugLine} />
        Text
      </Button>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should apply size context to icon', () => {
    render(
      <Button size="lg">
        <Button.Icon icon={RiBugLine} />
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const svg = button.querySelector('svg');
    expect(svg).toHaveClass('h-ws-11 w-ws-11');
  });
});

describe('Button with Button.TruncatedText', () => {
  it('should render truncated text', () => {
    render(
      <Button>
        <Button.TruncatedText>Long text that should be truncated</Button.TruncatedText>
      </Button>,
    );
    const text = screen.getByText('Long text that should be truncated');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('SPAN');
  });

  it('should render truncated text with icon', () => {
    render(
      <Button>
        <Button.Icon icon={RiBugLine} />
        <Button.TruncatedText>Text with icon</Button.TruncatedText>
      </Button>,
    );
    expect(screen.getByText('Text with icon')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeTruthy();
  });
});

// Snapshot Tests
describe('Button Snapshots', () => {
  const presets: Array<'filled' | 'border' | 'ghost'> = ['filled', 'border', 'ghost'];
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

  describe('Variant: primary', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <Button variant="primary" preset={preset} size={size}>
                Button
              </Button>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('Variant: secondary', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <Button variant="secondary" preset={preset} size={size}>
                Button
              </Button>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('Variant: danger', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <Button variant="danger" preset={preset} size={size}>
                Button
              </Button>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('Variant: success', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <Button variant="success" preset={preset} size={size}>
                Button
              </Button>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('Variant: inverse', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <Button variant="inverse" preset={preset} size={size}>
                Button
              </Button>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe('With sub-components', () => {
    it('matches snapshot with icon', () => {
      const { container } = render(
        <Button variant="primary" preset="filled">
          <Button.Icon icon={RiBugLine} />
          Button with Icon
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with truncated text', () => {
      const { container } = render(
        <Button variant="primary" preset="filled">
          <Button.TruncatedText>Long text that should be truncated</Button.TruncatedText>
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with icon and truncated text', () => {
      const { container } = render(
        <Button variant="primary" preset="filled">
          <Button.Icon icon={RiBugLine} />
          <Button.TruncatedText>Button with icon and truncated text</Button.TruncatedText>
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('matches snapshot for disabled button', () => {
    const { container } = render(
      <Button variant="primary" preset="filled" disabled>
        Disabled Button
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with asChild as anchor', () => {
    const { container } = render(
      <Button asChild variant="primary" preset="filled">
        <a href="/test">Link Button</a>
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('With multiple lines', () => {
    it('matches snapshot for button with two lines of text', () => {
      const { container } = render(
        <Button variant="primary" preset="filled" size="md" className="max-w-xs">
          Save and continue editing
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for button with three lines of text', () => {
      const { container } = render(
        <Button variant="primary" preset="filled" size="md" className="max-w-xs">
          Save all changes and publish
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for button with icon and multiple lines', () => {
      const { container } = render(
        <Button variant="primary" preset="filled" size="md" className="max-w-xs">
          <Button.Icon icon={RiBugLine} />
          Report issue and send feedback
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for border preset with multiple lines', () => {
      const { container } = render(
        <Button variant="primary" preset="border" size="md" className="max-w-xs">
          Save and continue editing
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for ghost preset with multiple lines', () => {
      const { container } = render(
        <Button variant="primary" preset="ghost" size="md" className="max-w-xs">
          Save and continue editing this document
        </Button>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
