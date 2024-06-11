import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
children: ReactNode,
className?: string
}

function DialogActions({ children, className } :Props) {
  return (
    <div className={clsx('bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-x-3 space-x-reverse', className)}>
      { children }
    </div>
  );
}

export default DialogActions;
