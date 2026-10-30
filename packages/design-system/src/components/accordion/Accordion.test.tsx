import { RiBugLine } from '@remixicon/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  describe('Rendering', () => {
    it('should render accordion with items', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should forward data attributes to the root element', () => {
      render(<Accordion type="single" data-testid="accordion-root" />);

      expect(screen.getByTestId('accordion-root')).toBeInTheDocument();
    });

    it('should merge className onto the root element', () => {
      render(<Accordion type="single" className="custom-class" data-testid="accordion-root" />);

      expect(screen.getByTestId('accordion-root')).toHaveClass('w-full', 'custom-class');
    });
  });

  describe('Interaction', () => {
    it('should allow only one item open at a time with type="single"', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole('button', { name: 'Item 1' });
      const trigger2 = screen.getByRole('button', { name: 'Item 2' });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('data-state', 'open');
      expect(trigger2).toHaveAttribute('data-state', 'closed');

      await user.click(trigger2);
      expect(trigger1).toHaveAttribute('data-state', 'closed');
      expect(trigger2).toHaveAttribute('data-state', 'open');
    });

    it('should allow multiple items open at once with type="multiple"', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="multiple">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole('button', { name: 'Item 1' });
      const trigger2 = screen.getByRole('button', { name: 'Item 2' });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('data-state', 'open');
      expect(trigger2).toHaveAttribute('data-state', 'closed');

      await user.click(trigger2);
      expect(trigger1).toHaveAttribute('data-state', 'open');
      expect(trigger2).toHaveAttribute('data-state', 'open');
    });

    it('should not allow disabled items to be opened', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1" disabled>
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole('button', { name: 'Item 1' });
      const trigger2 = screen.getByRole('button', { name: 'Item 2' });

      await user.click(trigger1);
      expect(trigger1).toHaveAttribute('data-state', 'closed');
      expect(trigger2).toHaveAttribute('data-state', 'closed');

      await user.click(trigger2);
      expect(trigger1).toHaveAttribute('data-state', 'closed');
      expect(trigger2).toHaveAttribute('data-state', 'open');
    });
  });

  describe('Keyboard', () => {
    it('should support Enter key to toggle accordion items', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole('button', { name: 'Item 1' });
      expect(trigger).toHaveAttribute('data-state', 'closed');

      trigger.focus();
      await user.keyboard('{Enter}');

      expect(trigger).toHaveAttribute('data-state', 'open');

      await user.keyboard('{Enter}');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('should support Space key to toggle accordion items', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole('button', { name: 'Item 1' });
      expect(trigger).toHaveAttribute('data-state', 'closed');

      trigger.focus();
      await user.keyboard(' ');

      expect(trigger).toHaveAttribute('data-state', 'open');

      await user.keyboard(' ');
      expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    it('should support arrow key navigation between triggers', async () => {
      const user = userEvent.setup();

      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger1 = screen.getByRole('button', { name: 'Item 1' });
      const trigger2 = screen.getByRole('button', { name: 'Item 2' });

      trigger1.focus();
      expect(trigger1).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(trigger2).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(trigger1).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should set aria-disabled on trigger when item is disabled', () => {
      render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1" disabled>
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByRole('button', { name: 'Item 1' })).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('should remove aria-disabled from trigger when disabled changes to false', () => {
      const { rerender } = render(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1" disabled>
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole('button', { name: 'Item 1' });
      expect(trigger).toHaveAttribute('aria-disabled', 'true');

      rerender(
        <Accordion type="single" collapsible>
          <Accordion.Item value="item-1" disabled={false}>
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(trigger).not.toHaveAttribute('aria-disabled');
    });

    it('should mark decorative icons as aria-hidden', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>
              <Accordion.Icon icon={RiBugLine} />
              Item 1
            </Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      const trigger = screen.getByRole('button', { name: 'Item 1' });
      const icons = trigger.querySelectorAll('svg[aria-hidden="true"]');

      expect(icons).toHaveLength(2);
    });
  });

  describe('Snapshots', () => {
    it('should match snapshot for default accordion', () => {
      const { container } = render(
        <Accordion type="single" defaultValue="item-1" collapsible>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for disabled accordion', () => {
      const { container } = render(
        <Accordion type="single" defaultValue="item-1" collapsible disabled>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    it('should match snapshot for contained variant', () => {
      const { container } = render(
        <Accordion type="single" collapsible defaultValue="item-1" contained>
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Content 1</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Content 2</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('data-slot', () => {
    it('marks each part with data-slot', () => {
      const { container } = render(
        <Accordion type="single" defaultValue="item-1" data-testid="root">
          <Accordion.Item value="item-1">
            <Accordion.Trigger>
              <Accordion.Icon icon={RiBugLine} />
              <div>
                <Accordion.Title>Shipping</Accordion.Title>
                <Accordion.Caption>2–4 business days</Accordion.Caption>
              </div>
            </Accordion.Trigger>
            <Accordion.Content>Orders leave within two days.</Accordion.Content>
          </Accordion.Item>
        </Accordion>,
      );

      expect(screen.getByTestId('root')).toHaveAttribute('data-slot', 'accordion');
      const slots = [...container.querySelectorAll('[data-slot]')].map((el) =>
        el.getAttribute('data-slot'),
      );
      expect(slots).toEqual([
        'accordion',
        'accordion-item',
        'accordion-trigger',
        'accordion-icon',
        'accordion-title',
        'accordion-caption',
        'accordion-content',
      ]);
    });
  });
});
