import React from 'react';
import clsx from 'clsx';
import { CardProps } from './types';

function Card({
  className, children, fullWidth, dividers = true, variant,
}: CardProps) {
  const rootClass = clsx('flex flex-col rounded-lg', {
    'divide-y divide-gray-200': dividers,
    'bg-white shadow': !variant,
    'bg-gray-50': variant === 'inset',
    'border border-gray-200': variant === 'outlined',
    'rounded-none md:rounded-lg': fullWidth,
  }, className);

  return (
    <div className={rootClass}>
      {children}
    </div>
  );
}

export default Card;
