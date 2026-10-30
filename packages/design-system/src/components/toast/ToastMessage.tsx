import type { ToastMessageProps } from './Toast.types';

const ToastMessage = ({ children }: ToastMessageProps) => <>{children}</>;

ToastMessage.displayName = 'Toast.Message';

export { ToastMessage };
export type { ToastMessageProps };
