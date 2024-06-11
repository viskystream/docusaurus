import React from 'react';
import clsx from 'clsx';
import { CardFooterProps } from './types';

function CardFooter({ className, children, inset }: CardFooterProps) {
  const rootClass = clsx(
    'px-4 py-3 sm:px-6',
    {
      'bg-gray-50': inset,
    },
    className,
  );

  return <div className={rootClass}>{children}</div>;
}

export default CardFooter;
