/** The playground's stage: a three-level trail that starts at home, its props set from the rail. */
import { RiHome5Line } from '@remixicon/react';
import { Breadcrumbs, type BreadcrumbsProps } from '@wideset/react';

export default function BreadcrumbsDefault(props: BreadcrumbsProps) {
  return (
    <Breadcrumbs {...props}>
      <Breadcrumbs.Item>
        <RiHome5Line className="size-ws-9" />
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item>Wideset</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}
