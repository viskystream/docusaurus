import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode
  className?: string
}

function Dashboard({ children, className }: Props) {
  return (
    <div className={clsx('overflow-clip bg-gray-100', className)}>
      {children}
    </div>
  );
}

export default Dashboard;
