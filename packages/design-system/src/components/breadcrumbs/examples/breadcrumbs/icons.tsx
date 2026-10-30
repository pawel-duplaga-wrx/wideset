/** An icon only on the first item, for the root of the hierarchy, and always with its label. The last item is the current page: it is marked `aria-current="page"`, taken out of the tab order and loses its hover and press styles, without any prop from you. */
import { RiFolder3Line, RiHome5Line } from '@remixicon/react';
import { Breadcrumbs } from '@wideset/react';

export default function BreadcrumbsIcons() {
  return (
    <div className="gap-ws-9 flex flex-col items-center">
      <Breadcrumbs separator="arrow">
        <Breadcrumbs.Item>
          <RiHome5Line className="size-ws-9" />
          Home
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Projects</Breadcrumbs.Item>
        <Breadcrumbs.Item>Wideset</Breadcrumbs.Item>
      </Breadcrumbs>
      <Breadcrumbs separator="slash">
        <Breadcrumbs.Item>
          <RiFolder3Line className="size-ws-9" />
          Files
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Design</Breadcrumbs.Item>
        <Breadcrumbs.Item>Logos</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>
  );
}
