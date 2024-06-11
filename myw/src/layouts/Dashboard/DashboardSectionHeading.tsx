import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text';

interface DashboardSectionHeadingProps {
  className?: string
  children?: ReactNode
}

function DashboardSectionHeading({ className, children }: DashboardSectionHeadingProps) {
  return (
    <div className={clsx('pb-5 border-b border-gray-200', className)}>
      <Text size="lg" weight="medium" shade="dark">
        {children}
      </Text>
    </div>
  );
}

export default DashboardSectionHeading;
