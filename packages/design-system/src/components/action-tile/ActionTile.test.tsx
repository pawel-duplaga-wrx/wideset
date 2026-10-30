import { RiArrowRightSLine, RiBugLine } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ActionTile } from './ActionTile';
import type { ActionTileProps } from './ActionTile.types';

const variants: ActionTileProps['variant'][] = ['border', 'filled'];

describe('ActionTile', () => {
  describe('Basic rendering', () => {
    it('should render action tile with children', () => {
      render(<ActionTile>Content</ActionTile>);

      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render action tile with title, subtitle, and action', () => {
      const { container } = render(
        <ActionTile
          title="Tile Title"
          description="Tile Description"
          entity={RiBugLine}
          icon={RiArrowRightSLine}
        >
          Content
        </ActionTile>,
      );

      expect(screen.getByText('Tile Title')).toBeInTheDocument();
      expect(screen.getByText('Tile Description')).toBeInTheDocument();
      expect(container.querySelectorAll('svg')).toHaveLength(2);
    });
  });

  describe('Compound components', () => {
    it('should render full compound structure', () => {
      const { container } = render(
        <ActionTile>
          <ActionTile.Entity icon={RiBugLine} />
          <div className="flex-1">
            <ActionTile.Title>Title</ActionTile.Title>
            <ActionTile.Description>Description</ActionTile.Description>
          </div>
          <ActionTile.Icon icon={RiArrowRightSLine} />
        </ActionTile>,
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(container.querySelectorAll('svg')).toHaveLength(2);
    });
  });

  describe('Ref forwarding', () => {
    it('should forward ref to tile element', () => {
      const ref = vi.fn();

      render(
        <ActionTile ref={ref} data-testid="tile">
          Content
        </ActionTile>,
      );

      const tile = screen.getByTestId('tile');
      expect(ref).toHaveBeenCalledWith(tile);
    });
  });

  describe('HTML attributes', () => {
    it('should pass through HTML attributes', () => {
      render(
        <ActionTile data-testid="tile" aria-label="Custom tile">
          Content
        </ActionTile>,
      );

      const tile = screen.getByTestId('tile');
      expect(tile).toHaveAttribute('aria-label', 'Custom tile');
    });
  });

  describe('Element selection', () => {
    it('should render a decorative div when there is no interaction affordance', () => {
      const { container } = render(<ActionTile title="Decorative" />);

      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
      expect(container.firstChild).not.toHaveAttribute('tabindex');
      expect(container.querySelector('button')).not.toBeInTheDocument();
    });

    it('should render a native button and fire onClick', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<ActionTile onClick={onClick} title="Action" />);

      const button = screen.getByRole('button', { name: /Action/ });
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('type', 'button');

      await user.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should activate from the keyboard without a key handler', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(<ActionTile onClick={onClick} title="Action" />);

      await user.tab();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should render a button when type is set without onClick', () => {
      render(<ActionTile title="Save" type="submit" />);

      const button = screen.getByRole('button', { name: /Save/i });
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should render an anchor when href is set', () => {
      render(<ActionTile title="Settings" href="/settings" />);

      const link = screen.getByRole('link', { name: /Settings/i });
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/settings');
    });

    it('should accept native anchor attributes on the href path', () => {
      render(
        <ActionTile
          download
          href="/export.csv"
          rel="noopener noreferrer"
          target="_blank"
          title="Export"
        />,
      );

      const link = screen.getByRole('link', { name: /Export/ });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('download');
    });

    it('should render onto the child element with asChild', () => {
      render(
        <ActionTile asChild>
          <a href="/settings">Settings</a>
        </ActionTile>,
      );

      const link = screen.getByRole('link', { name: 'Settings' });
      expect(link).toHaveAttribute('href', '/settings');
      expect(link).toHaveClass('rounded-ws-container-md');
    });
  });

  describe('Disabled', () => {
    it('should use the native disabled attribute on a button', () => {
      render(<ActionTile disabled onClick={vi.fn()} title="Action" />);

      expect(screen.getByRole('button', { name: /Action/ })).toBeDisabled();
    });

    it('should drop href and leave the tab order when a link is disabled', () => {
      render(<ActionTile disabled href="/settings" title="Settings" />);

      const tile = screen.getByText('Settings').closest('a');
      expect(tile).not.toHaveAttribute('href');
      expect(tile).toHaveAttribute('aria-disabled', 'true');
      expect(tile).toHaveAttribute('tabindex', '-1');
    });

    it('should prevent activation when a disabled asChild link is clicked', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      render(
        <ActionTile asChild disabled onClick={onClick}>
          <a href="/settings">Settings</a>
        </ActionTile>,
      );

      const link = screen.getByRole('link', { name: 'Settings' });
      expect(link).toHaveAttribute('aria-disabled', 'true');
      expect(link).toHaveAttribute('tabindex', '-1');

      await user.click(link);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should hide the trailing arrow when disabled', () => {
      const { container } = render(
        <ActionTile disabled entity={RiBugLine} icon={RiArrowRightSLine} title="Action" />,
      );

      expect(container.querySelectorAll('svg')).toHaveLength(1);
    });
  });

  describe('data-slot', () => {
    it('marks each part with data-slot', () => {
      const { container } = render(
        <ActionTile
          title="Billing details"
          description="Update your card"
          entity={RiBugLine}
          icon={RiArrowRightSLine}
          onClick={() => {}}
        />,
      );

      expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'action-tile');
      const slots = [...container.querySelectorAll('[data-slot]')].map((el) =>
        el.getAttribute('data-slot'),
      );
      expect(slots).toEqual([
        'action-tile',
        'action-tile-entity',
        'action-tile-title',
        'action-tile-description',
        'action-tile-icon',
      ]);
    });
  });
});

describe('ActionTile Snapshots', () => {
  it('should match snapshot for action tile with title, description, entity, and icon', () => {
    const { container } = render(
      <ActionTile
        title="Title"
        description="Description"
        entity={RiBugLine}
        icon={RiArrowRightSLine}
      >
        Content
      </ActionTile>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it.each(variants)('should match snapshot for variant="%s"', (variant) => {
    const { container } = render(<ActionTile variant={variant}>Content</ActionTile>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match snapshot with full compound structure', () => {
    const { container } = render(
      <ActionTile>
        <ActionTile.Entity icon={RiBugLine} />
        <div className="flex-1">
          <ActionTile.Title>Title</ActionTile.Title>
          <ActionTile.Description>Description</ActionTile.Description>
        </div>
        <ActionTile.Icon icon={RiArrowRightSLine} />
      </ActionTile>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
