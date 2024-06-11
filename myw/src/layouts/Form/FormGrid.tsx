import clsx from 'clsx';
import React, { memo, ReactNode } from 'react';

interface Props{
children: ReactNode,
item?:boolean,
className?: string,

}

function FormGrid({ children, item, className }:Props) {
  if (item) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return (
    <div className={clsx('grid grid-cols-1 lg:grid-cols-3 gap-6', className)}>
      {children}
    </div>
  );
}

export default memo(FormGrid);
