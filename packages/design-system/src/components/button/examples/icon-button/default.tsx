/** The playground's stage: one icon button with its accessible name, its props set from the rail. */
import { RiSettings3Line } from '@remixicon/react';
import { IconButton, type IconButtonProps } from '@wideset/react';

export default function IconButtonDefault(props: Partial<IconButtonProps>) {
  return <IconButton icon={RiSettings3Line} aria-label="Settings" {...props} />;
}
