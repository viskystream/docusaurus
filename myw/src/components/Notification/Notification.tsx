import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface NotificationProps {
  className?: string
  children?: ReactNode
}

function Notification({ className = '', children }: NotificationProps) {
  const rootClass = clsx(
    'max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 divide-x divide-gray-200',
    className,
  );

  return <div className={rootClass}>{children}</div>;
}

Notification.propTypes = {};

export default Notification;
