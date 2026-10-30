import { RiArrowDownSLine, RiBugLine, RiCloseLine } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  describe('Basic rendering', () => {
    it('should render the main button with label text', () => {
      render(<SplitButton icon={RiArrowDownSLine}>Click me</SplitButton>);
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render the icon trigger button', () => {
      render(<SplitButton icon={RiArrowDownSLine}>Button</SplitButton>);
      const trigger = screen.getByRole('button', { name: 'More options' });
      expect(trigger).toBeInTheDocument();
      expect(trigger.tagName).toBe('BUTTON');
    });

    it('should render two independent button elements', () => {
      render(<SplitButton icon={RiArrowDownSLine}>Button</SplitButton>);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });

    it('should render the icon inside the trigger button', () => {
      render(<SplitButton icon={RiArrowDownSLine}>Button</SplitButton>);
      const trigger = screen.getByRole('button', { name: 'More options' });
      expect(trigger.querySelector('svg')).toBeInTheDocument();
    });

    it('should accept a custom iconAriaLabel', () => {
      render(
        <SplitButton icon={RiArrowDownSLine} iconAriaLabel="Open menu">
          Button
        </SplitButton>,
      );
      expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    });
  });

  describe('Independent interactions', () => {
    it('should call onClick only when the main button is clicked', async () => {
      const handleClick = vi.fn();
      render(
        <SplitButton icon={RiArrowDownSLine} onClick={handleClick}>
          Click me
        </SplitButton>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'Click me' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onOpenChange when the icon trigger is clicked', async () => {
      const handleOpenChange = vi.fn();
      render(
        <SplitButton icon={RiArrowDownSLine} onOpenChange={handleOpenChange}>
          Button
        </SplitButton>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'More options' }));
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });

    it('should not call onClick when the icon trigger is clicked', async () => {
      const handleClick = vi.fn();
      render(
        <SplitButton icon={RiArrowDownSLine} onClick={handleClick}>
          Button
        </SplitButton>,
      );
      await userEvent.click(screen.getByRole('button', { name: 'More options' }));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Independent disabled states', () => {
    it('should disable only the main button when disabled is set', () => {
      render(
        <SplitButton icon={RiArrowDownSLine} disabled>
          Button
        </SplitButton>,
      );
      expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'More options' })).not.toBeDisabled();
    });

    it('should disable only the icon button when iconDisabled is set', () => {
      render(
        <SplitButton icon={RiArrowDownSLine} iconDisabled>
          Button
        </SplitButton>,
      );
      expect(screen.getByRole('button', { name: 'Button' })).not.toBeDisabled();
      expect(screen.getByRole('button', { name: 'More options' })).toBeDisabled();
    });

    it('should disable both buttons when both disabled and iconDisabled are set', () => {
      render(
        <SplitButton icon={RiArrowDownSLine} disabled iconDisabled>
          Button
        </SplitButton>,
      );
      expect(screen.getByRole('button', { name: 'Button' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'More options' })).toBeDisabled();
    });
  });

  describe('Sub-components', () => {
    it('should render with SplitButton.Icon sub-component inside the main button', () => {
      render(
        <SplitButton icon={RiArrowDownSLine}>
          <SplitButton.Icon icon={RiCloseLine} />
          Button
        </SplitButton>,
      );
      const mainButton = screen.getByRole('button', { name: /Button/ });
      expect(mainButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should render with SplitButton.TruncatedText sub-component', () => {
      render(
        <SplitButton icon={RiArrowDownSLine}>
          <SplitButton.TruncatedText>
            Long button text that should be truncated
          </SplitButton.TruncatedText>
        </SplitButton>,
      );
      expect(screen.getByText('Long button text that should be truncated')).toBeInTheDocument();
    });

    it('should render with both Icon and TruncatedText sub-components', () => {
      render(
        <SplitButton icon={RiArrowDownSLine}>
          <SplitButton.Icon icon={RiCloseLine} />
          <SplitButton.TruncatedText>Button with icon</SplitButton.TruncatedText>
        </SplitButton>,
      );
      expect(screen.getByText('Button with icon')).toBeInTheDocument();
    });
  });

  describe('Dropdown menu', () => {
    it('should open dropdown menu content when icon trigger is clicked', async () => {
      render(
        <SplitButton icon={RiArrowDownSLine} menuContent={<div role="menuitem">Action one</div>}>
          Button
        </SplitButton>,
      );
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'More options' }));
      expect(await screen.findByRole('menuitem')).toBeInTheDocument();
    });

    it('should not render dropdown content when menuContent is not provided', async () => {
      render(<SplitButton icon={RiArrowDownSLine}>Button</SplitButton>);
      await userEvent.click(screen.getByRole('button', { name: 'More options' }));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});

// Snapshot Tests
describe('SplitButton Snapshots', () => {
  const presets: Array<'filled' | 'border'> = ['filled', 'border'];
  const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

  describe('Variant: primary', () => {
    presets.forEach((preset) => {
      describe(`Preset: ${preset}`, () => {
        sizes.forEach((size) => {
          it(`matches snapshot for ${preset} ${size}`, () => {
            const { container } = render(
              <SplitButton variant="primary" preset={preset} size={size} icon={RiArrowDownSLine}>
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} disabled`, () => {
            const { container } = render(
              <SplitButton
                variant="primary"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                disabled
              >
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} iconDisabled`, () => {
            const { container } = render(
              <SplitButton
                variant="primary"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                iconDisabled
              >
                Button
              </SplitButton>,
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
              <SplitButton variant="secondary" preset={preset} size={size} icon={RiArrowDownSLine}>
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} disabled`, () => {
            const { container } = render(
              <SplitButton
                variant="secondary"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                disabled
              >
                Button
              </SplitButton>,
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
              <SplitButton variant="danger" preset={preset} size={size} icon={RiArrowDownSLine}>
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} disabled`, () => {
            const { container } = render(
              <SplitButton
                variant="danger"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                disabled
              >
                Button
              </SplitButton>,
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
              <SplitButton variant="success" preset={preset} size={size} icon={RiArrowDownSLine}>
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} disabled`, () => {
            const { container } = render(
              <SplitButton
                variant="success"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                disabled
              >
                Button
              </SplitButton>,
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
              <SplitButton variant="inverse" preset={preset} size={size} icon={RiArrowDownSLine}>
                Button
              </SplitButton>,
            );
            expect(container.firstChild).toMatchSnapshot();
          });

          it(`matches snapshot for ${preset} ${size} disabled`, () => {
            const { container } = render(
              <SplitButton
                variant="inverse"
                preset={preset}
                size={size}
                icon={RiArrowDownSLine}
                disabled
              >
                Button
              </SplitButton>,
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
        <SplitButton variant="primary" preset="filled" icon={RiArrowDownSLine}>
          <SplitButton.Icon icon={RiBugLine} />
          Button
        </SplitButton>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with truncated text', () => {
      const { container } = render(
        <SplitButton variant="primary" preset="filled" icon={RiArrowDownSLine}>
          <SplitButton.TruncatedText>Long text that should be truncated</SplitButton.TruncatedText>
        </SplitButton>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot with icon and truncated text', () => {
      const { container } = render(
        <SplitButton variant="primary" preset="filled" icon={RiArrowDownSLine}>
          <SplitButton.Icon icon={RiBugLine} />
          <SplitButton.TruncatedText>Button with icon and truncated text</SplitButton.TruncatedText>
        </SplitButton>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

describe('SplitButton data-slot', () => {
  it('marks each part with data-slot', () => {
    const { container } = render(
      <SplitButton icon={RiArrowDownSLine}>
        <SplitButton.Icon icon={RiBugLine} />
        <SplitButton.TruncatedText>Publish</SplitButton.TruncatedText>
      </SplitButton>,
    );
    expect(container.querySelector('[data-slot="split-button"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="button-icon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="button-truncated-text"]')).toBeInTheDocument();
  });
});
