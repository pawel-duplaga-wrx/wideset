import { ListItem, Select, Switch } from '@wideset/react';

/**
 * The right rail, as one instrument, measured from the Figma frame: a panel on the off-white
 * ground with a 16px radius and no border, 12px inside (16px on the left), 32px rows, and one 14px line with one weight rule — regular for labels and values,
 * medium for the panel title only — so the eye reads it as a single control surface rather
 * than a stack of cards. The values are the system's own controls (Select, Switch);
 * `.docs-rail` in docs.css brings the Select down to the rail's type scale.
 */
export type Option<T extends string = string> = { label: string; value: T };

export const RailPanel = ({
  title,
  action,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="docs-rail rounded-ws-container-lg py-ws-7 pr-ws-7 pl-ws-9">
    {(title || action) && (
      <header className="flex h-ws-forms-sm items-center justify-between gap-ws-7">
        {title && <h2 className="typography-label-strong-sm text-ws-static-strong">{title}</h2>}
        {action && <div className="-mr-ws-3 ml-auto flex items-center gap-ws-3">{action}</div>}
      </header>
    )}
    <div className="flex flex-col">{children}</div>
  </section>
);

/** Rows run flat under the panel title; the group name is for the definition, not the eye. */
export const Group = ({ children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col">{children}</div>
);

export const ControlRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex h-ws-forms-sm items-center justify-between gap-ws-7">
    <span className="typography-body-md whitespace-nowrap text-ws-static-subtle">{label}</span>
    <div className="flex min-w-0 items-center justify-end">{children}</div>
  </div>
);

/** A value the rail shows but does not let you change. Ends where a select's text ends: 14px chevron + 6px gap. */
export const Fixed = ({ children }: { children: React.ReactNode }) => (
  <span className="pr-ws-11 typography-body-md text-ws-static-strong">{children}</span>
);

/**
 * A value with a chevron. The composable Select, so the list can open aligned to the trigger's
 * right edge: in the rail the trigger hugs the panel's edge and a list growing to the right
 * would leave the panel.
 */
export const Pick = <T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
}) => {
  const selected = options.find((option) => option.value === value);
  return (
    <Select value={value} onValueChange={(next: string) => onChange(next as T)}>
      <Select.Trigger size="sm" preset="ghost" aria-label={selected?.label}>
        <span className="truncate">{selected?.label}</span>
      </Select.Trigger>
      <Select.Content align="end">
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value} textValue={option.label}>
            <ListItem.Label>{option.label}</ListItem.Label>
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  );
};

export const Toggle = ({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) => <Switch size="sm" checked={checked} onCheckedChange={onChange} aria-label={label} />;
