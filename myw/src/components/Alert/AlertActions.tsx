import React, { ReactNode } from 'react';
import clsx from 'clsx';
import useCloneElements from '../../hooks/useCloneElements';

const severities = {
  error: 'rounded-md p-4 bg-red-50',
  warning: 'rounded-md p-4 bg-yellow-50',
  info: 'rounded-md p-4 bg-blue-50',
  success: 'rounded-md p-4 bg-green-50',
};

interface Props {
  children: ReactNode,
  className?: string,
  severity?: keyof typeof severities
}
function AlertActions({
  className = '',
  severity = 'info',
  children,
}: Props) {
  const rootClass = clsx('mt-4', className);
  const contentClass = clsx('-mx-2 -my-1.5 flex gap-2');
  const clones = useCloneElements(children, { severity });

  return (
    <div className={rootClass}>
      <div className={contentClass}>
        {clones}
      </div>
    </div>
  );
}

export default AlertActions;
