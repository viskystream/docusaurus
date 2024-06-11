import React, { ReactNode } from 'react';
import clsx from 'clsx';

const severities = {
  error: 'text-sm leading-5 font-medium text-red-800',
  warning: 'text-sm leading-5 font-medium text-yellow-800',
  info: 'text-sm leading-5 font-medium text-blue-800',
  success: 'text-sm leading-5 font-medium text-green-800',
};

interface Props{
children: ReactNode,
className?: string,
severity?: keyof typeof severities
}

function AlertDescription({
  className = '',
  severity = 'info',
  children,
}:Props) {
  const rootClass = clsx(
    {
      [severities[severity]]: true,
    },
    className,
  );

  return <h3 className={rootClass}>{children}</h3>;
}

export default AlertDescription;
