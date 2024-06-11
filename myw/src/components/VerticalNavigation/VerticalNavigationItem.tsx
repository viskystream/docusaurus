import React, {
  memo, ReactNode, Fragment,
} from 'react';
import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface VerticalNavigationItemProps {
  children?: ReactNode;
  className?: string;
  to: string;
  icon?: (React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>) | ((pros: any) => JSX.Element);
  count?: number;
}

function VerticalNavigationItem({
  className,
  children,
  to,
  icon: Icon,
  count = 0,
  ...otherProps
}: VerticalNavigationItemProps & NavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(
        isActive
          ? 'bg-gray-200 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'flex items-center px-3 py-2 text-sm font-medium rounded-md',
        className,
      )}
      {...otherProps}
    >
      {({ isActive }) => (
        <Fragment>
          {Icon && (
            <Icon
              className={clsx(
                isActive ? 'text-gray-500' : 'text-gray-400',
                'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
              )}
              aria-hidden="true"
            />
          )}
          <span className="truncate">{children}</span>
          {count ? (
            <span
              className={clsx(
                isActive ? 'bg-gray-50' : 'bg-gray-200 text-gray-600',
                'ml-auto inline-block py-0.5 px-3 text-xs rounded-full',
              )}
            >
              {count}
            </span>
          ) : null}
        </Fragment>
      )}
    </NavLink>
  );
}

export default memo(VerticalNavigationItem);
