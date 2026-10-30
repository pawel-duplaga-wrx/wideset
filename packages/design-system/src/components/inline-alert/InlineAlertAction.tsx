import { cn } from 'src/lib/utils';

import { Button } from '../button/Button';
import type { InlineAlertActionProps } from './InlineAlert.types';

const InlineAlertAction = ({
  preset = 'border',
  variant = 'secondary',
  size = 'sm',
  children,
  className,
  ...props
}: InlineAlertActionProps) => (
  <Button
    data-slot="inline-alert-action"
    preset={preset}
    variant={variant}
    size={size}
    // Figma tints the action label with the alert's on-subtle status colour, which
    // the root already sets — inherit it over the Button's own secondary text token.
    className={cn('text-inherit', className)}
    {...props}
  >
    {children}
  </Button>
);

InlineAlertAction.displayName = 'InlineAlert.Action';

export { InlineAlertAction };
