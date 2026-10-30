import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SystemAlert } from './SystemAlert';

describe('SystemAlert', () => {
  it('renders action content and forwards clicks', () => {
    const onClick = vi.fn();

    render(
      <SystemAlert message="Saved">
        <SystemAlert.Action onClick={onClick}>Undo</SystemAlert.Action>
      </SystemAlert>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('dismisses uncontrolled alerts and calls onDismiss', () => {
    const onDismiss = vi.fn();

    render(<SystemAlert message="Dismiss me" onDismiss={onDismiss} />);

    fireEvent.click(screen.getByLabelText('Dismiss'));

    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('respects controlled dismissed prop', () => {
    const onDismiss = vi.fn();
    const { rerender } = render(
      <SystemAlert dismissed={false} message="Controlled" onDismiss={onDismiss} />,
    );

    expect(screen.getByText('Controlled')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Dismiss'));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Controlled')).toBeTruthy();

    rerender(<SystemAlert dismissed message="Controlled" onDismiss={onDismiss} />);

    expect(screen.queryByText('Controlled')).not.toBeInTheDocument();
  });
});

describe('SystemAlert.Action', () => {
  it('throws when used outside SystemAlert', () => {
    expect(() => render(<SystemAlert.Action>Undo</SystemAlert.Action>)).toThrow(
      'useSystemAlertContext must be used within a SystemAlert',
    );
  });
});

describe('SystemAlert Snapshots', () => {
  it('matches snapshot for message via subcomponent', () => {
    const { container } = render(
      <SystemAlert>
        <SystemAlert.Message>System message</SystemAlert.Message>
      </SystemAlert>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for message via props', () => {
    const { container } = render(<SystemAlert message="Prop message" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot when slot message overrides message prop', () => {
    const { container } = render(
      <SystemAlert message="Prop message">
        <SystemAlert.Message>Slot message</SystemAlert.Message>
      </SystemAlert>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom className and HTML attributes', () => {
    const { container } = render(
      <SystemAlert
        message="Styled"
        className="custom-class"
        data-testid="system-alert"
        aria-describedby="system-alert-description"
        id="system-alert-id"
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for each status', () => {
    (['negative', 'notice', 'positive', 'info', 'neutral'] as const).forEach((status) => {
      const { container } = render(
        <SystemAlert
          status={status}
          message={`${status} message`}
          dismissible={status !== 'neutral'}
        />,
      );

      expect(container.firstChild).toMatchSnapshot(`SystemAlert ${status}`);
    });
  });

  it('matches snapshot for each emphasis', () => {
    (['low', 'high'] as const).forEach((emphasis) => {
      const { container } = render(
        <SystemAlert emphasis={emphasis} status="positive" message={`${emphasis} emphasis`} />,
      );

      expect(container.firstChild).toMatchSnapshot(`SystemAlert ${emphasis}`);
    });
  });

  it('matches snapshot without dismiss button', () => {
    const { container } = render(<SystemAlert dismissible={false} message="Persistent" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot without a status icon for neutral alerts', () => {
    const { container } = render(
      <SystemAlert status="neutral" message="Neutral" dismissible={false} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with action and dismiss button', () => {
    const { container } = render(
      <SystemAlert status="info" message="With action">
        <SystemAlert.Action>Review</SystemAlert.Action>
      </SystemAlert>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', () => {
    render(
      <SystemAlert status="info">
        <SystemAlert.Message>A new version is ready to install</SystemAlert.Message>
      </SystemAlert>,
    );

    expect(screen.getByRole('status')).toHaveAttribute('data-slot', 'system-alert');
    expect(screen.getByText('A new version is ready to install')).toHaveAttribute(
      'data-slot',
      'system-alert-message',
    );
  });
});
