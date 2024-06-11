import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface NotificationDescriptionProps {
  className?: string
  children: ReactNode
}

function NotificationDescription({ className = '', children }: NotificationDescriptionProps) {
  const rootClass = clsx('mt-1 text-sm text-gray-500', className);

  return (
    <div className={rootClass}>
      <p>{children}</p>
    </div>
  );
}

export default NotificationDescription;
