import type { RemixiconComponentType } from '@remixicon/react';
import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react';
import React, { forwardRef, isValidElement, useState } from 'react';
import { cn } from 'src/lib/utils';

import { IconButton } from '../button/IconButton';
import { SystemAlertContext } from './SystemAlert.context';
import type {
  SystemAlertMessageProps,
  SystemAlertProps,
  SystemAlertStatus,
  SystemAlertWithSubComponents,
} from './SystemAlert.types';
import {
  systemAlertIconVariants,
  systemAlertOnColorActionClassName,
  systemAlertVariants,
} from './SystemAlert.variants';
import { SystemAlertAction } from './SystemAlertAction';
import { SystemAlertMessage } from './SystemAlertMessage';

const iconsMap: Record<SystemAlertStatus, RemixiconComponentType | null> = {
  negative: RiErrorWarningFill,
  notice: RiErrorWarningFill,
  positive: RiCheckboxCircleFill,
  info: RiInformationFill,
  neutral: null,
};

const isSlot = (child: React.ReactNode, slot: React.ElementType) =>
  isValidElement(child) && child.type === slot;

const SystemAlert = forwardRef<HTMLDivElement, SystemAlertProps>(
  (
    {
      className,
      status = 'positive',
      emphasis = 'low',
      dismissed,
      message,
      onDismiss,
      dismissible = true,
      dismissAriaLabel = 'Dismiss',
      children,
      ...props
    },
    ref,
  ) => {
    const [isDismissed, setIsDismissed] = useState(false);

    const isControlled = dismissed !== undefined;
    const isVisible = isControlled ? !dismissed : !isDismissed;

    const childrenArray = React.Children.toArray(children);
    const messageSlot = childrenArray.find((child) => isSlot(child, SystemAlertMessage)) as
      React.ReactElement<SystemAlertMessageProps> | undefined;
    const actions = childrenArray.filter((child) => !isSlot(child, SystemAlertMessage));

    const content = messageSlot?.props.children ?? message;
    const IconComponent = iconsMap[status];
    const actionVariant = emphasis === 'high' && status !== 'notice' ? 'inverse' : 'secondary';
    const hasActionsBlock = actions.length > 0 || dismissible;

    const dismiss = () => {
      if (!isControlled) {
        setIsDismissed(true);
      }

      onDismiss?.();
    };

    if (!isVisible) return null;

    return (
      <SystemAlertContext.Provider value={{ emphasis, status }}>
        <div
          ref={ref}
          data-slot="system-alert"
          className={cn(systemAlertVariants({ status, emphasis }), className)}
          role={status === 'negative' ? 'alert' : 'status'}
          {...props}
        >
          <div className="gap-ws-6 flex min-w-0 items-center py-[0.375rem]">
            {IconComponent && (
              <IconComponent
                aria-hidden="true"
                focusable="false"
                className={systemAlertIconVariants({ status, emphasis })}
              />
            )}
            {content && (
              <span data-slot="system-alert-message" className="typography-label-strong-sm">
                {content}
              </span>
            )}
          </div>

          {hasActionsBlock && (
            <div className="gap-ws-3 flex shrink-0 items-center">
              {actions.length > 0 && actions}

              {dismissible && (
                <IconButton
                  icon={RiCloseLine}
                  preset="ghost"
                  variant={actionVariant}
                  size="xs"
                  aria-label={dismissAriaLabel}
                  onClick={dismiss}
                  className={cn(
                    'shrink-0',
                    emphasis === 'high' && systemAlertOnColorActionClassName,
                  )}
                />
              )}
            </div>
          )}
        </div>
      </SystemAlertContext.Provider>
    );
  },
) as SystemAlertWithSubComponents;

SystemAlert.displayName = 'SystemAlert';

SystemAlert.Message = SystemAlertMessage;
SystemAlert.Action = SystemAlertAction;

export { SystemAlert };
