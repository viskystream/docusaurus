import React, { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/solid';

const severities = {
  error: 'inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 transition ease-in-out duration-150',
  warning: 'inline-flex rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:bg-yellow-100 transition ease-in-out duration-150',
  info: 'inline-flex rounded-md p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:bg-blue-100 transition ease-in-out duration-150',
  success: 'inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:bg-green-100 transition ease-in-out duration-150',
};

interface Props{
	children: ReactNode,
	className?:string,
	onClick?: MouseEventHandler | undefined
	severity?: keyof typeof severities
}
function AlertDismiss({
  className = '',
  severity = 'info',
  onClick = () => {},
}:Props) {
  const rootClass = clsx(
    {
      [severities[severity]]: true,
    },
    className,
  );

  return (
    <div className="ml-auto pl-3">
      <div className="-mx-1.5 -my-1.5">
        <button onClick={onClick} className={rootClass} aria-label="Dismiss" type="button">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default AlertDismiss;
