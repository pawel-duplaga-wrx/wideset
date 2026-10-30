import { forwardRef, Fragment, type ReactNode, useImperativeHandle, useState } from 'react';
import { cn } from 'src/lib/utils';
import { generateId } from 'src/logic/helpers';

import { InlineAlert } from './InlineAlert';
import type {
  InlineAlertItem,
  InlineAlertOutletHandle,
  InlineAlertOutletProps,
  InlineAlertShowConfig,
} from './InlineAlert.types';

const InlineAlertOutlet = forwardRef<InlineAlertOutletHandle, InlineAlertOutletProps>(
  ({ className, inlineAlertClassName, messageClassName, ...props }, ref) => {
    const [alerts, setAlerts] = useState<InlineAlertItem[]>([]);

    useImperativeHandle(ref, () => ({
      show: (config: InlineAlertShowConfig) => {
        const id = generateId();
        setAlerts((prev) => [...prev, { ...config, id }]);
        return id;
      },
      dismiss: (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      },
      dismissAll: () => {
        setAlerts([]);
      },
    }));

    const renderActions = (action: ReactNode | ReactNode[]) =>
      Array.isArray(action)
        ? action.map((actionNode, index) => <Fragment key={index}>{actionNode}</Fragment>)
        : action;

    if (alerts.length === 0) return null;

    return (
      <div
        data-slot="inline-alert-outlet"
        className={cn('gap-ws-7 flex flex-col', className)}
        {...props}
      >
        {alerts.map(({ id, status, orientation, title, message, action }) => (
          <InlineAlert
            key={id}
            className={inlineAlertClassName}
            status={status}
            orientation={orientation}
            title={title}
            message={
              messageClassName ? <span className={messageClassName}>{message}</span> : message
            }
            onDismiss={() => setAlerts((prev) => prev.filter((alert) => alert.id !== id))}
          >
            {action && renderActions(action)}
          </InlineAlert>
        ))}
      </div>
    );
  },
);

InlineAlertOutlet.displayName = 'InlineAlert.Outlet';

export { InlineAlertOutlet };
