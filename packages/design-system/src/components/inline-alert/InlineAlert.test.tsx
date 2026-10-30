import { act, fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { InlineAlert } from './InlineAlert';
import type { InlineAlertOutletHandle } from './InlineAlert.types';

describe('InlineAlert', () => {
  it('renders title and message via subcomponents', () => {
    render(
      <InlineAlert>
        <InlineAlert.Title>Hello title</InlineAlert.Title>
        <InlineAlert.Message>Hello message</InlineAlert.Message>
      </InlineAlert>,
    );
    expect(screen.getByText('Hello title')).toBeInTheDocument();
    expect(screen.getByText('Hello message')).toBeInTheDocument();
  });

  it('renders title and message via props', () => {
    render(<InlineAlert title="Props title" message="Props message" />);
    expect(screen.getByText('Props title')).toBeInTheDocument();
    expect(screen.getByText('Props message')).toBeInTheDocument();
  });

  it('subcomponent slots override props', () => {
    render(
      <InlineAlert title="Props title" message="Props message">
        <InlineAlert.Title>Slot title</InlineAlert.Title>
        <InlineAlert.Message>Slot message</InlineAlert.Message>
      </InlineAlert>,
    );
    expect(screen.getByText('Slot title')).toBeInTheDocument();
    expect(screen.getByText('Slot message')).toBeInTheDocument();
    expect(screen.queryByText('Props title')).not.toBeInTheDocument();
    expect(screen.queryByText('Props message')).not.toBeInTheDocument();
  });

  it('forwards HTML attributes', () => {
    render(
      <InlineAlert
        message="Content"
        data-testid="test-inline-alert"
        aria-describedby="alert-description"
        id="alert-id"
      />,
    );

    const alert = screen.getByTestId('test-inline-alert');
    expect(alert).toHaveAttribute('aria-describedby', 'alert-description');
    expect(alert).toHaveAttribute('id', 'alert-id');
  });

  it('applies custom className', () => {
    const { container } = render(<InlineAlert className="my-extra-class" message="Content" />);
    expect(container.firstChild).toHaveClass('my-extra-class');
  });

  it('sets role based on status', () => {
    const { rerender } = render(<InlineAlert status="error" message="Error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<InlineAlert status="success" message="Success" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<InlineAlert status="warning" message="Warning" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<InlineAlert status="info" message="Info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders composed title, message, and action', () => {
    render(
      <InlineAlert>
        <InlineAlert.Title>Title</InlineAlert.Title>
        <InlineAlert.Message>Message</InlineAlert.Message>
        <InlineAlert.Action>Retry</InlineAlert.Action>
      </InlineAlert>,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders dismiss button, removes the alert, and calls onDismiss', () => {
    const onDismiss = vi.fn();

    render(
      <InlineAlert onDismiss={onDismiss}>
        <InlineAlert.Message>Dismiss me</InlineAlert.Message>
      </InlineAlert>,
    );

    fireEvent.click(screen.getByLabelText('Dismiss'));

    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button when persistent is true', () => {
    render(
      <InlineAlert persistent onDismiss={vi.fn()}>
        <InlineAlert.Message>Persistent message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();
  });

  it('resets dismissal when alertId changes (uncontrolled)', () => {
    const { rerender } = render(
      <InlineAlert alertId="msg-1" onDismiss={vi.fn()}>
        <InlineAlert.Message>First message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByText('First message')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByText('First message')).not.toBeInTheDocument();

    rerender(
      <InlineAlert alertId="msg-2" onDismiss={vi.fn()}>
        <InlineAlert.Message>Second message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByText('Second message')).toBeInTheDocument();
  });

  it('resets dismissal when messageId changes (uncontrolled)', () => {
    const { rerender } = render(
      <InlineAlert messageId="err-a" onDismiss={vi.fn()}>
        <InlineAlert.Message>First message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByText('First message')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(screen.queryByText('First message')).not.toBeInTheDocument();

    rerender(
      <InlineAlert messageId="err-b" onDismiss={vi.fn()}>
        <InlineAlert.Message>Second message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByText('Second message')).toBeInTheDocument();
  });

  it('respects controlled dismissed prop', () => {
    const onDismiss = vi.fn();
    const { rerender } = render(
      <InlineAlert dismissed={false} onDismiss={onDismiss}>
        <InlineAlert.Message>Controlled message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByText('Controlled message')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Controlled message')).toBeInTheDocument();

    rerender(
      <InlineAlert dismissed onDismiss={onDismiss}>
        <InlineAlert.Message>Controlled message</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.queryByText('Controlled message')).not.toBeInTheDocument();
  });
});

describe('InlineAlert.Action', () => {
  it('renders an action button and forwards props', () => {
    const onClick = vi.fn();

    render(
      <InlineAlert>
        <InlineAlert.Message>Saved</InlineAlert.Message>
        <InlineAlert.Action onClick={onClick}>Undo</InlineAlert.Action>
      </InlineAlert>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('InlineAlert.Outlet', () => {
  it('renders alerts through the imperative ref and dismisses them', () => {
    const ref = createRef<InlineAlertOutletHandle>();

    render(<InlineAlert.Outlet ref={ref} />);

    let id = '';

    act(() => {
      id =
        ref.current?.show({
          status: 'success',
          title: 'Success',
          message: 'Rendered from outlet',
          action: <InlineAlert.Action>View</InlineAlert.Action>,
        }) ?? '';
    });

    expect(id).toMatch(/^inline-alert-/);
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Rendered from outlet')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();

    act(() => {
      ref.current?.dismiss(id);
    });

    expect(screen.queryByText('Rendered from outlet')).not.toBeInTheDocument();
  });

  it('renders multiple composed actions from outlet', () => {
    const ref = createRef<InlineAlertOutletHandle>();

    render(<InlineAlert.Outlet ref={ref} />);

    act(() => {
      ref.current?.show({
        status: 'info',
        message: 'Choose an action',
        action: [
          <InlineAlert.Action key="a">Primary</InlineAlert.Action>,
          <InlineAlert.Action key="b" variant="secondary">
            Secondary
          </InlineAlert.Action>,
        ],
      });
    });

    expect(screen.getByText('Choose an action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Secondary' })).toBeInTheDocument();
  });

  it('applies outlet className props', () => {
    const ref = createRef<InlineAlertOutletHandle>();

    render(
      <InlineAlert.Outlet
        ref={ref}
        data-testid="inline-alert-outlet"
        className="outlet-class"
        inlineAlertClassName="inline-alert-class"
        messageClassName="message-class"
      />,
    );

    act(() => {
      ref.current?.show({
        status: 'info',
        message: 'Styled message',
      });
    });

    expect(screen.getByTestId('inline-alert-outlet')).toHaveClass('outlet-class');
    expect(screen.getByRole('status')).toHaveClass('inline-alert-class');
    expect(screen.getByText('Styled message')).toHaveClass('message-class');
  });
});

describe('InlineAlert Snapshots', () => {
  it('matches snapshot for each variant', () => {
    (['error', 'warning', 'success', 'info'] as const).forEach((status) => {
      const { container } = render(
        <InlineAlert status={status}>
          <InlineAlert.Message>{status} message</InlineAlert.Message>
        </InlineAlert>,
      );

      expect(container.firstChild).toMatchSnapshot(`InlineAlert ${status}`);
    });
  });

  it('matches snapshot for vertical alert with title and action', () => {
    const { container } = render(
      <InlineAlert status="warning" orientation="vertical" className="extra">
        <InlineAlert.Title>Title</InlineAlert.Title>
        <InlineAlert.Message>Vertical content</InlineAlert.Message>
        <InlineAlert.Action>Retry</InlineAlert.Action>
      </InlineAlert>,
    );

    expect(container.firstChild).toMatchSnapshot('InlineAlert vertical full');
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', () => {
    render(
      <InlineAlert status="info">
        <InlineAlert.Title>New billing cycle</InlineAlert.Title>
        <InlineAlert.Message>Invoices are now issued on the 1st.</InlineAlert.Message>
      </InlineAlert>,
    );

    expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'inline-alert');
    expect(screen.getByText('New billing cycle')).toHaveAttribute(
      'data-slot',
      'inline-alert-title',
    );
    expect(screen.getByText('Invoices are now issued on the 1st.')).toHaveAttribute(
      'data-slot',
      'inline-alert-message',
    );
  });

  it('marks the outlet with data-slot', () => {
    const ref = createRef<InlineAlertOutletHandle>();
    const { container } = render(<InlineAlert.Outlet ref={ref} />);

    act(() => {
      ref.current?.show({ status: 'info', message: 'Invoices are now issued on the 1st.' });
    });

    expect(container.firstChild).toHaveAttribute('data-slot', 'inline-alert-outlet');
  });
});
