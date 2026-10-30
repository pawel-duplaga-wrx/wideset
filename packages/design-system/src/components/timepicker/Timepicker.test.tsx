import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TimePicker } from './Timepicker';
import { generateTimePickerSteps, stepsToOptions } from './Timepicker.logic';

describe('generateTimePickerSteps', () => {
  it('should generate correct steps with default parameters', () => {
    const result = generateTimePickerSteps();
    expect(result.length).toBe(96);
    expect(result[0]).toBe('00:00');
    expect(result[result.length - 1]).toBe('23:45');
  });

  it('should generate correct steps with custom parameters', () => {
    const result = generateTimePickerSteps({ min: '07:00', max: '19:00', interval: 30 });
    expect(result.length).toBe(25);
    expect(result[0]).toBe('07:00');
    expect(result[result.length - 1]).toBe('19:00');
  });

  it('should not return max if mode equals "from"', () => {
    const result = generateTimePickerSteps({
      min: '07:00',
      max: '19:00',
      interval: 30,
      mode: 'from',
    });
    expect(result.length).toBe(24);
    expect(result[0]).toBe('07:00');
    expect(result[result.length - 1]).toBe('18:30');
  });

  it('should not return min if mode equals "to"', () => {
    const result = generateTimePickerSteps({
      min: '07:00',
      max: '19:00',
      interval: 30,
      mode: 'to',
    });
    expect(result.length).toBe(24);
    expect(result[0]).toBe('07:30');
    expect(result[result.length - 1]).toBe('19:00');
  });

  it('should generate an empty array if min is greater than max', () => {
    const result = generateTimePickerSteps({ min: '20:00', max: '10:00', interval: 15 });
    expect(result.length).toBe(0);
  });
});

describe('stepsToOptions', () => {
  it('should convert steps to 24h format options', () => {
    const steps = ['08:00', '08:30', '09:00'];
    const result = stepsToOptions(steps, '24h');
    expect(result).toEqual([
      { label: '08:00', value: '08:00' },
      { label: '08:30', value: '08:30' },
      { label: '09:00', value: '09:00' },
    ]);
  });

  it('should convert steps to 12h format options', () => {
    const steps = ['08:00', '13:00', '00:00'];
    const result = stepsToOptions(steps, '12h');
    expect(result).toEqual([
      { label: '08:00 AM', value: '08:00' },
      { label: '01:00 PM', value: '13:00' },
      { label: '12:00 AM', value: '00:00' },
    ]);
  });
});

describe('TimePicker', () => {
  describe('Basic rendering', () => {
    it('renders with placeholder', () => {
      render(<TimePicker placeholder="Pick time" />);
      expect(screen.getByText('Pick time')).toBeInTheDocument();
    });

    it('renders select trigger', () => {
      render(<TimePicker placeholder="Pick time" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeInTheDocument();
    });

    it('renders time options when opened', async () => {
      const user = userEvent.setup();
      render(<TimePicker placeholder="Pick time" />);
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByText('00:00')).toBeInTheDocument();
          expect(screen.getByText('00:15')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it('renders 12h format options when format is 12h', async () => {
      const user = userEvent.setup();
      render(<TimePicker format="12h" placeholder="Pick time" />);
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByText('12:00 AM')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });

    it('renders options within custom min/max range', async () => {
      const user = userEvent.setup();
      render(<TimePicker min="08:00" max="10:00" intervalInMinutes={60} placeholder="Pick time" />);
      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await waitFor(
        () => {
          expect(screen.getByText('08:00')).toBeInTheDocument();
          expect(screen.getByText('09:00')).toBeInTheDocument();
          expect(screen.getByText('10:00')).toBeInTheDocument();
        },
        { timeout: 3000 },
      );
    });
  });
});

describe('TimePicker Snapshots', () => {
  it('matches snapshot with default props', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<TimePicker placeholder="Pick time" />);
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('00:00')).toBeInTheDocument();
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot with 12h format', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<TimePicker format="12h" placeholder="Pick time" />);
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('12:00 AM')).toBeInTheDocument();
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot with custom min/max', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <TimePicker min="08:00" max="18:00" intervalInMinutes={30} placeholder="Pick time" />,
    );
    await user.click(screen.getByRole('combobox'));
    await waitFor(() => {
      expect(screen.getByText('08:00')).toBeInTheDocument();
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot when disabled', () => {
    const { baseElement } = render(<TimePicker disabled placeholder="Pick time" />);
    expect(baseElement).toMatchSnapshot();
  });
});

describe('TimePicker data-slot', () => {
  it('marks each part with data-slot', () => {
    render(<TimePicker aria-label="Start time" />);
    expect(screen.getByRole('combobox', { name: 'Start time' })).toHaveAttribute(
      'data-slot',
      'time-picker',
    );
  });
});

describe('TimePicker clear button', () => {
  it('is a real button outside the trigger and clears with the keyboard', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TimePicker defaultValue="10:00" clearable onValueChange={onValueChange} />);

    const clearButton = screen.getByRole('button', { name: 'Clear selection' });
    expect(screen.getByRole('combobox')).not.toContainElement(clearButton);

    clearButton.focus();
    await user.keyboard('{Enter}');

    expect(onValueChange).toHaveBeenCalledWith('');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
