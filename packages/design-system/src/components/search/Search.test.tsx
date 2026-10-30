import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Search } from './Search';

describe('Search', () => {
  describe('data-slot', () => {
    it('marks each part with data-slot', () => {
      const { container } = render(
        <Search value="Invoice" onChange={() => {}} aria-label="Search" />,
      );
      expect(container.firstChild).toHaveAttribute('data-slot', 'search');
      expect(screen.getByRole('searchbox')).toHaveAttribute('data-slot', 'text-input-input');
      expect(screen.getByRole('button', { name: 'Clear' })).toHaveAttribute(
        'data-slot',
        'text-input-clear-button',
      );
    });
  });

  describe('Behavior', () => {
    it('forwards ref to the input', () => {
      const ref = createRef<HTMLInputElement>();
      render(<Search ref={ref} aria-label="Search files" />);
      expect(ref.current).toBe(screen.getByRole('searchbox', { name: 'Search files' }));
    });

    it('passes input props to the input', () => {
      render(<Search aria-label="Search files" name="q" data-testid="search-input" />);
      const input = screen.getByRole('searchbox', { name: 'Search files' });
      expect(input).toHaveAttribute('name', 'q');
      expect(input).toHaveAttribute('data-testid', 'search-input');
    });

    it('calls onChange when typing', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();
      render(<Search onChange={handleChange} placeholder="Search..." />);

      await user.type(screen.getByPlaceholderText('Search...'), 'foo');

      expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('clears the value and calls onClear', async () => {
      const handleClear = vi.fn();
      const user = userEvent.setup();
      const Controlled = () => {
        const [value, setValue] = useState('query');
        return (
          <Search
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={handleClear}
            placeholder="Search..."
          />
        );
      };
      render(<Controlled />);

      await user.click(screen.getByLabelText('Clear'));

      expect(handleClear).toHaveBeenCalledTimes(1);
      await waitFor(() => {
        const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
        expect(input.value).toBe('');
      });
    });

    it('reports the cleared value through onChange', async () => {
      // Read inside the handler: a controlled input the parent has not updated yet is
      // restored to its `value` right after the event.
      const seen: string[] = [];
      const handleChange = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => {
        seen.push(event.target.value);
      });
      const handleClear = vi.fn();
      const user = userEvent.setup();
      const { rerender } = render(
        <Search
          value="query"
          onChange={handleChange}
          onClear={handleClear}
          placeholder="Search..."
        />,
      );

      await user.click(screen.getByLabelText('Clear'));

      expect(handleClear).toHaveBeenCalledTimes(1);
      expect(seen).toEqual(['']);

      rerender(
        <Search value="" onChange={handleChange} onClear={handleClear} placeholder="Search..." />,
      );

      expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument();
    });

    it('merges className on the wrapper and forwards data-/aria- props to the input', () => {
      const { container } = render(
        <Search
          className="custom-root"
          data-testid="search-input"
          aria-label="Site search"
          placeholder="Search..."
        />,
      );

      expect(container.firstChild).toHaveClass('custom-root');
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toHaveAttribute('data-testid', 'search-input');
      expect(input).toHaveAttribute('aria-label', 'Site search');
    });
  });
});

describe('Search Snapshots', () => {
  const presets = ['border', 'ghost'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;
  const variants = ['primary', 'danger'] as const;

  describe('Preset and size', () => {
    presets.forEach((preset) => {
      sizes.forEach((size) => {
        it(`matches snapshot for preset ${preset} size ${size}`, () => {
          const { container } = render(
            <Search preset={preset} size={size} placeholder="Search..." />,
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  describe('Variant', () => {
    variants.forEach((variant) => {
      it(`matches snapshot for variant ${variant}`, () => {
        const { container } = render(<Search variant={variant} placeholder="Search..." />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('States', () => {
    it('matches snapshot when disabled', () => {
      const { container } = render(<Search disabled placeholder="Search..." />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with value (clear button visible)', () => {
      const { container } = render(
        <Search value="query" onChange={() => {}} placeholder="Search..." />,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with custom className', () => {
      const { container } = render(<Search className="w-full" placeholder="Search..." />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
