import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Divider } from './Divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('renders with text', () => {
      render(<Divider text="Test Divider" />);
      expect(screen.getByText('Test Divider')).toBeInTheDocument();
    });

    it('renders without text', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('span')).toBeNull();
    });

    it('merges custom className', () => {
      render(<Divider className="custom-class" text="Test" />);
      expect(screen.getByRole('separator')).toHaveClass('custom-class');
    });
  });

  describe('Props', () => {
    it('forwards aria attributes to the root element', () => {
      render(<Divider aria-label="Section divider" text="Test" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-label', 'Section divider');
    });

    it('forwards data attributes to the root element', () => {
      render(<Divider data-section="content" text="Test" />);
      expect(screen.getByRole('separator')).toHaveAttribute('data-section', 'content');
    });

    it('forwards the native style attribute to the root element', () => {
      render(<Divider style={{ marginBlock: '24px' }} text="Test" />);
      expect(screen.getByRole('separator')).toHaveStyle({ marginBlock: '24px' });
    });
  });

  describe('Snapshots', () => {
    const textAligns: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right'];
    const styles: Array<'solid' | 'dashed'> = ['solid', 'dashed'];
    const emphasises: Array<'subtle' | 'base' | 'strong'> = ['subtle', 'base', 'strong'];
    const weights: Array<'thin' | 'default' | 'bold'> = ['thin', 'default', 'bold'];

    it('matches snapshot without text', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with text', () => {
      const { container } = render(<Divider text="Divider" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    describe('Text alignments', () => {
      textAligns.forEach((textAlign) => {
        it(`matches snapshot for textAlign ${textAlign}`, () => {
          const { container } = render(<Divider text="Divider" textAlign={textAlign} />);
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('Styles', () => {
      styles.forEach((lineStyle) => {
        it(`matches snapshot for lineStyle ${lineStyle}`, () => {
          const { container } = render(<Divider text="Divider" lineStyle={lineStyle} />);
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('Emphasis variants', () => {
      emphasises.forEach((emphasis) => {
        it(`matches snapshot for emphasis ${emphasis}`, () => {
          const { container } = render(<Divider text="Divider" emphasis={emphasis} />);
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('Weight variants', () => {
      weights.forEach((weight) => {
        it(`matches snapshot for weight ${weight}`, () => {
          const { container } = render(<Divider text="Divider" weight={weight} />);
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});

describe('Divider data-slot', () => {
  it('marks each part with data-slot', () => {
    const { container } = render(<Divider text="or" />);
    expect(container.querySelector('[data-slot="divider"]')).toBeInTheDocument();
  });
});
