import type { ReactNode } from 'react';

export type MotionProps = {
  /**
   * Turns the component's built-in animations on or off.
   * When omitted, inherits the value from the nearest `MotionProvider`.
   * @default true
   */
  defaultMotion?: boolean;
};

export type MotionProviderProps = {
  /**
   * Turns built-in animations on or off for all Wideset components inside.
   * A component's own `defaultMotion` overrides it.
   * @default true
   */
  enabled?: boolean;
  children?: ReactNode;
};
