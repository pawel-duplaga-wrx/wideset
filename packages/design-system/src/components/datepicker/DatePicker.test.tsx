import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DatePicker } from './DatePicker';

const FIXED_DATE = new Date(2025, 5, 15);

describe('DatePicker', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(FIXED_DATE);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render trigger with placeholder', () => {
      render(<DatePicker placeholder="Pick a date" />);

      expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
    });

    it('should render as disabled', () => {
      render(<DatePicker disabled />);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should display formatted selected value', () => {
      render(<DatePicker selected="2025-08-17" placeholder="Pick a date" />);

      const input = screen.getByPlaceholderText('Pick a date') as HTMLInputElement;
      expect(input.value).not.toBe('');
    });
  });

  describe('Interaction', () => {
    it('should open calendar popup on click', async () => {
      const user = userEvent.setup();

      render(<DatePicker />);
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('should close popup after selecting a date', async () => {
      const user = userEvent.setup();

      render(<DatePicker />);
      await user.click(screen.getByRole('button'));

      const dayButtons = screen.getAllByRole('gridcell').filter((cell) => cell.textContent !== '');
      const firstEnabled = dayButtons.find((btn) => !btn.querySelector('button[disabled]'));
      const buttonToClick = firstEnabled?.querySelector('button');
      expect(buttonToClick).toBeInTheDocument();
      await user.click(buttonToClick!);

      expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    });

    it('should call onSelect when a date is picked', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(<DatePicker onSelect={onSelect} />);
      await user.click(screen.getByRole('button'));

      const dayButtons = screen
        .getAllByRole('gridcell')
        .filter((cell) => cell.textContent !== '')
        .map((cell) => cell.querySelector('button'))
        .filter(Boolean);

      expect(dayButtons.length).toBeGreaterThan(0);
      await user.click(dayButtons[0]!);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should fire onSelect in controlled mode without changing the displayed value', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <DatePicker
          selected="2025-08-17"
          onSelect={onSelect}
          placeholder="Pick a date"
          dateFormat="yyyy-MM-dd"
        />,
      );

      const input = screen.getByPlaceholderText('Pick a date') as HTMLInputElement;
      const initialValue = input.value;
      expect(initialValue).toBe('2025-08-17');

      await user.click(screen.getByRole('button'));

      const otherDay = screen
        .getAllByRole('gridcell')
        .map((cell) => cell.querySelector('button'))
        .filter((btn): btn is HTMLButtonElement => !!btn && !btn.disabled)
        .find((btn) => btn.getAttribute('aria-label') !== 'Sunday, August 17th, 2025');

      expect(otherDay).toBeDefined();
      await user.click(otherDay!);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0]).not.toBe('2025-08-17');
      expect(input.value).toBe(initialValue);
    });

    it('should not allow picking a disabled date', async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const disabledDate = new Date(2025, 5, 10);

      render(
        <DatePicker
          defaultSelected="2025-06-15"
          onSelect={onSelect}
          disabledDates={disabledDate}
        />,
      );

      await user.click(screen.getByRole('button'));

      const disabledButton = screen
        .getAllByRole('gridcell')
        .map((cell) => cell.querySelector('button'))
        .find((btn) => btn?.getAttribute('aria-label') === 'Tuesday, June 10th, 2025');

      expect(disabledButton).toBeDefined();
      expect(disabledButton).toBeDisabled();

      await user.click(disabledButton!);
      expect(onSelect).not.toHaveBeenCalled();
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { container } = render(<DatePicker placeholder="Pick a date" className="w-72" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected date', () => {
      const { container } = render(
        <DatePicker selected="2025-08-17" placeholder="Pick a date" className="w-72" />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when opened', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <DatePicker selected="2025-08-17" placeholder="Pick a date" className="w-72" />,
      );

      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('Accessible name', () => {
    it('should be named by an associated <label htmlFor>', () => {
      render(
        <>
          <label htmlFor="when">Travel dates</label>
          <DatePicker id="when" selected="2025-08-17" dateFormat="MMMM d, yyyy" />
        </>,
      );

      expect(screen.getByLabelText('Travel dates')).toBe(screen.getByRole('button'));
      expect(screen.getByRole('button', { name: 'Travel dates' })).toBeInTheDocument();
    });

    it('should describe a labelled trigger with the selected date', () => {
      render(
        <>
          <label htmlFor="when">Travel dates</label>
          <DatePicker id="when" selected="2025-08-17" dateFormat="MMMM d, yyyy" />
        </>,
      );

      expect(screen.getByRole('button', { name: 'Travel dates' })).toHaveAccessibleDescription(
        'August 17, 2025',
      );
    });

    it('should not describe the trigger without a selected date', () => {
      render(<DatePicker aria-label="Travel dates" />);

      expect(screen.getByRole('button', { name: 'Travel dates' })).not.toHaveAttribute(
        'aria-describedby',
      );
    });

    it('should be named by aria-labelledby', () => {
      render(
        <>
          <span id="when-label">Travel dates</span>
          <DatePicker aria-labelledby="when-label" />
        </>,
      );

      expect(screen.getByRole('button', { name: 'Travel dates' })).toBeInTheDocument();
    });

    it('should use a caller aria-label', () => {
      render(
        <DatePicker aria-label="Travel dates" selected="2025-08-17" dateFormat="MMMM d, yyyy" />,
      );

      expect(screen.getByRole('button', { name: 'Travel dates' })).toBeInTheDocument();
    });

    it('should fall back to the placeholder without a label', () => {
      render(<DatePicker />);

      expect(screen.getByRole('button', { name: 'Pick a date' })).toBeInTheDocument();
    });

    it('should fall back to the displayed value without a label', () => {
      render(<DatePicker selected="2025-08-17" dateFormat="MMMM d, yyyy" />);

      expect(screen.getByRole('button', { name: 'August 17, 2025' })).toBeInTheDocument();
    });

    it('should not repeat the value as a description when it is already the name', () => {
      render(<DatePicker selected="2025-08-17" dateFormat="MMMM d, yyyy" />);

      expect(screen.getByRole('button', { name: 'August 17, 2025' })).not.toHaveAttribute(
        'aria-describedby',
      );
    });

    it('should keep a caller aria-describedby and aria-invalid on the trigger', () => {
      render(
        <>
          <span id="when-hint">Required</span>
          <DatePicker
            aria-label="Travel dates"
            aria-describedby="when-hint"
            aria-invalid
            selected="2025-08-17"
            dateFormat="MMMM d, yyyy"
          />
        </>,
      );

      const trigger = screen.getByRole('button', { name: 'Travel dates' });
      expect(trigger).toHaveAccessibleDescription('Required August 17, 2025');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Ref', () => {
    it('should forward ref to the trigger button', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<DatePicker ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('data-slot', 'date-picker');

    await user.click(trigger);
    expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
  });
});
