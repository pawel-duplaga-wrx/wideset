import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  describe('Dropzone variant (default)', () => {
    it('should render dropzone by default', () => {
      render(<FileUpload browse onBrowse={vi.fn()} />);
      expect(screen.getByText(/drop files/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /browse files/i })).toBeInTheDocument();
    });

    it('should render dropzone when type is explicitly "dropzone"', () => {
      render(<FileUpload type="dropzone" browse onBrowse={vi.fn()} />);
      expect(screen.getByText(/drop files/i)).toBeInTheDocument();
    });

    it('makes the zone itself the control without browse (Type=Area)', () => {
      render(<FileUpload onBrowse={vi.fn()} />);
      expect(screen.getByText('Click or drop files to upload')).toBeInTheDocument();

      const zone = screen.getByRole('button', { name: 'Click or drop files to upload' });
      expect(zone).toHaveAttribute('tabindex', '0');
      expect(screen.queryByRole('button', { name: /browse files/i })).not.toBeInTheDocument();
    });

    it('opens the picker from the Area zone by click, Enter and Space', async () => {
      const onBrowse = vi.fn();
      const user = userEvent.setup();
      render(<FileUpload onBrowse={onBrowse} />);
      const zone = screen.getByRole('button', { name: /click or drop/i });

      await user.click(zone);
      zone.focus();
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      expect(onBrowse).toHaveBeenCalledTimes(3);
    });

    it('takes the Area zone out of the tab order and ignores activation when disabled', () => {
      const onBrowse = vi.fn();
      render(<FileUpload disabled onBrowse={onBrowse} />);
      const zone = screen.getByRole('button', { name: /click or drop/i });

      expect(zone).toHaveAttribute('tabindex', '-1');
      expect(zone).toHaveAttribute('aria-disabled', 'true');
      fireEvent.keyDown(zone, { key: 'Enter' });
      expect(onBrowse).not.toHaveBeenCalled();
    });

    it("keeps only the drag props from a library's root props, on both types", async () => {
      const onBrowse = vi.fn();
      const onClick = vi.fn();
      const onDrop = vi.fn();
      const user = userEvent.setup();
      const zoneProps = { onClick, onDrop, tabIndex: 0, role: 'presentation' };
      const { container, rerender } = render(
        <FileUpload onBrowse={onBrowse} zoneProps={zoneProps} />,
      );
      const zone = () => container.querySelector('.rounded-ws-container-md')!;

      // Type=Area: activation is the component's, so the picker opens once.
      await user.click(zone());
      expect(onBrowse).toHaveBeenCalledTimes(1);
      expect(onClick).not.toHaveBeenCalled();
      expect(zone()).toHaveAttribute('role', 'button');
      fireEvent.drop(zone());
      expect(onDrop).toHaveBeenCalledTimes(1);

      // Type=Button: the zone is a drop target and nothing else.
      rerender(<FileUpload browse onBrowse={onBrowse} zoneProps={zoneProps} />);
      await user.click(zone());
      expect(onBrowse).toHaveBeenCalledTimes(1);
      expect(zone()).not.toHaveAttribute('tabindex');
      expect(zone()).not.toHaveAttribute('role');
      fireEvent.drop(zone());
      expect(onDrop).toHaveBeenCalledTimes(2);
    });

    it('should call onBrowse when browse button is clicked', async () => {
      const onBrowse = vi.fn();
      const user = userEvent.setup();
      render(<FileUpload browse onBrowse={onBrowse} />);
      await user.click(screen.getByRole('button', { name: /browse files/i }));
      expect(onBrowse).toHaveBeenCalledTimes(1);
    });

    it('should show drag active label', () => {
      render(<FileUpload isDragActive browse onBrowse={vi.fn()} />);
      expect(screen.getByText('Drop files here')).toBeInTheDocument();
    });

    it('takes the hover look while a file is dragged over it', () => {
      const { container } = render(<FileUpload isDragActive browse onBrowse={vi.fn()} />);
      const zone = container.querySelector('.rounded-ws-container-md')!;
      expect(zone).toHaveClass('bg-ws-dynamic-secondary-alpha-hover');
      expect(zone.className).toContain(
        '[--dropzone-stroke:var(--border-color-ws-dynamic-secondary-hover)]',
      );
    });

    it('arms hover on Type=Area only, and stays flat until something is dragged', () => {
      const { container, rerender } = render(<FileUpload onBrowse={vi.fn()} />);
      const zone = () => container.querySelector('.rounded-ws-container-md')!;
      expect(zone()).not.toHaveClass('bg-ws-dynamic-secondary-alpha-hover');
      expect(zone()).toHaveClass('hover:bg-ws-dynamic-secondary-alpha-hover');

      // Type=Button hovers its Browse button alone, as Figma draws it.
      rerender(<FileUpload browse onBrowse={vi.fn()} />);
      expect(zone()).not.toHaveClass('hover:bg-ws-dynamic-secondary-alpha-hover');
      expect(zone()).toHaveClass('cursor-default');
    });

    it('sets the focus ring colour before focus, so the ring does not flash black', () => {
      const { container } = render(<FileUpload onBrowse={vi.fn()} />);
      const zone = container.querySelector('.rounded-ws-container-md')!;
      // `transition-colors` covers `outline-color`; a colour applied only under
      // `focus-visible` would animate in from `currentColor`.
      expect(zone).toHaveClass('outline-ws-dynamic-primary-strong-default');
      expect(zone).not.toHaveClass('focus-visible:outline-ws-dynamic-primary-strong-default');
    });

    it('should disable the browse button', () => {
      render(<FileUpload disabled browse onBrowse={vi.fn()} />);
      expect(screen.getByRole('button', { name: /browse files/i })).toBeDisabled();
    });

    it("renders a library's input as a file input, visually hidden and out of the tab order", () => {
      const { rerender } = render(
        <FileUpload onBrowse={vi.fn()} inputProps={{ 'aria-label': 'Choose files' }} />,
      );
      const input = () => screen.getByLabelText('Choose files');

      expect(input()).toHaveAttribute('type', 'file');
      expect(input()).toHaveAttribute('tabindex', '-1');
      expect(input()).toHaveClass('sr-only');

      // The library's own input props win over the defaults.
      rerender(
        <FileUpload
          onBrowse={vi.fn()}
          inputProps={{ 'aria-label': 'Choose files', className: 'not-sr-only', tabIndex: 0 }}
        />,
      );
      expect(input()).toHaveAttribute('tabindex', '0');
      expect(input()).toHaveClass('not-sr-only');
      expect(input()).not.toHaveClass('sr-only');
    });

    it('disables the hidden input', () => {
      render(
        <FileUpload disabled onBrowse={vi.fn()} inputProps={{ 'aria-label': 'Choose files' }} />,
      );
      expect(screen.getByLabelText('Choose files')).toBeDisabled();
    });
  });

  describe('Button variant', () => {
    it('should render upload button when type is "button"', () => {
      render(<FileUpload type="button" onBrowse={vi.fn()} />);
      expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
    });

    it('should call onBrowse when upload button is clicked', async () => {
      const onBrowse = vi.fn();
      const user = userEvent.setup();
      render(<FileUpload type="button" onBrowse={onBrowse} />);
      await user.click(screen.getByRole('button', { name: /upload/i }));
      expect(onBrowse).toHaveBeenCalledTimes(1);
    });

    it('should not render dropzone', () => {
      render(<FileUpload type="button" onBrowse={vi.fn()} />);
      expect(screen.queryByText(/drop files/i)).not.toBeInTheDocument();
    });

    it('should take a custom label and disabled', () => {
      render(<FileUpload type="button" onBrowse={vi.fn()} labels={{ upload: 'Add' }} disabled />);
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
    });
  });

  describe('parts', () => {
    it('exposes Dropzone and Trigger for standalone use', () => {
      render(
        <>
          <FileUpload.Dropzone browse onBrowse={vi.fn()} />
          <FileUpload.Trigger onBrowse={vi.fn()} label="Attach" />
        </>,
      );
      expect(screen.getByRole('button', { name: /browse files/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Attach' })).toBeInTheDocument();
    });
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', () => {
    const { container } = render(<FileUpload browse onBrowse={vi.fn()} />);
    expect(container.firstChild).toHaveAttribute('data-slot', 'file-upload');
    expect(container.querySelectorAll('[data-slot="file-upload-dropzone"]')).toHaveLength(1);
  });

  it('lets zoneProps override the dropzone slot', () => {
    const { container } = render(
      <FileUpload
        onBrowse={vi.fn()}
        zoneProps={{ 'data-slot': 'avatar-drop' } as React.HTMLAttributes<HTMLElement>}
      />,
    );
    expect(container.querySelectorAll('[data-slot="avatar-drop"]')).toHaveLength(1);
  });
});

describe('FileUpload Snapshots', () => {
  it('matches snapshot for dropzone variant', () => {
    const { container } = render(<FileUpload browse onBrowse={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for the Area dropzone', () => {
    const { container } = render(<FileUpload onBrowse={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for dropzone with drag active', () => {
    const { container } = render(<FileUpload isDragActive browse onBrowse={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for button variant', () => {
    const { container } = render(<FileUpload type="button" onBrowse={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for disabled dropzone', () => {
    const { container } = render(<FileUpload disabled browse onBrowse={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
