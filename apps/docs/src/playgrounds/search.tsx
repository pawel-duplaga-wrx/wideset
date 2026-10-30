import { Search } from '@wideset/react';

import { options, playground } from '../lib/playground-kit';

/**
 * Variant, style and size come from `SearchProps`. The field is uncontrolled on the stage:
 * type into it to see the clear button.
 */
export default playground({
  from: 'SearchProps',
  labels: { showClearButton: 'Clear button' },
  group: { showClearButton: 'Content' },
  // Size is inherited from TextInput, so the types do not know its `md` default.
  defaults: { size: 'md' },
  content: [
    {
      key: 'placeholder',
      label: 'Placeholder',
      type: 'select',
      options: options('Search projects', 'Search by name or email', 'Search…'),
      default: 'Search projects',
    },
    // Inherited from TextInput, so not in the generated controls.
    { key: 'disabled', label: 'Disabled', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <div className="w-[20rem] max-w-full">
      <Search
        {...props()}
        placeholder={String(v.placeholder)}
        aria-label="Search"
        disabled={Boolean(v.disabled)}
      />
    </div>
  ),
  code: (v, { attrs }) =>
    `<Search${attrs()} placeholder="${v.placeholder}" aria-label="Search"${
      v.disabled ? ' disabled' : ''
    } />`,
});
