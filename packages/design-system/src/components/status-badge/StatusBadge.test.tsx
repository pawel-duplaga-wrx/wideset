import { RiBugLine } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from './StatusBadge';
import type { StatusBadgeProps } from './StatusBadge.types';

const sizes: StatusBadgeProps['size'][] = ['sm', 'md', 'lg'];
const colors: StatusBadgeProps['color'][] = ['negative', 'positive', 'notice', 'info', 'neutral'];
const shapes: StatusBadgeProps['shape'][] = ['square', 'rounded'];
const emphases: StatusBadgeProps['emphasis'][] = ['low', 'high'];

describe('StatusBadge', () => {
  describe('Rendering', () => {
    it('should render with text content', () => {
      render(<StatusBadge>Label</StatusBadge>);

      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should render with StatusBadge.Icon', () => {
      render(
        <StatusBadge>
          <StatusBadge.Icon icon={RiBugLine} data-testid="badge-icon" />
          Label
        </StatusBadge>,
      );

      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should render with StatusBadge.Label', () => {
      render(
        <StatusBadge>
          <StatusBadge.Label>Label</StatusBadge.Label>
        </StatusBadge>,
      );

      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should render with StatusBadge.Icon and StatusBadge.Label', () => {
      render(
        <StatusBadge>
          <StatusBadge.Icon icon={RiBugLine} data-testid="badge-icon" />
          <StatusBadge.Label>Label</StatusBadge.Label>
        </StatusBadge>,
      );

      expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('should forward ref to the root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<StatusBadge ref={ref}>Label</StatusBadge>);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('should forward additional props to the root element', () => {
      render(
        <StatusBadge className="custom-class" data-testid="badge" aria-label="Custom badge">
          Label
        </StatusBadge>,
      );

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveAttribute('aria-label', 'Custom badge');
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot for default badge', () => {
      const { container } = render(<StatusBadge>Label</StatusBadge>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for badge with icon', () => {
      const { container } = render(
        <StatusBadge>
          <StatusBadge.Icon icon={RiBugLine} />
          Label
        </StatusBadge>,
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for badge with label', () => {
      const { container } = render(
        <StatusBadge>
          <StatusBadge.Icon icon={RiBugLine} />
          <StatusBadge.Label>Label</StatusBadge.Label>
        </StatusBadge>,
      );
      expect(container).toMatchSnapshot();
    });

    it.each(sizes)('should match snapshot for size="%s"', (size) => {
      const { container } = render(<StatusBadge size={size}>Label</StatusBadge>);
      expect(container).toMatchSnapshot();
    });

    it.each(colors)('should match snapshot for color="%s"', (color) => {
      const { container } = render(<StatusBadge color={color}>Label</StatusBadge>);
      expect(container).toMatchSnapshot();
    });

    it.each(shapes)('should match snapshot for shape="%s"', (shape) => {
      const { container } = render(<StatusBadge shape={shape}>Label</StatusBadge>);
      expect(container).toMatchSnapshot();
    });

    it.each(emphases)('should match snapshot for emphasis="%s"', (emphasis) => {
      const { container } = render(<StatusBadge emphasis={emphasis}>Label</StatusBadge>);
      expect(container).toMatchSnapshot();
    });
  });
});

describe('StatusBadge data-slot', () => {
  it('marks each part with data-slot', () => {
    const { container } = render(
      <StatusBadge>
        <StatusBadge.Icon icon={RiBugLine} />
        <StatusBadge.Label>Bug</StatusBadge.Label>
      </StatusBadge>,
    );
    expect(container.querySelector('[data-slot="status-badge"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="status-badge-icon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="status-badge-label"]')).toBeInTheDocument();
  });

  it("lets a caller's data-slot win", () => {
    const { container } = render(<StatusBadge data-slot="tabs-count">8</StatusBadge>);
    expect(container.querySelector('[data-slot="tabs-count"]')).toBeInTheDocument();
  });
});
