/** `separator` places a divider between every pair of items for you. `arrow` reads as a path and is the usual choice; `slash` is quieter and suits file and folder paths. Dividers are hidden from screen readers, which announce the trail as a numbered list. Leave `separator` out only when you place `Breadcrumbs.Divider` yourself. */
import { Breadcrumbs } from '@wideset/react';

const separators = ['arrow', 'slash'] as const;

export default function BreadcrumbsSeparators() {
  return (
    <div className="gap-ws-9 flex flex-col items-center">
      {separators.map((separator) => (
        <Breadcrumbs key={separator} separator={separator}>
          <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
          <Breadcrumbs.Item>Wideset</Breadcrumbs.Item>
          <Breadcrumbs.Item>Settings</Breadcrumbs.Item>
        </Breadcrumbs>
      ))}
    </div>
  );
}
