import type { RemixiconComponentType } from '@remixicon/react';
import {
  RiCheckboxCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
} from '@remixicon/react';
import React, { forwardRef, isValidElement, useEffect, useState } from 'react';
import { cn } from 'src/lib/utils';

import { IconButton } from '../button/IconButton';
import type {
  InlineAlertMessageProps,
  InlineAlertProps,
  InlineAlertStatus,
  InlineAlertTitleProps,
  InlineAlertWithSubComponents,
} from './InlineAlert.types';
import { inlineAlertIconVariants, inlineAlertVariants } from './InlineAlert.variants';
import { InlineAlertAction } from './InlineAlertAction';
import { InlineAlertMessage } from './InlineAlertMessage';
import { InlineAlertOutlet } from './InlineAlertOutlet';
import { InlineAlertTitle } from './InlineAlertTitle';

const iconsMap: Record<InlineAlertStatus, RemixiconComponentType> = {
  error: RiErrorWarningFill,
  warning: RiErrorWarningFill,
  success: RiCheckboxCircleFill,
  info: RiInformationFill,
};

const isSlot = (child: React.ReactNode, slot: React.ElementType) =>
  isValidElement(child) && child.type === slot;

const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  (
    {
      className,
      status = 'info',
      orientation = 'horizontal',
      alertId,
      messageId,
      dismissed,
      title,
      message,
      onDismiss,
      persistent = false,
      dismissAriaLabel = 'Dismiss',
      children,
      ...props
    },
    ref,
  ) => {
    const IconComponent = iconsMap[status as InlineAlertStatus];
    const childrenArray = React.Children.toArray(children);
    const [isDismissed, setIsDismissed] = useState(false);

    const isControlled = dismissed !== undefined;
    const isVisible = isControlled ? !dismissed : !isDismissed;

    useEffect(() => {
      if (isControlled || (!alertId && !messageId)) return;
      setIsDismissed(false);
    }, [alertId, messageId, isControlled]);

    const dismiss = () => {
      if (!isControlled) {
        setIsDismissed(true);
      }

      onDismiss?.();
    };

    const titleSlot = childrenArray.find((child) => isSlot(child, InlineAlertTitle)) as
      React.ReactElement<InlineAlertTitleProps> | undefined;

    const messageSlot = childrenArray.find((child) => isSlot(child, InlineAlertMessage)) as
      React.ReactElement<InlineAlertMessageProps> | undefined;

    const actions = childrenArray.filter(
      (child) => !isSlot(child, InlineAlertTitle) && !isSlot(child, InlineAlertMessage),
    );

    const resolvedTitle = titleSlot ? titleSlot.props.children : title;
    const resolvedMessage = messageSlot ? messageSlot.props.children : message;

    const icon = (
      <IconComponent
        aria-hidden="true"
        focusable="false"
        className={inlineAlertIconVariants({ status })}
      />
    );

    const textContent = (
      <div className="gap-ws-2 flex flex-1 flex-col">
        {resolvedTitle && (
          <span data-slot="inline-alert-title" className="typography-label-strong-sm">
            {resolvedTitle}
          </span>
        )}
        {resolvedMessage && (
          <span data-slot="inline-alert-message" className="typography-body-md">
            {resolvedMessage}
          </span>
        )}
      </div>
    );

    const actionsContent = actions.length > 0 && (
      <div className="gap-ws-5 flex shrink-0 items-center">{actions}</div>
    );

    const closeButton = persistent ? null : (
      <IconButton
        icon={RiCloseLine}
        preset="ghost"
        variant="secondary"
        size="sm"
        aria-label={dismissAriaLabel}
        onClick={dismiss}
        className={cn('text-inherit', orientation === 'horizontal' && 'self-center')}
      />
    );

    if (!isVisible) return null;

    // Figma anchors the icon to the first text line whenever the content block is
    // taller than one line; otherwise everything centres on the tallest child.
    const alignStart = Boolean(resolvedTitle) || (orientation === 'vertical' && actions.length > 0);

    return (
      <div
        ref={ref}
        data-slot="inline-alert"
        className={cn(
          inlineAlertVariants({ status, orientation }),
          alignStart ? 'items-start' : 'items-center',
          className,
        )}
        role={status === 'error' ? 'alert' : 'status'}
        {...props}
      >
        {icon}
        {/*
         * The orientation axis is exactly this: the text block and the actions
         * sit side by side in `horizontal` and stacked in `vertical`. Both gaps
         * are 12px in Figma — the frame's Gap/7 in one case, the Content
         * column's Gap/7 in the other.
         */}
        <div
          className={cn(
            'gap-ws-7 flex flex-1',
            orientation === 'horizontal' ? 'items-center' : 'flex-col',
          )}
        >
          {textContent}
          {actionsContent}
        </div>
        {closeButton}
      </div>
    );
  },
) as InlineAlertWithSubComponents;

InlineAlert.displayName = 'InlineAlert';
InlineAlert.Title = InlineAlertTitle;
InlineAlert.Message = InlineAlertMessage;
InlineAlert.Action = InlineAlertAction;
InlineAlert.Outlet = InlineAlertOutlet;

export { InlineAlert };
