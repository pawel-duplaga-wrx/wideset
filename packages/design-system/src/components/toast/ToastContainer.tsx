import { cn } from 'src/lib/utils';

import { MotionProvider, useDefaultMotion } from '../../motion/MotionProvider';
import { Toast } from './Toast';
import type { ToastContainerProps, ToastItem, ToastPosition } from './Toast.types';
import {
  toastMotionVariants,
  toastStackItemMotionVariants,
  toastViewportMotionVariants,
} from './Toast.variants';

const getPositionClasses = (position: ToastPosition): string => {
  const baseClasses = 'fixed z-ws-notification w-full max-w-[24rem] flex flex-col gap-ws-5';

  switch (position) {
    case 'top-right':
      return `${baseClasses} top-ws-9 right-ws-9`;
    case 'top-left':
      return `${baseClasses} top-ws-9 left-ws-9`;
    case 'bottom-right':
      return `${baseClasses} bottom-ws-9 right-ws-9`;
    case 'bottom-left':
      return `${baseClasses} bottom-ws-9 left-ws-9`;
    case 'top-center':
      return `${baseClasses} top-ws-9 left-1/2 transform -translate-x-1/2`;
    case 'bottom-center':
      return `${baseClasses} bottom-ws-9 left-1/2 transform -translate-x-1/2`;
    default:
      return `${baseClasses} bottom-ws-9 right-ws-9`;
  }
};

const getToastTiming = (toast: ToastItem, now: number) => {
  const elapsed = now - toast.createdAt;
  const duration = Math.max(0, (toast.duration ?? 0) - elapsed);
  const progress =
    toast.duration && toast.duration > 0
      ? Math.min(100, Math.max(0, (elapsed / toast.duration) * 100))
      : undefined;

  return { duration, progress };
};

const ToastContainer = ({
  toasts,
  onDismiss,
  position,
  now,
  defaultMotion,
}: ToastContainerProps) => {
  const motion = useDefaultMotion(defaultMotion);

  if (toasts.length === 0) return null;

  const stacked = toasts.some((toast) => !toast.isExiting);
  const side = position.startsWith('top') ? 'top' : 'bottom';

  return (
    <MotionProvider enabled={motion}>
      <div
        data-slot="toast-container"
        className={cn(
          getPositionClasses(position),
          toastViewportMotionVariants({ enabled: motion, stacked, side }),
        )}
      >
        {toasts.map((toast, index) => {
          const { duration, progress } = getToastTiming(toast, now);
          const depth = Math.min(toasts.length - 1 - index, 3) as 0 | 1 | 2 | 3;
          const isHidden = motion && stacked && depth === 3;
          const isExpanded = toast.variant === 'expanded';
          const variantProps = isExpanded
            ? { variant: 'expanded' as const, footer: toast.footer }
            : { variant: toast.variant };

          return (
            <div
              key={toast.id}
              ref={(node) => {
                node?.toggleAttribute('inert', isHidden);
              }}
              className={toastStackItemMotionVariants({
                enabled: motion,
                stacked,
                side,
                depth,
              })}
            >
              <Toast
                className={toastMotionVariants({
                  enabled: motion,
                  exiting: Boolean(toast.isExiting),
                })}
                status={toast.status}
                duration={duration}
                progress={progress}
                onDismiss={() => onDismiss(toast.id)}
                {...variantProps}
              >
                {typeof toast.content === 'string' ? (
                  <Toast.Message>{toast.content}</Toast.Message>
                ) : (
                  toast.content
                )}
                {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
                {toast.action &&
                  (typeof toast.action === 'string' ? (
                    <Toast.Action>{toast.action}</Toast.Action>
                  ) : (
                    toast.action
                  ))}
              </Toast>
            </div>
          );
        })}
      </div>
    </MotionProvider>
  );
};

ToastContainer.displayName = 'Toast.Container';

export { ToastContainer };
