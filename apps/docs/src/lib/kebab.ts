/** `ButtonIcon` → `button-icon`: the kebab-case of a PascalCase name. */
export const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** A part's `data-slot` is the kebab of its export (`TabsList` → `tabs-list`); the Anatomy picture finds parts by it. */
export const slotOf = kebab;
