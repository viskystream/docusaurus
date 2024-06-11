import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

function SplitContent({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className="flex flex-col md:pl-64 min-h-full">
      <div className={clsx('grow bg-white border-l px-4 sm:px-6 lg:px-8 py-10', className)}>{children}</div>
    </div>
  );
}

export default memo(SplitContent);
