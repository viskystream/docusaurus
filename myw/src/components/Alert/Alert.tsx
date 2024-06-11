import React, { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import {
  InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon,
} from '@heroicons/react/24/solid';
import useCloneElements from '../../hooks/useCloneElements';
import AlertDismiss from './AlertDismiss';

const severities = {
  error: 'rounded-md p-4 bg-red-50',
  warning: 'rounded-md p-4 bg-yellow-50',
  info: 'rounded-md p-4 bg-blue-50',
  success: 'rounded-md p-4 bg-green-50',
};

export interface AlertProps {
  children: ReactNode,
  className?: string,
  severity?: keyof typeof severities
  inline?: boolean
  dismiss?: (() => void) | null
}

function Alert({
  className, severity = 'info', children, dismiss, inline,
}: AlertProps) {
  const rootClass = clsx(
    {
      [severities[severity]]: true,
      'inline-flex pr-6': inline,
    },
    className,
  );

  const icon = useMemo(() => {
    switch (severity) {
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
      default:
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
    }
  }, [severity]);

  const clones = useCloneElements(children, { severity });

  return (
    <div className={rootClass}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 w-full">{clones}</div>
        {dismiss && <AlertDismiss onClick={dismiss} severity={severity}>{children}</AlertDismiss>}
      </div>
    </div>
  );
}

export default Alert;
