import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Navbar from '../../components/Navbar';
import DashboardConfigSuspense from './DashboardConfigSuspense';

interface Props {
  children: ReactNode;
  className?: string;
  fullscreen?: boolean;
  fullwidth?: boolean;
  gutters?: boolean;
  sticky?: boolean;
  navBarItems?: ReactNode;
  noAuth?: boolean;
  /** @deprecated suspendUserConfig=true by default */
  suspendUserConfig?: boolean;
}

function DashboardContent({
  children,
  className = '',
  fullscreen = false,
  fullwidth = false,
  gutters = true,
  sticky = true,
  navBarItems,
  noAuth = false,
}: Props) {
  if (fullscreen) {
    return (
      <main
        id="content"
        className={clsx(
          'h-screen flex flex-col relative overflow-hidden',
          className,
        )}
      >
        <Navbar fullscreen sticky={sticky} noAuth={noAuth}>
          {navBarItems}
        </Navbar>
        {noAuth ? (
          children
        ) : (
          <DashboardConfigSuspense>{children}</DashboardConfigSuspense>
        )}
      </main>
    );
  }

  if (fullwidth) {
    return (
      <main
        id="content"
        className={clsx(
          'flex flex-col min-h-screen relative focus:outline-none',
          className,
        )}
      >
        <Navbar fullscreen sticky={sticky}>
          {navBarItems}
        </Navbar>
        <div className={clsx('flex-grow w-full', gutters ? 'p-6 md:p-8' : '')}>
          {noAuth ? (
            children
          ) : (
            <DashboardConfigSuspense>{children}</DashboardConfigSuspense>
          )}
        </div>
      </main>
    );
  }

  return (
    <main
      id="content"
      className={clsx(
        'flex flex-col h-full relative focus:outline-none',
        className,
      )}
    >
      <Navbar fullscreen={fullwidth} sticky={sticky} noAuth={noAuth}>
        {navBarItems}
      </Navbar>
      <div className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-8">
        {noAuth ? (
          children
        ) : (
          <DashboardConfigSuspense>{children}</DashboardConfigSuspense>
        )}
      </div>
    </main>
  );
}

export default DashboardContent;
