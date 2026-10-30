/**
 * The rail's Radius knob: re-maps the design system's corner tokens on the root element,
 * so every control and container on the page follows. "Round" makes every control a pill;
 * containers keep a bounded ladder, because a card at half its own height is a lozenge.
 */
export type Radius = 'sharp' | 'default' | 'round';

export const RADIUS_KEY = 'wideset-docs-radius';
const CHANGE_EVENT = 'wideset-docs-radius-change';

const STEPS = ['none', 'small', 'medium', 'large', 'xlarge'] as const;
const LADDERS: Record<Radius, { control: string[]; container: string[] }> = {
  sharp: {
    control: ['0rem', '0.125rem', '0.125rem', '0.25rem', '0.25rem'],
    container: ['0rem', '0.25rem', '0.375rem', '0.5rem', '0.5rem'],
  },
  default: { control: [], container: [] },
  round: {
    control: ['0rem', '9999px', '9999px', '9999px', '9999px'],
    container: ['0rem', '0.75rem', '1rem', '1.5rem', '2rem'],
  },
};

export const applyRadius = (radius: Radius) => {
  const root = document.documentElement;
  const ladder = LADDERS[radius];
  STEPS.forEach((step, index) => {
    for (const kind of ['control', 'container'] as const) {
      const property = `--ws-corner-radius-${kind}-${step}`;
      if (radius === 'default') root.style.removeProperty(property);
      else root.style.setProperty(property, ladder[kind][index]);
    }
  });
};

export const loadRadius = (): Radius => {
  try {
    const raw = localStorage.getItem(RADIUS_KEY);
    if (raw === 'sharp' || raw === 'round') return raw;
  } catch {
    // storage unavailable
  }
  return 'default';
};

export const commitRadius = (radius: Radius) => {
  applyRadius(radius);
  try {
    localStorage.setItem(RADIUS_KEY, radius);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent<Radius>(CHANGE_EVENT, { detail: radius }));
};

export const onRadiusChange = (listener: (radius: Radius) => void) => {
  const handle = (event: Event) => listener((event as CustomEvent<Radius>).detail);
  window.addEventListener(CHANGE_EVENT, handle);
  return () => window.removeEventListener(CHANGE_EVENT, handle);
};
