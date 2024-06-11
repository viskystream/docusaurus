/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
  active?: boolean
}

function Skeleton({
  className,
  children,
  active,
}: SkeletonProps) {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className={clsx('relative overflow-hidden rounded-md bg-gray-200 pointer-events-none animate-pulse', className)}>
      <div className="opacity-0">
        {children}
      </div>
    </div>
  );
}

export default Skeleton;
