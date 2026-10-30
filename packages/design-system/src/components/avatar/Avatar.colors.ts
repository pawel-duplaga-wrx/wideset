import { cva } from 'class-variance-authority';

/**
 * Hues an avatar's initials can take, matching `Tag`'s `color` axis.
 *
 * Order is significant: a taken hue falls through to the next entry, so the list
 * is sequenced for maximum hue separation across any short run. Do not sort it.
 */
export const AVATAR_COLORS = [
  'blue',
  'purple',
  'pink',
  'orange',
  'lime',
  'teal',
  'brand',
  'violet',
  'red',
  'yellow',
  'green',
  'cyan',
  'indigo',
] as const;

export type AvatarColor = (typeof AVATAR_COLORS)[number];

/** Hash with avalanche — a plain `h * 31 + c` maps stepped initials onto stepped hues. */
const hash = (value: string): number => {
  let result = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }

  result ^= result >>> 16;
  result = Math.imul(result, 2246822507);
  result ^= result >>> 13;
  result = Math.imul(result, 3266489909);
  result ^= result >>> 16;

  return result >>> 0;
};

/**
 * Hue for a string, stable across renders.
 */
export const getAvatarColor = (key: string, exclude?: Iterable<AvatarColor>): AvatarColor => {
  const taken = new Set(exclude);
  const start = hash(key) % AVATAR_COLORS.length;

  for (let offset = 0; offset < AVATAR_COLORS.length; offset += 1) {
    const candidate = AVATAR_COLORS[(start + offset) % AVATAR_COLORS.length];
    if (!taken.has(candidate)) return candidate;
  }

  return AVATAR_COLORS[start];
};

export const initialsColorVariants = cva('', {
  variants: {
    color: {
      brand: 'bg-ws-non-semantic-brand-subtle text-ws-non-semantic-brand-on-subtle',
      red: 'bg-ws-non-semantic-red-subtle text-ws-non-semantic-red-on-subtle',
      pink: 'bg-ws-non-semantic-pink-subtle text-ws-non-semantic-pink-on-subtle',
      violet: 'bg-ws-non-semantic-violet-subtle text-ws-non-semantic-violet-on-subtle',
      cyan: 'bg-ws-non-semantic-cyan-subtle text-ws-non-semantic-cyan-on-subtle',
      purple: 'bg-ws-non-semantic-purple-subtle text-ws-non-semantic-purple-on-subtle',
      indigo: 'bg-ws-non-semantic-indigo-subtle text-ws-non-semantic-indigo-on-subtle',
      blue: 'bg-ws-non-semantic-blue-subtle text-ws-non-semantic-blue-on-subtle',
      lime: 'bg-ws-non-semantic-lime-subtle text-ws-non-semantic-lime-on-subtle',
      teal: 'bg-ws-non-semantic-teal-subtle text-ws-non-semantic-teal-on-subtle',
      green: 'bg-ws-non-semantic-green-subtle text-ws-non-semantic-green-on-subtle',
      orange: 'bg-ws-non-semantic-orange-subtle text-ws-non-semantic-orange-on-subtle',
      yellow: 'bg-ws-non-semantic-yellow-subtle text-ws-non-semantic-yellow-on-subtle',
    },
  },
  defaultVariants: {
    color: 'brand',
  },
});
