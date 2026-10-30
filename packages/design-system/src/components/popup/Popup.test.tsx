import { RiCloseLine } from '@remixicon/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';
import { Popup } from './Popup';

describe('Popup', () => {
  it('renders the trigger', () => {
    render(
      <Popup>
        <Popup.Trigger>Open Popup</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Test Popup</Popup.Title>
          </Popup.Header>
        </Popup.Container>
      </Popup>,
    );

    expect(screen.getByRole('button', { name: 'Open Popup' })).toBeInTheDocument();
  });

  it('content is hidden before trigger is clicked', () => {
    render(
      <Popup>
        <Popup.Trigger>Open Popup</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Popup Title</Popup.Title>
          </Popup.Header>
        </Popup.Container>
      </Popup>,
    );

    expect(screen.queryByText('Popup Title')).not.toBeInTheDocument();
  });

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popup>
        <Popup.Trigger>Open Popup</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Popup Title</Popup.Title>
          </Popup.Header>
        </Popup.Container>
      </Popup>,
    );

    await user.click(screen.getByRole('button', { name: 'Open Popup' }));

    await waitFor(() => {
      expect(screen.getByText('Popup Title')).toBeInTheDocument();
    });
  });

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Popup Title</Popup.Title>
            <Popup.Close asChild>
              <IconButton
                aria-label="Close popup"
                icon={RiCloseLine}
                preset="border"
                variant="secondary"
                size="sm"
                className="size-ws-forms-sm p-0"
              />
            </Popup.Close>
          </Popup.Header>
        </Popup.Container>
      </Popup>,
    );

    await waitFor(() => {
      expect(screen.getByText('Popup Title')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Close popup' }));

    await waitFor(() => {
      expect(screen.queryByText('Popup Title')).not.toBeInTheDocument();
    });
  });

  it('stays open on outside click when persistent', async () => {
    const user = userEvent.setup();
    render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container persistent>
          <Popup.Header>
            <Popup.Title>Persistent Popup</Popup.Title>
          </Popup.Header>
        </Popup.Container>
      </Popup>,
    );

    await waitFor(() => {
      expect(screen.getByText('Persistent Popup')).toBeInTheDocument();
    });

    await user.click(document.body);

    expect(screen.getByText('Persistent Popup')).toBeInTheDocument();
  });
});

describe('Popup.Content', () => {
  it('renders children', async () => {
    const user = userEvent.setup();
    render(
      <Popup>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Content>Test content</Popup.Content>
        </Popup.Container>
      </Popup>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });
});

describe('Popup.Footer', () => {
  it('renders footer actions', async () => {
    const user = userEvent.setup();
    render(
      <Popup>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Footer>
            <Button preset="filled">Confirm</Button>
          </Popup.Footer>
        </Popup.Container>
      </Popup>,
    );

    await user.click(screen.getByRole('button', { name: 'Open' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    });
  });
});

describe('Popup Snapshots', () => {
  it('matches snapshot for default popup', () => {
    const { baseElement } = render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Snapshot Title</Popup.Title>
          </Popup.Header>
          <Popup.Content>Snapshot Content</Popup.Content>
          <Popup.Footer>
            <Button preset="filled">Save</Button>
            <Popup.Close asChild>
              <Button variant="secondary" preset="border">
                Cancel
              </Button>
            </Popup.Close>
          </Popup.Footer>
        </Popup.Container>
      </Popup>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot for popup with description', () => {
    const { baseElement } = render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Popup Title</Popup.Title>
          </Popup.Header>
          <Popup.Content>
            <Popup.Description>Snapshot Description</Popup.Description>
          </Popup.Content>
          <Popup.Footer>
            <Button preset="filled">Save</Button>
          </Popup.Footer>
        </Popup.Container>
      </Popup>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot for persistent popup', () => {
    const { baseElement } = render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container persistent>
          <Popup.Header>
            <Popup.Title>Persistent Popup</Popup.Title>
          </Popup.Header>
          <Popup.Content>Persistent content</Popup.Content>
        </Popup.Container>
      </Popup>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot for popup with header only', () => {
    const { baseElement } = render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Header Only</Popup.Title>
          </Popup.Header>
          <Popup.Content>Content without footer</Popup.Content>
        </Popup.Container>
      </Popup>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('matches snapshot for popup with footer', () => {
    const { baseElement } = render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>With Footer</Popup.Title>
          </Popup.Header>
          <Popup.Content>Content</Popup.Content>
          <Popup.Footer>
            <Button preset="filled">Accept</Button>
          </Popup.Footer>
        </Popup.Container>
      </Popup>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', async () => {
    render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container aria-label="Share">
          <Popup.Header>
            <Popup.Title>Title</Popup.Title>
            <Popup.Close>Close</Popup.Close>
          </Popup.Header>
          <Popup.Content>
            <Popup.Description>Description</Popup.Description>
          </Popup.Content>
          <Popup.Footer>Footer</Popup.Footer>
        </Popup.Container>
      </Popup>,
    );
    await waitFor(() => expect(screen.getByText('Title')).toBeInTheDocument());
    expect(screen.getByText('Open')).toHaveAttribute('data-slot', 'popup-trigger');
    expect(screen.getByRole('dialog', { name: 'Share' })).toHaveAttribute(
      'data-slot',
      'popup-container',
    );
    expect(document.querySelector('[data-slot="popup-header"]')).toContainElement(
      screen.getByText('Title'),
    );
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'popup-title');
    expect(screen.getByText('Close')).toHaveAttribute('data-slot', 'popup-close');
    expect(document.querySelector('[data-slot="popup-content"]')).toContainElement(
      screen.getByText('Description'),
    );
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'popup-description');
    expect(screen.getByText('Footer')).toHaveAttribute('data-slot', 'popup-footer');
  });
});

describe('accessibility', () => {
  it('names the dialog after Popup.Title and describes it with Popup.Description', async () => {
    render(
      <Popup defaultOpen>
        <Popup.Trigger>Open</Popup.Trigger>
        <Popup.Container>
          <Popup.Header>
            <Popup.Title>Share project</Popup.Title>
          </Popup.Header>
          <Popup.Content>
            <Popup.Description>Anyone with the link can view.</Popup.Description>
          </Popup.Content>
        </Popup.Container>
      </Popup>,
    );
    const dialog = await screen.findByRole('dialog', { name: 'Share project' });
    expect(dialog).toHaveAccessibleDescription('Anyone with the link can view.');
  });

  it('keeps a caller-supplied id on the title', async () => {
    render(
      <Popup defaultOpen>
        <Popup.Container>
          <Popup.Title id="share-title">Share project</Popup.Title>
        </Popup.Container>
      </Popup>,
    );
    const dialog = await screen.findByRole('dialog', { name: 'Share project' });
    expect(dialog).toHaveAttribute('aria-labelledby', 'share-title');
  });

  it("lets the caller's aria-label win over the title", async () => {
    render(
      <Popup defaultOpen>
        <Popup.Container aria-label="Sharing options">
          <Popup.Title>Share project</Popup.Title>
        </Popup.Container>
      </Popup>,
    );
    expect(await screen.findByRole('dialog', { name: 'Sharing options' })).not.toHaveAttribute(
      'aria-labelledby',
    );
  });

  it('sets no aria-labelledby without a title', async () => {
    render(
      <Popup defaultOpen>
        <Popup.Container aria-label="Filters">
          <Popup.Content>Body</Popup.Content>
        </Popup.Container>
      </Popup>,
    );
    const dialog = await screen.findByRole('dialog', { name: 'Filters' });
    expect(dialog).not.toHaveAttribute('aria-labelledby');
    expect(dialog).not.toHaveAttribute('aria-describedby');
  });
});
