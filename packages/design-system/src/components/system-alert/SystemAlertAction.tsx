import { cn } from 'src/lib/utils';

import { Button } from '../button/Button';
import { useSystemAlertContext } from './SystemAlert.context';
import type { SystemAlertActionProps } from './SystemAlert.types';
import { systemAlertOnColorActionClassName } from './SystemAlert.variants';

const SystemAlertAction = ({
  preset = 'border',
  variant,
  size = 'xs',
  className,
  children,
  ...props
}: SystemAlertActionProps) => {
  const { emphasis, status } = useSystemAlertContext();

  let resolvedVariant = variant;
  if (!resolvedVariant) {
    resolvedVariant = emphasis === 'high' && status !== 'notice' ? 'inverse' : 'secondary';
  }
  const onColor = !variant && emphasis === 'high';

  return (
    <Button
      data-slot="system-alert-action"
      preset={preset}
      variant={resolvedVariant}
      size={size}
      className={cn(onColor && systemAlertOnColorActionClassName, className)}
      {...props}
    >
      {children}
    </Button>
  );
};

SystemAlertAction.displayName = 'SystemAlert.Action';

export { SystemAlertAction };
