import type * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { RemixiconComponentType } from '@remixicon/react';

import type { TileCheckbox } from './TileCheckbox';
import type { TileDescription } from './TileDescription';
import type { TileIcon } from './TileIcon';
import type { TileIndicator } from './TileIndicator';
import type { TileRadio } from './TileRadio';
import type { TileRadioGroup } from './TileRadioGroup';
import type { TileTitle } from './TileTitle';

/** The icon/title/description content shared by every tile flavour. */
export type TileBodyProps = {
  /** Leading icon rendered beside the text column. */
  icon?: RemixiconComponentType;
  /** The title text of the tile. */
  title?: string;
  /** The description text of the tile. */
  description?: string;
  /** Content rendered inside the component. */
  children?: React.ReactNode;
};

/**
 * Static tile. Presentational only: no role, no tab stop, no selection state.
 * Use `Tile.Checkbox` / `Tile.Radio` for selection and `ActionTile` for an
 * action or a link.
 */
export type TileProps = React.HTMLAttributes<HTMLDivElement> &
  TileBodyProps & {
    /** Additional CSS classes merged with the rendered element. */
    className?: string;
    /**
     * Renders the tile styling onto the child element via Radix Slot, for the
     * rare case where you own the element (a `<li>`, a `<label>`, ...).
     */
    asChild?: boolean;
    /** Ref to the rendered element. */
    ref?: React.Ref<HTMLDivElement>;
  };

/** A selectable tile allowing independent selection. */
export type TileCheckboxProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'children' | 'asChild'
> &
  TileBodyProps & {
    /** Additional CSS classes merged with the rendered element. */
    className?: string;
  };

/** A selectable tile belonging to a radio group. */
export type TileRadioProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'children' | 'asChild'
> &
  TileBodyProps & {
    /** Additional CSS classes merged with the rendered element. */
    className?: string;
  };

/** A group of mutually exclusive radio options. */
export type TileRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> & {
  /** Additional CSS classes merged with the rendered element. */
  className?: string;
  /**
   * Accessible name for the group, rendered as a `FieldLabel` and wired with
   * `aria-labelledby`. Without it a screen reader announces only "radio group".
   * An explicit `aria-label` / `aria-labelledby` takes precedence.
   */
  label?: React.ReactNode;
};

/** The primary title text. */
export type TitleProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLParagraphElement>;
};

/** Supporting descriptive text. */
export type DescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLParagraphElement>;
};

/** An icon rendered within `Tile`. */
export type IconProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Icon component from `@remixicon/react`. */
  icon: RemixiconComponentType;
  /** Ref to the rendered element. */
  ref?: React.Ref<HTMLDivElement>;
};

/** A decorative selected-state indicator. */
export type IndicatorProps = React.HTMLAttributes<HTMLDivElement>;

export type TileWithSubComponents = ((props: TileProps) => React.ReactElement | null) & {
  displayName?: string;
  Checkbox: typeof TileCheckbox;
  Description: typeof TileDescription;
  Icon: typeof TileIcon;
  Indicator: typeof TileIndicator;
  Radio: typeof TileRadio;
  RadioGroup: typeof TileRadioGroup;
  Title: typeof TileTitle;
};
