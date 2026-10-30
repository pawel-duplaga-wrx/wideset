import type { SVGProps } from 'react';

/**
 * Two-tone loading spinner: a 40%-opacity ring with a solid quarter arc on top.
 * Kept local because Remix Icon has no two-tone loader — every `Ri*` spinner is
 * a single flat shape, which reads very differently once it is animating.
 */
const FileItemSpinner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="8 8 16 16"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16 24a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8m0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12"
      opacity={0.4}
    />
    <path fill="currentColor" d="M16 8v2a6.006 6.006 0 0 1 6 6h2a8.01 8.01 0 0 0-8-8" />
  </svg>
);

export { FileItemSpinner };
