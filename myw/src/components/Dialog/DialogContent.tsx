import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
	children: ReactNode,
	className?: string
}

function DialogContent({ children, className }: Props) {
  return (
    <div className={clsx('px-4 pt-5 pb-4 sm:p-6 sm:pb-4', className)}>
      { children }
    </div>
  );
}

export default DialogContent;
