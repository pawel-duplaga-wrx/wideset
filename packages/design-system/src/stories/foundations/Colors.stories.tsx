import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';

// ── Shared style constants ──────────────────────────────────────────────────

const SANS = 'var(--font-ws-sans, Inter, system-ui, sans-serif)';
const MONO = 'ui-monospace, "SFMono-Regular", monospace';

const PAGE: React.CSSProperties = {
  fontFamily: SANS,
  display: 'flex',
  flexDirection: 'column',
  gap: 36,
  maxWidth: 960,
};

const H2: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  margin: '0 0 6px',
  color: 'var(--ws-static-text-strong)',
};

const SUB: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--ws-static-text-subtle)',
  margin: 0,
  lineHeight: 1.5,
};

const Label = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ws-static-text-subtle)',
      margin: '0 0 12px',
      fontFamily: MONO,
    }}
  >
    {children}
  </p>
);

const Desc = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 12, color: 'var(--ws-static-text-subtle)', margin: '0 0 14px' }}>
    {children}
  </p>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code style={{ fontFamily: MONO, fontSize: 12, color: 'var(--ws-static-text-base)' }}>
    {children}
  </code>
);

// ── Chips ───────────────────────────────────────────────────────────────────

function ColorChip({ token, size = 40, label }: { token: string; size?: number; label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-start',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          background: `var(${token})`,
          outline: '1px solid var(--ws-static-stroke-base)',
          outlineOffset: -1,
        }}
        title={token}
      />
      <span
        style={{
          fontSize: 9,
          color: 'var(--ws-static-text-subtle)',
          fontFamily: MONO,
          lineHeight: 1.2,
          maxWidth: size + 16,
          wordBreak: 'break-all',
        }}
      >
        {label ?? token.replace('--', '')}
      </span>
    </div>
  );
}

function StrokeChip({ token, label }: { token: string; label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-start',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 6,
          background: 'var(--ws-static-fill-container)',
          border: `2px solid var(${token})`,
          outline: '1px solid var(--ws-static-stroke-base)',
          outlineOffset: -1,
        }}
        title={token}
      />
      <span
        style={{
          fontSize: 9,
          color: 'var(--ws-static-text-subtle)',
          fontFamily: MONO,
          lineHeight: 1.2,
          maxWidth: 56,
          wordBreak: 'break-all',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function TextChip({
  token,
  label,
  bg = 'var(--ws-static-fill-container)',
}: {
  token: string;
  label?: string;
  bg?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-start' }}>
      <div
        style={{
          padding: '6px 12px',
          borderRadius: 6,
          background: bg,
          outline: '1px solid var(--ws-static-stroke-base)',
          outlineOffset: -1,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, fontFamily: SANS, color: `var(${token})` }}>
          Aa
        </span>
      </div>
      <span
        style={{
          fontSize: 9,
          color: 'var(--ws-static-text-subtle)',
          fontFamily: MONO,
          lineHeight: 1.2,
          maxWidth: 64,
          wordBreak: 'break-all',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}

// ── 1. Primitive palettes (real, sparse steps from tokens) ──────────────────

const PALETTE_STEPS: Record<string, number[]> = {
  brand: [300, 400, 500, 600, 700, 800, 900, 1100],
  neutral: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
  red: [300, 400, 500, 600, 700, 800, 900, 1000, 1100],
  green: [300, 400, 500, 600, 700, 800, 900, 1000, 1100],
  blue: [300, 600, 700, 800, 1000, 1100],
  indigo: [300, 600, 1100],
  yellow: [300, 600, 800, 1100],
  cyan: [300, 600, 1100],
  teal: [300, 600, 1100],
  lime: [300, 600, 1100],
  orange: [300, 600, 1100],
  pink: [300, 600, 1100],
  purple: [300, 600, 1100],
  violet: [300, 600, 1100],
};

const PALETTE_DESC: Record<string, string> = {
  brand: 'Brand primary — violet-indigo',
  neutral: 'Neutral UI — white to near-black',
  red: 'Danger / destructive',
  green: 'Success / positive',
  blue: 'Info',
  indigo: 'Accent / info',
  yellow: 'Notice / warning',
  cyan: 'Accent',
  teal: 'Accent',
  lime: 'Accent',
  orange: 'Accent',
  pink: 'Accent',
  purple: 'Accent',
  violet: 'Accent',
};

function PrimitivePalettesPage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Primitive palettes</h2>
        <p style={SUB}>
          Raw color values. Do not reference these directly in components — use semantic tokens
          instead. Light steps shown; dark primitives exist separately for theme-aware tokens.
        </p>
      </div>
      {Object.entries(PALETTE_STEPS).map(([key, steps]) => (
        <Section key={key}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
            <Label>{key}</Label>
            <span style={{ fontSize: 11, color: 'var(--ws-static-text-subtle)' }}>
              {PALETTE_DESC[key]}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {steps.map((step) => (
              <ColorChip
                key={step}
                token={`--ws-colors-light-${key}-${step}`}
                label={`${step}`}
                size={44}
              />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

// ── 2. Dynamic fill ─────────────────────────────────────────────────────────

const FILL_ROLES = [
  { role: 'primary', label: 'Primary', description: 'Brand — violet' },
  { role: 'secondary', label: 'Secondary', description: 'Neutral — ghost' },
  { role: 'tertiary', label: 'Tertiary', description: 'Neutral — solid' },
  { role: 'danger', label: 'Danger', description: 'Red — destructive' },
  { role: 'success', label: 'Success', description: 'Green — positive' },
  { role: 'inverse', label: 'Inverse', description: 'Dark on light / light on dark' },
] as const;

const STATES = ['default', 'hover', 'pressed', 'disabled'] as const;

function DynamicFillPage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Dynamic fill</h2>
        <p style={SUB}>
          Background colors for interactive elements (buttons, chips, toggles). Values flip in dark
          mode. Use <Code>--ws-dynamic-fill-[role]-[state]</Code>.
        </p>
      </div>

      {FILL_ROLES.map(({ role, label, description }) => (
        <Section key={role}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
            <Label>{label}</Label>
            <span style={{ fontSize: 11, color: 'var(--ws-static-text-subtle)' }}>
              {description}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STATES.map((state) => (
              <ColorChip key={state} token={`--ws-dynamic-fill-${role}-${state}`} label={state} />
            ))}
            <ColorChip token={`--ws-dynamic-fill-${role}-alpha-default`} label="alpha" size={32} />
            <ColorChip
              token={`--ws-dynamic-fill-${role}-alpha-strong-default`}
              label="alpha-strong"
              size={32}
            />
          </div>
        </Section>
      ))}

      <Section>
        <Label>Static fill — layout surfaces</Label>
        <Desc>Fixed across themes. Use for backgrounds, containers and overlays.</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['background', 'container', 'foreground', 'overlay'].map((l) => (
            <ColorChip key={l} token={`--ws-static-fill-${l}`} label={l} />
          ))}
          {['background', 'container', 'foreground', 'overlay'].map((l) => (
            <ColorChip
              key={`inv-${l}`}
              token={`--ws-static-fill-inverse-${l}`}
              label={`inv-${l}`}
            />
          ))}
          <ColorChip token="--ws-static-fill-alpha-subtle" label="alpha-subtle" size={36} />
          <ColorChip token="--ws-static-fill-alpha-base" label="alpha-base" size={36} />
          <ColorChip token="--ws-static-fill-alpha-strong" label="alpha-strong" size={36} />
        </div>
      </Section>
    </div>
  );
}

// ── 3. Dynamic stroke ───────────────────────────────────────────────────────

const STROKE_ROLES = [
  { role: 'primary', label: 'Primary', description: 'Brand border — focus rings, active states' },
  { role: 'secondary', label: 'Secondary', description: 'Neutral — default input borders' },
  { role: 'danger', label: 'Danger', description: 'Red — error borders' },
  { role: 'success', label: 'Success', description: 'Green — success borders' },
  { role: 'inverse', label: 'Inverse', description: 'Reversed — for use on dark fills' },
] as const;

function DynamicStrokePage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Dynamic stroke</h2>
        <p style={SUB}>
          Border colors for interactive elements and form controls. Values flip in dark mode. Use{' '}
          <Code>--ws-dynamic-stroke-[role]-[state]</Code>.
        </p>
      </div>

      {STROKE_ROLES.map(({ role, label, description }) => (
        <Section key={role}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
            <Label>{label}</Label>
            <span style={{ fontSize: 11, color: 'var(--ws-static-text-subtle)' }}>
              {description}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {STATES.map((state) => (
              <StrokeChip
                key={state}
                token={`--ws-dynamic-stroke-${role}-${state}`}
                label={state}
              />
            ))}
            <StrokeChip token={`--ws-dynamic-stroke-${role}-strong-default`} label="strong" />
            <StrokeChip token={`--ws-dynamic-stroke-${role}-strong-hover`} label="str-hover" />
          </div>
        </Section>
      ))}

      <Section>
        <Label>Static stroke — layout dividers</Label>
        <Desc>Fixed across themes. Use for dividers, card outlines and form fields at rest.</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['subtle', 'base', 'strong'].map((l) => (
            <StrokeChip key={l} token={`--ws-static-stroke-${l}`} label={l} />
          ))}
          {['subtle', 'base', 'strong'].map((l) => (
            <StrokeChip
              key={`inv-${l}`}
              token={`--ws-static-stroke-inverse-${l}`}
              label={`inv-${l}`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── 4. Dynamic text ─────────────────────────────────────────────────────────

const TEXT_ROLES = [
  { role: 'primary', label: 'Primary', description: 'Brand text — links, active labels' },
  { role: 'secondary', label: 'Secondary', description: 'Neutral — default body text' },
  { role: 'danger', label: 'Danger', description: 'Red — error messages' },
  { role: 'success', label: 'Success', description: 'Green — success messages' },
  { role: 'inverse', label: 'Inverse', description: 'Light text — on dark fills' },
] as const;

const ON_ROLES = [
  { suffix: 'primary', bg: 'var(--ws-dynamic-fill-primary-default)', label: 'On Primary' },
  { suffix: 'secondary', bg: 'var(--ws-dynamic-fill-secondary-default)', label: 'On Secondary' },
  { suffix: 'danger', bg: 'var(--ws-dynamic-fill-danger-default)', label: 'On Danger' },
  { suffix: 'success', bg: 'var(--ws-dynamic-fill-success-default)', label: 'On Success' },
  { suffix: 'inverse', bg: 'var(--ws-dynamic-fill-inverse-default)', label: 'On Inverse' },
] as const;

function DynamicTextPage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Dynamic text</h2>
        <p style={SUB}>
          Text colors for interactive elements. Values flip in dark mode. Use{' '}
          <Code>--ws-dynamic-text-[role]-[state]</Code>.
        </p>
      </div>

      <Section>
        <Label>Standalone text roles</Label>
        <Desc>For labels, links and messages on neutral backgrounds.</Desc>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TEXT_ROLES.map(({ role, label, description }) => (
            <div key={role} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 84, flexShrink: 0, paddingTop: 8 }}>
                <span
                  style={{ fontSize: 11, color: 'var(--ws-static-text-base)', fontFamily: MONO }}
                >
                  {label}
                </span>
                <br />
                <span style={{ fontSize: 10, color: 'var(--ws-static-text-subtle)' }}>
                  {description}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STATES.map((state) => (
                  <TextChip
                    key={state}
                    token={`--ws-dynamic-text-${role}-${state}`}
                    label={state}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Label>On-fill text roles</Label>
        <Desc>Text colors tuned for readability on specific button/fill backgrounds.</Desc>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {ON_ROLES.map(({ suffix, bg, label }) => (
            <div
              key={suffix}
              style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}
            >
              <div
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  background: bg,
                  outline: '1px solid var(--ws-static-stroke-base)',
                  outlineOffset: -1,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: SANS,
                    color: `var(--ws-dynamic-text-on-${suffix}-default)`,
                  }}
                >
                  Aa
                </span>
              </div>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--ws-static-text-subtle)',
                  fontFamily: MONO,
                  lineHeight: 1.2,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Label>Static text</Label>
        <Desc>Fixed across themes. Use for body copy, headings and secondary labels.</Desc>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['subtle', 'base', 'strong'].map((l) => (
            <TextChip
              key={l}
              token={`--ws-static-text-${l}`}
              label={l}
              bg="var(--ws-static-fill-container)"
            />
          ))}
          {['subtle', 'base', 'strong'].map((l) => (
            <TextChip
              key={`inv-${l}`}
              token={`--ws-static-text-inverse-${l}`}
              label={`inv-${l}`}
              bg="var(--ws-static-fill-inverse-background)"
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── 5. Semantic status ──────────────────────────────────────────────────────

const STATUS_ROLES = [
  { key: 'positive', label: 'Positive', description: 'Success / done' },
  { key: 'negative', label: 'Negative', description: 'Error / danger' },
  { key: 'notice', label: 'Notice', description: 'Warning / caution' },
  { key: 'info', label: 'Info', description: 'Informational' },
  { key: 'neutral', label: 'Neutral', description: 'Default state' },
] as const;

function StatusBadge({ statusKey, label }: { statusKey: string; label: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 100,
        backgroundColor: `var(--ws-semantic-fill-${statusKey})`,
        border: `1px solid var(--ws-semantic-stroke-${statusKey})`,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: `var(--ws-semantic-stroke-${statusKey})`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: SANS,
          color: `var(--ws-semantic-text-on-subtle-${statusKey})`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function SemanticStatusPage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Semantic status</h2>
        <p style={SUB}>
          Status tokens for positive / negative / notice / info / neutral states. Used in badges,
          alerts, toasts and inline feedback.
        </p>
      </div>

      <Section>
        <Label>Live badge previews</Label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {STATUS_ROLES.map(({ key, label }) => (
            <StatusBadge key={key} statusKey={key} label={label} />
          ))}
        </div>
      </Section>

      <Section>
        <Label>Fill tokens</Label>
        <Desc>Subtle background fills for status indicators — semantic-fill-[status].</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STATUS_ROLES.map(({ key, label }) => (
            <ColorChip key={key} token={`--ws-semantic-fill-${key}`} label={label} />
          ))}
          {STATUS_ROLES.map(({ key, label }) => (
            <ColorChip
              key={`inv-${key}`}
              token={`--ws-semantic-fill-inverse-${key}`}
              label={`inv-${label}`}
              size={36}
            />
          ))}
        </div>
      </Section>

      <Section>
        <Label>Stroke tokens</Label>
        <Desc>Border colors for status rings and icons — semantic-stroke-[status].</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STATUS_ROLES.map(({ key, label }) => (
            <StrokeChip key={key} token={`--ws-semantic-stroke-${key}`} label={label} />
          ))}
        </div>
      </Section>

      <Section>
        <Label>Text tokens</Label>
        <Desc>Text colors for status messages and labels.</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {STATUS_ROLES.map(({ key, label }) => (
            <TextChip key={key} token={`--ws-semantic-text-${key}`} label={label} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          {STATUS_ROLES.map(({ key, label }) => (
            <TextChip
              key={`s-${key}`}
              token={`--ws-semantic-text-on-subtle-${key}`}
              label={`on-${label}`}
              bg={`var(--ws-semantic-fill-${key})`}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── 6. Accent colors (non-semantic) ─────────────────────────────────────────

const ACCENT_KEYS = [
  'brand',
  'blue',
  'cyan',
  'green',
  'indigo',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow',
] as const;

function AccentBadge({ accentKey }: { accentKey: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 100,
        backgroundColor: `var(--ws-non-semantic-fill-${accentKey}-subtle)`,
        border: `1px solid var(--ws-non-semantic-stroke-${accentKey}-default)`,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: SANS,
          color: `var(--ws-non-semantic-text-${accentKey}-on-subtle)`,
        }}
      >
        {accentKey.charAt(0).toUpperCase() + accentKey.slice(1)}
      </span>
    </div>
  );
}

function AccentColorsPage() {
  return (
    <div style={PAGE}>
      <div>
        <h2 style={H2}>Accent colors (non-semantic)</h2>
        <p style={SUB}>
          13 accent colors for category labels, tags and badges. Each has fill-subtle / fill-strong,
          stroke-default and text-on-subtle / text-on-strong variants.
        </p>
      </div>

      <Section>
        <Label>Live badge previews</Label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ACCENT_KEYS.map((key) => (
            <AccentBadge key={key} accentKey={key} />
          ))}
        </div>
      </Section>

      <Section>
        <Label>Fill — subtle &amp; strong</Label>
        <Desc>non-semantic-fill-[color]-subtle / strong</Desc>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {ACCENT_KEYS.map((key) => (
            <div
              key={key}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                <ColorChip token={`--ws-non-semantic-fill-${key}-subtle`} label="" size={28} />
                <ColorChip token={`--ws-non-semantic-fill-${key}-strong`} label="" size={28} />
              </div>
              <span
                style={{ fontSize: 9, color: 'var(--ws-static-text-subtle)', fontFamily: MONO }}
              >
                {key}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Label>Text — on subtle &amp; on strong</Label>
        <Desc>non-semantic-text-[color]-on-subtle / on-strong</Desc>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ACCENT_KEYS.map((key) => (
            <div key={key} style={{ display: 'flex', gap: 4 }}>
              <TextChip
                token={`--ws-non-semantic-text-${key}-on-subtle`}
                label={`${key} subtle`}
                bg={`var(--ws-non-semantic-fill-${key}-subtle)`}
              />
              <TextChip
                token={`--ws-non-semantic-text-${key}-on-strong`}
                label={`${key} strong`}
                bg={`var(--ws-non-semantic-fill-${key}-strong)`}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── Storybook meta ──────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundation/Colors',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Wideset color tokens, sourced from Figma Variables. Primitive palettes feed four semantic layers — Static (theme-fixed), Dynamic (interactive, flips in dark mode), Semantic status, and Non-semantic accents. Reference semantic tokens in components, never raw primitives.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primitives: Story = {
  name: '1 · Primitive Palettes',
  render: () => <PrimitivePalettesPage />,
};
export const DynamicFill: Story = { name: '2 · Dynamic Fill', render: () => <DynamicFillPage /> };
export const DynamicStroke: Story = {
  name: '3 · Dynamic Stroke',
  render: () => <DynamicStrokePage />,
};
export const DynamicText: Story = { name: '4 · Dynamic Text', render: () => <DynamicTextPage /> };
export const SemanticStatus: Story = {
  name: '5 · Semantic Status',
  render: () => <SemanticStatusPage />,
};
export const AccentColors: Story = {
  name: '6 · Accent Colors',
  render: () => <AccentColorsPage />,
};
