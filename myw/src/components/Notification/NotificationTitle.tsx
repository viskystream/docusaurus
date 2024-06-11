import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface NotificationTitleProps {
  className?: string
  children?: ReactNode
}

function NotificationTitle({ className = '', children }: NotificationTitleProps) {
  const rootClass = clsx('text-sm font-medium text-gray-900', className);

  return <h3 className={rootClass}>{children}</h3>;
}

export default NotificationTitle;
