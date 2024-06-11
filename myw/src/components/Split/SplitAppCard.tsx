import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

function SplitAppCard({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={clsx('bg-gray-200 p-4', className)}>{children}</div>;
}

export default memo(SplitAppCard);
