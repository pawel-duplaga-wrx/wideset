import { RiAddLine } from '@remixicon/react';

import { Button } from '../button/Button';
import type { FileUploadTriggerProps } from './FileUpload.types';

/** The compact trigger: a secondary button that opens the file picker. Figma's `File Upload` `Type=Button`. */
export const FileUploadTrigger = ({
  disabled = false,
  onBrowse,
  label,
  defaultMotion,
}: FileUploadTriggerProps) => (
  <Button
    data-slot="file-upload-trigger"
    variant="secondary"
    preset="border"
    size="sm"
    disabled={disabled}
    onClick={onBrowse}
    type="button"
    defaultMotion={defaultMotion}
  >
    <Button.Icon icon={RiAddLine} />
    {label ?? 'Upload'}
  </Button>
);

FileUploadTrigger.displayName = 'FileUpload.Trigger';
