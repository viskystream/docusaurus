import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';

interface SlideOverActionsProps {
  children?: ReactNode
  className?: string
}

function SlideOverActions({ className, children }: SlideOverActionsProps) {
  return (
    <div className={clsx('flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6', className)}>
      <div className="space-x-3 flex justify-end">{children}</div>
    </div>
  );
}

export default memo(SlideOverActions);
