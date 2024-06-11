import React from 'react';
import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NotificationDismissProps {
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function NotificationDismiss({ className = '', onClick = () => { } }: NotificationDismissProps) {
  const rootClass = clsx(className);

  return (
    <div className="ml-auto pl-3">
      <div className="-mx-1.5 -my-1.5">
        <button onClick={onClick} className={rootClass} aria-label="Dismiss" type="button">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default NotificationDismiss;
