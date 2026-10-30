import React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { FileUploadProps, FileUploadWithSubComponents } from './FileUpload.types';
import { FileUploadDropzone } from './FileUploadDropzone';
import { FileUploadTrigger } from './FileUploadTrigger';

/**
 * The upload trigger — a dropzone or a button — plus, when a file-handling
 * library hands one over, its hidden file input. Purely presentational: the
 * library owns state, drag tracking and the picker; `onBrowse` is its `open()`.
 */
const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      disabled = false,
      inputProps,
      labels,
      type = 'dropzone',
      browse,
      onBrowse,
      isDragActive,
      zoneProps,
      defaultMotion,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);

    return (
      <div ref={ref} data-slot="file-upload" className={cn('flex flex-col', className)} {...props}>
        {inputProps && (
          // A library's file input, visually hidden and out of the tab order by
          // default — the zone or the Browse button is the control, this is only
          // the mechanism. Anything in `inputProps` overrides these (react-dropzone
          // brings its own `display: none`). `disabled` has to reach the input
          // itself: it sits outside the zone, so the zone's `pointer-events-none`
          // does not cover it.
          <input
            type="file"
            tabIndex={-1}
            {...inputProps}
            disabled={disabled || inputProps.disabled}
            className={cn('sr-only', inputProps.className)}
          />
        )}

        {type === 'button' ? (
          <FileUploadTrigger
            disabled={disabled}
            onBrowse={onBrowse}
            label={labels?.upload}
            defaultMotion={motion}
          />
        ) : (
          <FileUploadDropzone
            disabled={disabled}
            isDragActive={isDragActive}
            browse={browse}
            onBrowse={onBrowse}
            zoneProps={zoneProps}
            labels={labels}
            defaultMotion={motion}
          />
        )}
      </div>
    );
  },
) as FileUploadWithSubComponents;

FileUpload.displayName = 'FileUpload';
FileUpload.Dropzone = FileUploadDropzone;
FileUpload.Trigger = FileUploadTrigger;

export { FileUpload };
