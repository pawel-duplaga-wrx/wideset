export const generateId = () =>
  `inline-alert-${
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }`;

export const isBrowser = () => typeof window !== 'undefined';
