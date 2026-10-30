/** Full content of a truncated cell for the `title` attribute (text-like children only). */
export const getTruncatedTitle = (
  children: React.ReactNode,
  truncate: boolean | null | undefined,
): string | undefined => {
  if (!truncate) return undefined;
  const parts = Array.isArray(children) ? children : [children];
  const isText = parts.every((part) => typeof part === 'string' || typeof part === 'number');
  return isText ? parts.join('') || undefined : undefined;
};
