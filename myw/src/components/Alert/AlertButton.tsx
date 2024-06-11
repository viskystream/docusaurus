import React, { ReactNode } from 'react';
import clsx from 'clsx';

const severities = {
  error: 'px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:bg-red-100 transition ease-in-out duration-150',
  warning: 'px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:bg-yellow-100 transition ease-in-out duration-150',
  info: 'px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-blue-800 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 transition ease-in-out duration-150',
  success: 'px-2 py-1.5 rounded-md text-sm leading-5 font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150',
};

interface Props{
	children: ReactNode,
	className?: string,
	severity?: keyof typeof severities
}

function AlertButton({
  className,
  severity = 'info',
  children,
  ...rest
} :Props) {
  const rootClass = clsx(
    {
      [severities[severity]]: true,
    },
    className,
  );

  return (
    <button {...rest} className={rootClass} type="button">
      {children}
    </button>
  );
}

export default AlertButton;
