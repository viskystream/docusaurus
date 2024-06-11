import React, { memo } from 'react';
import clsx from 'clsx';

type ContentProps = {
  children?: React.ReactNode
  className?: string
}

function Content({ children, className = '' }: ContentProps) {
  return <div className={clsx('flex-grow w-full max-w-7xl mx-auto p-6 md:p-8', className)}>{children}</div>;
}

export default memo(Content);
