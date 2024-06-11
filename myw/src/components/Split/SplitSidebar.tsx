import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

function SplitSidebar({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col pt-16">
      <div className={clsx('flex min-h-0 flex-1 flex-col', className)}>{children}</div>
    </div>
  );
}

export default memo(SplitSidebar);
