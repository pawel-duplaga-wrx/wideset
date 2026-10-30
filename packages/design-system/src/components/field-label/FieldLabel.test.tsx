import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Tooltip } from '../tooltip/Tooltip';
import { FieldLabel } from './FieldLabel';

describe('FieldLabel', () => {
  describe('data-slot', () => {
    it('marks each part with data-slot', () => {
      const { container, rerender } = render(<FieldLabel>Email</FieldLabel>);
      expect(container.firstChild).toHaveAttribute('data-slot', 'field-label');
      rerender(<FieldLabel description="We never share it.">Email</FieldLabel>);
      expect(container.firstChild).toHaveAttribute('data-slot', 'field-label');
      expect(container.querySelectorAll('[data-slot="field-label"]')).toHaveLength(1);
    });
  });

  describe('Basic rendering', () => {
    it('should render label element with children', () => {
      render(<FieldLabel>Test Label</FieldLabel>);
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toBeInTheDocument();
    });

    it('should merge custom className with default classes', () => {
      render(<FieldLabel className="custom-class">Test Label</FieldLabel>);
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('HTML attributes', () => {
    it('should forward HTML attributes to label element', () => {
      render(
        <FieldLabel id="test-id" htmlFor="input-id" data-testid="field-label">
          Test Label
        </FieldLabel>,
      );
      const label = screen.getByTestId('field-label');
      expect(label).toHaveAttribute('id', 'test-id');
      expect(label).toHaveAttribute('for', 'input-id');
    });

    it('should forward aria attributes', () => {
      render(
        <FieldLabel aria-label="Custom label" aria-describedby="description">
          Test Label
        </FieldLabel>,
      );
      const label = screen.getByText('Test Label').closest('label');
      expect(label).toHaveAttribute('aria-label', 'Custom label');
      expect(label).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Required prop', () => {
    it('should render required asterisk when required is true', () => {
      render(<FieldLabel required>Test Label</FieldLabel>);
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
    });

    it('should not render required asterisk when required is false', () => {
      render(<FieldLabel required={false}>Test Label</FieldLabel>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('should not render required asterisk when required is undefined', () => {
      render(<FieldLabel>Test Label</FieldLabel>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  it('should render suffix text when provided', () => {
    render(<FieldLabel suffix="(optional)">Test Label</FieldLabel>);
    expect(screen.getByText('(optional)')).toBeInTheDocument();
  });

  describe('Tooltip prop', () => {
    it('should render tooltip icon when tooltip is provided', () => {
      const { container } = render(<FieldLabel tooltip="Help text">Test Label</FieldLabel>);
      const icon = container.querySelector('svg[tabindex="0"]');
      expect(icon).toBeInTheDocument();
    });

    it('names the info icon "More information" by default', () => {
      render(<FieldLabel tooltip="Help text">Test Label</FieldLabel>);
      expect(screen.getByLabelText('More information')).toHaveAttribute('tabindex', '0');
    });

    it('takes the info icon name from tooltipAriaLabel', () => {
      render(
        <FieldLabel tooltip="Help text" tooltipAriaLabel="Więcej informacji">
          Test Label
        </FieldLabel>,
      );
      expect(screen.getByLabelText('Więcej informacji')).toHaveAttribute('tabindex', '0');
      expect(screen.queryByLabelText('More information')).not.toBeInTheDocument();
    });

    it('should show tooltip content on hover', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <FieldLabel tooltip={<Tooltip.Label>Help text</Tooltip.Label>}>Test Label</FieldLabel>,
      );
      const icon = container.querySelector('svg[tabindex="0"]') as HTMLElement;
      expect(icon).toBeInTheDocument();
      await user.hover(icon);
      await waitFor(
        () => {
          const labels = screen.getAllByText('Help text');
          expect(labels.length).toBeGreaterThan(0);
        },
        { timeout: 2000 },
      );
    });
  });

  describe('Aside prop', () => {
    it('should render aside content when provided', () => {
      render(<FieldLabel aside="0/100">Test Label</FieldLabel>);
      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('should render aside as ReactNode', () => {
      render(
        <FieldLabel aside={<span data-testid="custom-aside">Custom aside</span>}>
          Test Label
        </FieldLabel>,
      );
      expect(screen.getByTestId('custom-aside')).toBeInTheDocument();
    });
  });

  it('should render description when provided', () => {
    render(<FieldLabel description="This is a description">Test Label</FieldLabel>);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  // Snapshot Tests
  describe('FieldLabel Snapshots', () => {
    it('matches snapshot for basic label', () => {
      const { container } = render(<FieldLabel>Test Label</FieldLabel>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for required label', () => {
      const { container } = render(<FieldLabel required>Test Label</FieldLabel>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with suffix', () => {
      const { container } = render(<FieldLabel suffix="(optional)">Test Label</FieldLabel>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with tooltip', () => {
      const { container } = render(
        <FieldLabel tooltip={<Tooltip.Label>Help text</Tooltip.Label>}>Test Label</FieldLabel>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with aside', () => {
      const { container } = render(<FieldLabel aside="0/100">Test Label</FieldLabel>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with description', () => {
      const { container } = render(
        <FieldLabel description="This is a description">Test Label</FieldLabel>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with all features', () => {
      const { container } = render(
        <FieldLabel
          required
          suffix="(optional)"
          tooltip={<Tooltip.Label>Help text</Tooltip.Label>}
          aside="0/100"
          description="This is a description"
        >
          Test Label
        </FieldLabel>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot for label with long text', () => {
      const longText =
        'This is a very long label text that should wrap properly when it exceeds the available width';
      const { container } = render(<FieldLabel>{longText}</FieldLabel>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
