import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  describe('data-slot', () => {
    it('marks each part with data-slot', () => {
      render(<Textarea aria-label="Release notes" />);
      expect(screen.getByRole('textbox').parentElement).toHaveAttribute('data-slot', 'textarea');
    });
  });

  describe('Basic rendering', () => {
    it('should render a textarea element by default', () => {
      render(<Textarea placeholder="Enter text" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('should apply className to the wrapper element', () => {
      render(<Textarea className="custom-class" placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.parentElement).toHaveClass('custom-class');
    });

    it('should apply contentClassName to the textarea element', () => {
      render(<Textarea contentClassName="custom-content-class" placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-content-class');
    });
  });

  describe('Disabled state', () => {
    it('should set disabled attribute when disabled', () => {
      render(<Textarea disabled placeholder="Disabled" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
    });

    it('should set data-disabled attribute when disabled', () => {
      render(<Textarea disabled placeholder="Disabled" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('data-disabled', 'true');
    });

    it('should not be editable when disabled', async () => {
      const user = userEvent.setup();
      render(<Textarea disabled placeholder="Disabled" defaultValue="test" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      await user.type(textarea, 'new text');
      expect(textarea.value).toBe('test');
    });
  });

  describe('Error state', () => {
    it('sets aria-invalid on the textarea when variant is danger', () => {
      render(<Textarea variant="danger" aria-label="Comment" />);
      expect(screen.getByRole('textbox', { name: 'Comment' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('omits aria-invalid when variant is primary', () => {
      render(<Textarea aria-label="Comment" />);
      expect(screen.getByRole('textbox', { name: 'Comment' })).not.toHaveAttribute('aria-invalid');
    });

    it('lets an explicit aria-invalid override the danger variant', () => {
      render(<Textarea variant="danger" aria-invalid={false} aria-label="Comment" />);
      expect(screen.getByRole('textbox', { name: 'Comment' })).toHaveAttribute(
        'aria-invalid',
        'false',
      );
    });

    it('passes an explicit aria-invalid through on the primary variant', () => {
      render(<Textarea aria-invalid aria-label="Comment" />);
      expect(screen.getByRole('textbox', { name: 'Comment' })).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('does not style an empty required textarea as an error before interaction', () => {
      render(<Textarea required aria-label="Comment" />);
      const textarea = screen.getByRole('textbox', { name: 'Comment' });
      expect(textarea).toBeInvalid();
      expect(textarea).not.toHaveAttribute('aria-invalid');
      expect(textarea.parentElement?.className).not.toMatch(/danger/);
    });

    it('styles the danger variant as an error', () => {
      render(<Textarea variant="danger" aria-label="Comment" />);
      expect(screen.getByRole('textbox', { name: 'Comment' }).parentElement?.className).toMatch(
        /border-ws-dynamic-danger-strong-default/,
      );
    });
  });

  describe('Event handlers', () => {
    it('should call onChange when textarea value changes', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onChange={handleChange} placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      await user.type(textarea, 'test');
      expect(handleChange).toHaveBeenCalled();
    });

    it('should call onFocus when textarea is focused', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onFocus={handleFocus} placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('should call onBlur when textarea loses focus', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();
      render(<Textarea onBlur={handleBlur} placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      await user.click(textarea);
      await user.tab();
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to textarea element', () => {
      const ref = vi.fn();
      render(<Textarea ref={ref} placeholder="Textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(ref).toHaveBeenCalledWith(textarea);
    });
  });

  describe('HTML attributes', () => {
    it('should pass through HTML and data attributes', () => {
      render(
        <Textarea
          placeholder="Textarea"
          data-testid="custom-textarea"
          aria-label="Custom textarea"
          name="test-textarea"
        />,
      );
      const textarea = screen.getByRole('textbox', { name: 'Custom textarea' });
      expect(textarea).toHaveAttribute('name', 'test-textarea');
      expect(textarea).toHaveAttribute('data-testid', 'custom-textarea');
      expect(textarea).toHaveAttribute('aria-label', 'Custom textarea');
    });

    it('passes rest props through in the danger variant', () => {
      render(
        <Textarea
          variant="danger"
          aria-label="Comment"
          aria-describedby="comment-error"
          data-testid="comment"
          required
        />,
      );
      const textarea = screen.getByRole('textbox', { name: 'Comment' });
      expect(textarea).toHaveAttribute('aria-describedby', 'comment-error');
      expect(textarea).toHaveAttribute('data-testid', 'comment');
      expect(textarea).toBeRequired();
    });

    it('should apply rows attribute', () => {
      render(<Textarea placeholder="Textarea" rows={5} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('should apply cols attribute', () => {
      render(<Textarea placeholder="Textarea" cols={30} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('cols', '30');
    });
  });
});

// Snapshot Tests
describe('Textarea Snapshots', () => {
  const variants: Array<'primary' | 'danger'> = ['primary', 'danger'];
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

  variants.forEach((variant) => {
    describe(`Variant: ${variant}`, () => {
      sizes.forEach((size) => {
        it(`matches snapshot for size ${size}`, () => {
          const { container } = render(
            <Textarea variant={variant} size={size} placeholder="Textarea" />,
          );
          expect(container.firstChild).toMatchSnapshot();
        });

        it(`matches snapshot for size ${size} disabled`, () => {
          const { container } = render(
            <Textarea variant={variant} size={size} disabled placeholder="Textarea" />,
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  it('matches snapshot with defaultValue', () => {
    const { container } = render(
      <Textarea defaultValue="Some predefined text" placeholder="Textarea" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with rows and cols', () => {
    const { container } = render(<Textarea rows={4} cols={50} placeholder="Textarea" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
