/** Collapsed keeps only the icons; each item's label becomes its `aria-label` and the trigger flips to Expand. Each section says what it shows in each mode with `Sidebar.Expanded` and `Sidebar.Collapsed`; a section without content for the current mode is not rendered. */
import { RiDashboardLine, RiFolder3Line, RiUser3Line } from '@remixicon/react';
import { Sidebar } from '@wideset/react';

const NAV = [
  { label: 'Dashboard', Icon: RiDashboardLine },
  { label: 'Projects', Icon: RiFolder3Line },
  { label: 'Customers', Icon: RiUser3Line },
];

const nav = (
  <nav className="gap-ws-2 flex flex-col">
    {NAV.map(({ label, Icon }) => (
      <Sidebar.Item key={label} href="#" icon={Icon} label={label} active={label === 'Dashboard'} />
    ))}
  </nav>
);

export default function SidebarCollapsedMode() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-start justify-center">
      {[false, true].map((collapsed) => (
        <div
          key={String(collapsed)}
          className="rounded-ws-control-lg border-ws-static-base flex h-[16rem] overflow-hidden border"
        >
          <Sidebar defaultCollapsed={collapsed}>
            <Sidebar.Header>
              <Sidebar.Expanded>
                <div className="gap-ws-7 py-ws-3 pl-ws-5 flex items-center justify-between">
                  <span className="typography-label-strong-sm text-ws-static-strong">
                    Northwind
                  </span>
                  <Sidebar.Trigger />
                </div>
              </Sidebar.Expanded>
              <Sidebar.Collapsed>
                <div className="py-ws-3 flex items-center">
                  <Sidebar.Trigger />
                </div>
              </Sidebar.Collapsed>
            </Sidebar.Header>
            <Sidebar.Section>
              <Sidebar.Expanded>{nav}</Sidebar.Expanded>
              <Sidebar.Collapsed>{nav}</Sidebar.Collapsed>
            </Sidebar.Section>
          </Sidebar>
        </div>
      ))}
    </div>
  );
}
