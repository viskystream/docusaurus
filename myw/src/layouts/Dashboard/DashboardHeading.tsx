import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text';

interface Props {
  children: ReactNode,
  className?: string,
}

function DashboardHeading({ className, children }:Props) {
  return (
    <div className={clsx('select-none min-w-0 flex items-center space-x-2', className)}>
      <Text shade="dark" size="2xl" weight="bold" truncate>
        {children}
      </Text>
    </div>
  );
}

export default DashboardHeading;
