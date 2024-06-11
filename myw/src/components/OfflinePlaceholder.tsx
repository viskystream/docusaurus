import React from 'react';
import clsx from 'clsx';
import Text from './Text';

interface OfflinePlaceholderProps {
  className?: string,
  wrapperClassName?: string
}

function OfflinePlaceholder({ className = '', wrapperClassName = '' }: OfflinePlaceholderProps) {
  return (
    <div
      className={clsx('absolute left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2   border-white p-3 bg-black', wrapperClassName)}
    >
      <Text size="3xl" className={clsx('text-white', className)}>
        Offline
      </Text>
    </div>
  );
}

export default OfflinePlaceholder;
