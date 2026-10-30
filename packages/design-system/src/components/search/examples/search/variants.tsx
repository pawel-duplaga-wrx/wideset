/**
 * Primary is the default. Danger marks a query your own validation rejected, such as one that is
 * too short to run; say why next to the field, because the red border alone does not reach screen
 * reader users.
 */
import { Search } from '@wideset/react';

export default function SearchVariants() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['primary', 'danger'] as const).map((variant) => (
        <Search
          key={variant}
          variant={variant}
          placeholder="Search invoices"
          aria-label="Search invoices"
        />
      ))}
    </div>
  );
}
