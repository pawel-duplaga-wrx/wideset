import type { ReactNode } from 'react';

import Navbar from './Navbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex h-screen flex-row">
      <Navbar />
      <div className="relative w-full grow overflow-x-hidden bg-gray-50">{children}</div>
    </div>
  );
};

export default Layout;
