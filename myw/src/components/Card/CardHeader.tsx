import React from 'react';
import clsx from 'clsx';
import { CardHeaderProps } from './types';

function CardHeader({
  className, children, overline, primary, secondary, headerClassName,
}: CardHeaderProps) {
  const rootClass = clsx('px-4 py-5 sm:px-6 flex items-center', className);

  return (
    <div className={rootClass}>
      <span className={clsx(headerClassName, 'flex-grow')}>
        {overline && (
          <p className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{overline}</p>
        )}
        {primary && <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">{primary}</h3>}
        {secondary && <p className="mt-1 text-sm text-gray-500">{secondary}</p>}
      </span>
      {children}
    </div>
  );
}

export default CardHeader;
