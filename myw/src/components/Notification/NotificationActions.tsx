import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface AlertActionsProps {
  className?: string
  children?: ReactNode
}

function AlertActions({ className = '', children }: AlertActionsProps) {
  const rootClass = clsx('flex flex-col divide-y divide-gray-200', className);

  return <div className={rootClass}>{children}</div>;
}

export default AlertActions;
