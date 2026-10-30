/**
 * Shared building blocks for Storybook MDX docs pages.
 * Rules for using them: .agents/skills/wideset-storybook-docs/SKILL.md
 * Docs-only: not exported from the package.
 * Colours and radius come from Wideset tokens through Tailwind utilities, never hex or rgba.
 * Boxes use a full, even border; never a one-sided accent border.
 */
import { AnchorMdx } from '@storybook/addon-docs/blocks';
import type { ReactNode } from 'react';

type WithChildren = { children?: ReactNode };

/**
 * Internal link for use inside JSX (Lead, Callout, Td…), where Markdown links are not available.
 * `to` is the Storybook path without `?path=`: `/story/foundation-colors--primitives`.
 * A raw `<a href="/?path=…">` would load the whole Storybook UI inside the preview iframe.
 */
export const DocLink = ({ to, children }: WithChildren & { to: string }) => (
  <AnchorMdx href={to} target="">
    {children}
  </AnchorMdx>
);

/** Intro paragraph directly under the H1. One per page, 1–3 sentences. */
export const Lead = ({ children }: WithChildren) => (
  <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.85, maxWidth: 660 }}>{children}</p>
);

const calloutTone = {
  info: { box: 'bg-ws-semantic-info border-ws-semantic-info', title: 'text-ws-semantic-info' },
  warning: {
    box: 'bg-ws-semantic-notice border-ws-semantic-notice',
    title: 'text-ws-semantic-notice',
  },
} as const;

/** Notes and warnings. Use instead of Markdown blockquotes. */
export const Callout = ({
  tone = 'info',
  title,
  children,
}: WithChildren & { tone?: keyof typeof calloutTone; title?: string }) => (
  <div
    className={`rounded-ws-container-md border ${calloutTone[tone].box}`}
    style={{ padding: '14px 16px', margin: '20px 0' }}
  >
    {title && (
      <div
        className={calloutTone[tone].title}
        style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}
      >
        {title}
      </div>
    )}
    <div style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.88 }}>{children}</div>
  </div>
);

/** Responsive grid for cards. */
export const Grid = ({ children }: WithChildren) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16,
      margin: '24px 0',
    }}
  >
    {children}
  </div>
);

/** Titled box; `icon` is optional (emoji or element). */
export const Card = ({
  icon,
  title,
  children,
}: WithChildren & { icon?: ReactNode; title: string }) => (
  <div className="rounded-ws-container-md border-ws-static-strong border" style={{ padding: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
      <strong style={{ fontSize: 15, fontWeight: 600 }}>{title}</strong>
    </div>
    <div style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{children}</div>
  </div>
);

/** Numbered step for procedures; `tagline` is an optional one-line summary under the title. */
/** `Configure the registry` → `configure-the-registry`: the anchor "On this page" links to. */
const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * A numbered step. Its title is an `<h3>` with an id, so the page's "On this page" list can
 * link to it; pass `id` when two steps on one page share a title.
 */
export const Step = ({
  n,
  title,
  tagline,
  id,
  children,
}: WithChildren & { n: number | string; title: string; tagline?: string; id?: string }) => (
  <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
    <div
      className="rounded-ws-control-full bg-ws-non-semantic-brand-strong text-ws-non-semantic-brand-on-strong"
      style={{
        flex: '0 0 auto',
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {n}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <h3
        id={id ?? slug(title)}
        style={{ margin: tagline ? '2px 0 4px' : '2px 0 8px', fontSize: 18, fontWeight: 600 }}
      >
        {title}
      </h3>
      {tagline && (
        <p className="text-ws-static-subtle" style={{ margin: '0 0 10px', fontSize: 14 }}>
          {tagline}
        </p>
      )}
      {children}
    </div>
  </div>
);

/**
 * Docs table. GFM pipe tables are not enabled in this Storybook; use DocTable + Th + Td.
 * Cell border colours need `!`: Storybook's own docs CSS otherwise wins on specificity.
 */
export const DocTable = ({ children }: WithChildren) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0', fontSize: 14 }}>
    {children}
  </table>
);

export const Th = ({ children }: WithChildren) => (
  <th
    className="border-ws-static-strong! bg-ws-static-alpha-subtle"
    style={{ textAlign: 'left', fontWeight: 600, padding: '10px 14px' }}
  >
    {children}
  </th>
);

export const Td = ({ children }: WithChildren) => (
  <td
    className="border-ws-static-subtle!"
    style={{ padding: '10px 14px', verticalAlign: 'top', lineHeight: 1.5 }}
  >
    {children}
  </td>
);
