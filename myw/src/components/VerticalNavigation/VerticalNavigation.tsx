import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';

interface VerticalNavigationProps {
  className?: string
  children: ReactNode
}

function VerticalNavigation({ className, children }: VerticalNavigationProps) {
  return (
    <nav className={clsx('space-y-1', className)} aria-label="Sidebar">
      {children}
    </nav>
  );
}

export default memo(VerticalNavigation);
