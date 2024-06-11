import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}
interface NotificationContentProps {
  className?: string
  children?: ReactNode
  icon: ((props: IconProps) => JSX.Element) | null
  iconSeverity?: 'error' | 'warning' | 'info' | 'success'
}

function NotificationContent({
  className = '', children, icon: Icon, iconSeverity,
}: NotificationContentProps) {
  const rootClass = clsx('w-0 flex-1 flex items-center p-4', className);
  const contentClass = clsx({
    'w-full': !Icon,
    'ml-3 w-0 flex-1 pt-0.5': !!Icon,
  });
  const iconClass = clsx({
    'h-6 w-6': true,
    'text-gray-400': !iconSeverity,
    'text-red-400': iconSeverity === 'error',
    'text-yellow-400': iconSeverity === 'warning',
    'text-blue-400': iconSeverity === 'info',
    'text-green-400': iconSeverity === 'success',
  });

  return (
    <div className={rootClass}>
      {Icon && (
        <div className="flex-shrink-0 self-start">
          <Icon className={iconClass} />
        </div>
      )}
      <div className={contentClass}>{children}</div>
    </div>
  );
}

export default NotificationContent;
