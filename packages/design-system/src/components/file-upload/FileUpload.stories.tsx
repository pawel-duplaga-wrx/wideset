import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { fn } from 'storybook/test';

import { exampleStory } from '../../stories/example';
import StatesExample from './examples/file-upload/states';
import statesSource from './examples/file-upload/states?raw';
import TypesExample from './examples/file-upload/types';
import typesSource from './examples/file-upload/types?raw';
import { FileItem } from './FileItem';
import { FileUpload } from './FileUpload';
import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadTrigger } from './FileUploadTrigger';

const meta = {
  title: 'Form/FileUpload/FileUpload',
  tags: ['autodocs'],
  component: FileUpload,
  subcomponents: {
    'FileUpload.Dropzone': FileUploadDropzone,
    'FileUpload.Trigger': FileUploadTrigger,
  },
  parameters: {
    docs: {
      description: {
        component: `FileUpload presents a dropzone or button with a hidden file input. Pairs with a file-handling library (e.g. react-dropzone); the consumer owns all state, drag tracking, and input wiring. Purely presentational.

The files go beneath it as \`FileItem\` rows — see **Composition** for the layout Figma draws, and **WithReactDropzone** for a working integration.`,
      },
    },
  },
  args: {
    onBrowse: fn(),
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    type: {
      control: 'radio',
      options: ['dropzone', 'button'],
      table: {
        category: 'Appearance',
        type: { summary: "'dropzone' | 'button'" },
        defaultValue: { summary: "'dropzone'" },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labels: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'FileUploadLabels' },
      },
    },
    browse: {
      if: { arg: 'type', eq: 'dropzone' },
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onBrowse: {
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    isDragActive: {
      control: false,
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    zoneProps: {
      control: false,
      table: { category: 'Behavior', type: { summary: 'HTMLAttributes<HTMLElement>' } },
    },
    inputProps: {
      control: false,
      table: { category: 'Behavior', type: { summary: 'InputHTMLAttributes<HTMLInputElement>' } },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  args: {
    type: 'dropzone',
    browse: false,
    disabled: false,
  },
  render: (args) => (
    <div className="max-w-3xl">
      <FileUpload {...args} />
    </div>
  ),
};

export const Types: Story = exampleStory(TypesExample, typesSource);

export const WithReactDropzone: Story = {
  render: function Render() {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    const ACCEPTED_TYPES = {
      'image/*': [],
      'video/*': [],
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    };

    function formatBytes(bytes: number): string {
      if (bytes === 0) return '0 B';
      const units = ['B', 'KB', 'MB', 'GB'];
      const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
      return `${parseFloat((bytes / 1024 ** i).toFixed(1))} ${units[i]}`;
    }

    function rejectionReason(errors: FileRejection['errors']): {
      title: string;
      description: string;
    } {
      const code = errors[0]?.code;
      if (code === 'file-too-large')
        return { title: 'File too large', description: 'Maximum file size is 10 MB.' };
      if (code === 'file-invalid-type')
        return {
          title: 'Unsupported file type',
          description: 'Accepted: images, video, PDF, ZIP, DOC/DOCX, XLS/XLSX, CSV.',
        };
      return { title: 'Upload failed', description: errors[0]?.message ?? 'Unknown error.' };
    }

    type UploadedFile = {
      id: string;
      name: string;
      mimeType: string;
      size: string;
      /** Object URL for pictures — the thumbnail shows it instead of the file kind. */
      previewUrl?: string;
      uploading?: boolean;
      timeLeft?: string;
      error?: { title: string; description: string };
    };

    const [files, setFiles] = useState<UploadedFile[]>([]);

    const simulateUpload = useCallback((id: string) => {
      const duration = 3000 + Math.random() * 3000;
      const start = Date.now();

      const tick = () => {
        const remaining = Math.max(0, duration - (Date.now() - start));
        const seconds = Math.ceil(remaining / 1000);

        if (remaining < 100) {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, uploading: false, timeLeft: undefined } : f)),
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === id && f.uploading
                ? { ...f, timeLeft: `${seconds} second${seconds !== 1 ? 's' : ''} left` }
                : f,
            ),
          );
          setTimeout(tick, 500);
        }
      };

      setTimeout(tick, 500);
    }, []);

    const onDrop = useCallback(
      (accepted: File[], rejected: FileRejection[]) => {
        const rejectedItems: UploadedFile[] = rejected.map(({ file, errors }) => ({
          id: crypto.randomUUID(),
          name: file.name,
          mimeType: file.type,
          size: formatBytes(file.size),
          error: rejectionReason(errors),
        }));

        const acceptedItems: UploadedFile[] = accepted.map((f) => ({
          id: crypto.randomUUID(),
          name: f.name,
          mimeType: f.type,
          size: formatBytes(f.size),
          uploading: true,
          timeLeft: 'Calculating…',
          previewUrl: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
        }));

        setFiles((prev) => [...prev, ...rejectedItems, ...acceptedItems]);
        acceptedItems.forEach((item) => simulateUpload(item.id));
      },
      [simulateUpload],
    );

    const onRemove = useCallback((id: string) => {
      setFiles((prev) => {
        const removed = prev.find((f) => f.id === id);
        if (removed?.previewUrl) URL.revokeObjectURL(removed.previewUrl);
        return prev.filter((f) => f.id !== id);
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      multiple: true,
      maxSize: MAX_FILE_SIZE,
      accept: ACCEPTED_TYPES,
      // Activation belongs to FileUpload (`onBrowse={open}`); react-dropzone only tracks the drag.
      noClick: true,
      noKeyboard: true,
      // `open()` goes through the hidden input, not the File System Access API — reliable in every browser and inside iframes.
      useFsAccessApi: false,
    });

    return (
      <div className="gap-ws-7 flex w-96 flex-col">
        <FileUpload
          browse
          zoneProps={getRootProps()}
          inputProps={getInputProps()}
          isDragActive={isDragActive}
          onBrowse={open}
        />

        {files.length > 0 && (
          <div className="gap-ws-5 flex flex-col">
            {files.map((file) => (
              <FileItem
                key={file.id}
                isLoading={file.uploading}
                error={file.error?.title}
                onRemove={() => onRemove(file.id)}
              >
                {file.previewUrl ? (
                  <FileItem.Thumbnail src={file.previewUrl} alt="" />
                ) : (
                  <FileItem.Thumbnail name={file.name} mimeType={file.mimeType} />
                )}
                <FileItem.Title>{file.name}</FileItem.Title>
                <FileItem.Description>
                  {file.size}
                  {file.uploading && file.timeLeft}
                </FileItem.Description>
                {file.error && (
                  <span className="typography-body-md text-ws-static-base">
                    {file.error.description}
                  </span>
                )}
              </FileItem>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Complete integration with react-dropzone: drag-and-drop from anywhere on the zone (`getRootProps` with `noClick` / `noKeyboard`), the file picker from the Browse button via react-dropzone’s `open` (clicking the zone itself is `Type=Area`’s job, not this variant’s), size validation (max 10 MB), type filtering, a simulated upload countdown, and remove. Each row’s thumbnail is picked from the dropped file’s MIME type, pictures show a live preview via an object URL, and rejected files show an inline error immediately. All logic lives in the consumer — `FileUpload` and `FileItem` are purely presentational.',
      },
    },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: (args) => (
    <div className="gap-ws-20 flex max-w-3xl flex-col">
      <section className="gap-ws-3 flex flex-col">
        <h3 className="typography-label-strong-sm text-ws-static-strong">Dropzone</h3>
        <FileUpload {...args} type="dropzone" browse={false} />
      </section>

      <section className="gap-ws-3 flex flex-col">
        <h3 className="typography-label-strong-sm text-ws-static-strong">
          Dropzone with browse button
        </h3>
        <FileUpload {...args} type="dropzone" browse />
      </section>

      <section className="gap-ws-3 flex flex-col">
        <h3 className="typography-label-strong-sm text-ws-static-strong">Button trigger</h3>
        <FileUpload {...args} type="button" />
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three trigger modes in the disabled state — no interaction is possible.',
      },
    },
  },
};

export const Composition: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="gap-ws-7 flex max-w-3xl flex-col">
      <FileUpload {...args} browse />

      <div className="gap-ws-5 flex flex-col">
        <FileItem isLoading>
          <FileItem.Thumbnail name="report.pdf" />
          <FileItem.Title>report.pdf</FileItem.Title>
          <FileItem.Description>1.2 MB{'2 seconds left'}</FileItem.Description>
        </FileItem>

        <FileItem onRemove={() => {}}>
          <FileItem.Thumbnail name="photo.jpg" />
          <FileItem.Title>photo.jpg</FileItem.Title>
          <FileItem.Description>3.4 MB</FileItem.Description>
        </FileItem>

        <FileItem error="File too large" onRemove={() => {}}>
          <FileItem.Thumbnail name="archive.zip" />
          <FileItem.Title>archive.zip</FileItem.Title>
          <FileItem.Description>12 MB</FileItem.Description>
          <span className="typography-body-md text-ws-static-base">
            Maximum file size is 10 MB.
          </span>
        </FileItem>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The composition Figma draws as `File Upload`: the trigger, then the `FileItem` rows 12px beneath it and 8px apart (`gap-ws-7` / `gap-ws-5`). One row uploading, one done, one failed — each thumbnail read off the file name.',
      },
    },
  },
};
