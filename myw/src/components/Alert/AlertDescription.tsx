import React, { ReactNode } from 'react';
import clsx from 'clsx';

const severities = {
  error: 'mt-2 text-sm leading-5 text-red-700',
  warning: 'mt-2 text-sm leading-5 text-yellow-700',
  info: 'mt-2 text-sm leading-5 text-blue-700',
  success: 'mt-2 text-sm leading-5 text-green-700',
};

interface Props{
	children: ReactNode,
	className?: string,
	severity?: keyof typeof severities
}

function AlertDescription({
  className,
  severity = 'info',
  children,
}:Props) {
  const rootClass = clsx(
    {
      [severities[severity]]: true,
    },
    className,
  );

  return (
    <div className={rootClass}>
      <p>{children}</p>
    </div>
  );
}

export default AlertDescription;
