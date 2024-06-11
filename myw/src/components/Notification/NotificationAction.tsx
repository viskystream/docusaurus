import React, { ReactNode } from 'react';
import clsx from 'clsx';

const variants = {
  primary: 'text-primary-600 hover:text-primary-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-primary-500',
  secondary: 'text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500',
};

interface NotificationActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
  variant?: keyof typeof variants
}

function NotificationAction({
  className = '', children, variant = 'primary', ...rest
}: NotificationActionProps) {
  const rootClass = clsx(
    'w-full border border-transparent rounded-none px-4 py-3 flex items-center justify-center text-sm font-medium first:rounded-tr-lg last:rounded-br-lg',
    {
      [variants[variant]]: true,
    },
    className,
  );

  return (
    <div className="h-0 flex-1 flex">
      <button {...rest} className={rootClass} type="button">
        {children}
      </button>
    </div>
  );
}

export default NotificationAction;
