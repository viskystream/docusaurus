import React, { memo, ReactNode } from 'react';
import clsx from 'clsx';
import Text from '../Text';

interface VerticalNavigationProps {
  children?: ReactNode
  className?: string
}
function VerticalNavigation({ children, className }: VerticalNavigationProps) {
  return (
    <Text shade="light" size="xs" weight="semibold" transform="uppercase" className={clsx('px-3 mb-3 tracking-wider', className)}>
      {children}
    </Text>
  );
}

export default memo(VerticalNavigation);
