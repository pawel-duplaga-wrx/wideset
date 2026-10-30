import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { FileUploadDropzone } from './FileUploadDropzone';
import type { FileUploadTrigger } from './FileUploadTrigger';

export type FileUploadLabels = {
  /** Instruction displayed in the idle dropzone. */
  dropzone?: ReactNode;
  /** Instruction displayed while dragging files over the dropzone. */
  dropzoneActive?: ReactNode;
  /** Text accompanying the Browse button inside the dropzone. */
  dropzoneBrowse?: ReactNode;
  /** Label for the Browse button. */
  browse?: ReactNode;
  /** Label for the compact upload trigger. */
  upload?: ReactNode;
};

/** The drop area: with `browse` it carries a Browse button, otherwise the whole zone is the control. */
export type FileUploadDropzoneProps = MotionProps & {
  /** Disables the trigger and the Browse button. */
  disabled?: boolean;
  /** Marks the dropzone as actively receiving a drag — typically from react-dropzone. */
  isDragActive?: boolean;
  /** Renders the Browse button — Figma's `Type=Button`. Without it the zone itself is the control (`Type=Area`). */
  browse?: boolean;
  /** Opens the file picker — a file-handling library's `open()`. Called from the Browse button, or from the zone itself on `Type=Area`. */
  onBrowse: () => void;
  /**
   * Spread onto the zone — a file-handling library's root props, for drag and
   * drop. Only the drag props are kept: `onClick`, `onKeyDown`, `onKeyUp`,
   * `tabIndex` and `role` are dropped, since activation is the component's
   * and ends in `onBrowse`.
   */
  zoneProps?: HTMLAttributes<HTMLElement>;
  /** Override default text labels for the dropzone, active dropzone, browse button, and upload button. */
  labels?: Pick<FileUploadLabels, 'dropzone' | 'dropzoneActive' | 'dropzoneBrowse' | 'browse'>;
};

/** The control that opens or toggles the associated content. */
export type FileUploadTriggerProps = MotionProps & {
  /** Disables the trigger and the Browse button. */
  disabled?: boolean;
  /** Opens the file picker — a file-handling library’s `open()`. Called from the Browse button, from the `Type=Area` zone, or from the button trigger. */
  onBrowse: () => void;
  /** Visible label for the control. */
  label?: ReactNode;
};

/** A file browsing trigger or dropzone connected to an upload handler. */
export type FileUploadProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  MotionProps & {
    /** The dropzone (default) or the compact button trigger — Figma's `File Upload` `Type`. */
    type?: 'dropzone' | 'button';
    /** Disables the trigger and the Browse button. */
    disabled?: boolean;
    /** Dropzone only: renders the Browse button inside the zone — Figma's `Type=Button`. */
    browse?: boolean;
    /** Opens the file picker — a file-handling library's `open()`. */
    onBrowse: () => void;
    /**
     * Renders a hidden `<input type="file">` with these props — a file-handling
     * library's input props. `type="file"`, `sr-only` and `tabIndex={-1}` are
     * the defaults; anything given here wins.
     */
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    /** Override default text labels for the dropzone, active dropzone, browse button, and upload button. */
    labels?: FileUploadLabels;
    /** Dropzone only: marks the zone as receiving a drag. */
    isDragActive?: boolean;
    /** Dropzone only: spread onto the zone — a library's root props, drag props only. */
    zoneProps?: HTMLAttributes<HTMLElement>;
  };

export type FileUploadWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<FileUploadProps> & RefAttributes<HTMLDivElement>
> & {
  Dropzone: typeof FileUploadDropzone;
  Trigger: typeof FileUploadTrigger;
};
