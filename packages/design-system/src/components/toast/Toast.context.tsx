import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import type { MotionProps } from '../../motion/Motion.types';
import type {
  ToastContextType,
  ToastItem,
  ToastPosition,
  ToastProviderProps,
  ToastStateContextType,
} from './Toast.types';
import { ToastContainer } from './ToastContainer';

type ToastBus = {
  addSubscribers: Set<(toast: ToastItem) => void>;
  dismissSubscribers: Set<(id: string) => void>;
  emitAdd: (toast: ToastItem) => void;
  emitDismiss: (id: string) => void;
  subscribeAdd: (listener: (toast: ToastItem) => void) => () => void;
  subscribeDismiss: (listener: (id: string) => void) => () => void;
};

const createToastBus = (): ToastBus => {
  const addSubscribers = new Set<(toast: ToastItem) => void>();
  const dismissSubscribers = new Set<(id: string) => void>();

  return {
    addSubscribers,
    dismissSubscribers,
    emitAdd: (toast) => {
      for (const subscriber of addSubscribers) subscriber(toast);
    },
    emitDismiss: (id) => {
      for (const subscriber of dismissSubscribers) subscriber(id);
    },
    subscribeAdd: (listener) => {
      addSubscribers.add(listener);
      return () => addSubscribers.delete(listener);
    },
    subscribeDismiss: (listener) => {
      dismissSubscribers.add(listener);
      return () => dismissSubscribers.delete(listener);
    },
  };
};

const ToastViewport = ({
  bus,
  position,
  defaultMotion,
}: { bus: ToastBus; position: ToastPosition } & MotionProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismissToast = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }

    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, isExiting: true } : toast)),
    );

    const exitTimeout = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
      timeoutRefs.current.delete(`${id}-exit`);
    }, 200);

    timeoutRefs.current.set(`${id}-exit`, exitTimeout);
  }, []);

  const addToast = useCallback(
    (toast: ToastItem) => {
      setToasts((prev) => [...prev, toast]);

      if ((toast.duration ?? 0) > 0) {
        const autoDismissTimeout = setTimeout(() => {
          dismissToast(toast.id);
        }, toast.duration);

        timeoutRefs.current.set(toast.id, autoDismissTimeout);
      }
    },
    [dismissToast],
  );

  useEffect(() => {
    const unsubscribeAdd = bus.subscribeAdd(addToast);
    const unsubscribeDismiss = bus.subscribeDismiss(dismissToast);

    return () => {
      unsubscribeAdd();
      unsubscribeDismiss();
    };
  }, [addToast, bus, dismissToast]);

  useEffect(() => {
    const timeouts = timeoutRefs.current;

    return () => {
      for (const timeout of timeouts.values()) {
        clearTimeout(timeout);
      }
      timeouts.clear();
    };
  }, []);

  useLayoutEffect(() => {
    const hasTimedToasts = toasts.some((toast) => (toast.duration ?? 0) > 0);
    if (!hasTimedToasts) return undefined;

    let frameId = 0;
    const tick = () => {
      setNow(Date.now());
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [toasts]);

  if (typeof document === 'undefined') return null;
  if (toasts.length === 0) return null;

  return createPortal(
    <ToastContainer
      toasts={toasts}
      onDismiss={dismissToast}
      position={position}
      now={now}
      defaultMotion={defaultMotion}
    />,
    document.body,
  );
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({
  children,
  position = 'bottom-right',
  defaultMotion,
}: ToastProviderProps) => {
  const busRef = useRef<ToastBus | null>(null);
  if (!busRef.current) {
    busRef.current = createToastBus();
  }

  const dismissToast = useCallback((id: string) => {
    busRef.current?.emitDismiss(id);
  }, []);

  const showToast = useCallback<ToastContextType['showToast']>(
    ({
      content,
      action,
      status = 'neutral',
      duration = 5000,
      variant = 'basic',
      description,
      footer,
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = {
        id,
        content,
        action,
        status,
        duration,
        createdAt: Date.now(),
        variant,
        description,
        footer,
      };

      busRef.current?.emitAdd(newToast);

      return id;
    },
    [],
  );

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport bus={busRef.current} position={position} defaultMotion={defaultMotion} />
    </ToastContext.Provider>
  );
};

export const ToastStateContext = createContext<ToastStateContextType | undefined>(undefined);

export const useToastState = () => {
  const context = useContext(ToastStateContext);
  if (!context) {
    throw new Error('useToastState must be used within a Toast');
  }
  return context;
};

export const ToastStateProvider = ({
  children,
  ...props
}: React.PropsWithChildren<{ state: ToastStateContextType }>) => {
  return <ToastStateContext.Provider value={props.state}>{children}</ToastStateContext.Provider>;
};
