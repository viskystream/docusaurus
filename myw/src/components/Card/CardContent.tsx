import React from 'react';
import clsx from 'clsx';
import { CardContentProps } from './types';

function CardContent({
  className = '', children, inset, gutterTop = true, gutterBottom = true,
}: CardContentProps) {
  const rootClass = clsx(
    'px-4 sm:px-6 flex-grow',
    {
      'bg-gray-50': inset,
      'py-6': gutterTop && gutterBottom,
      'pt-6': gutterTop && !gutterBottom,
      'pb-6': !gutterTop && gutterBottom,
    },
    className,
  );

  return <div className={rootClass}>{children}</div>;
}

export default CardContent;
