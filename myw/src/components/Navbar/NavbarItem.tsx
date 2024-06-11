import React, { ReactNode, MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

interface NavbarItemProps {
  to: string
  children: ReactNode
  end?: boolean
  external?: boolean
  active?: boolean
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

function NavbarItem({
  to, children, end = false, external = false, active = false, onClick,
}: NavbarItemProps) {
  if (external) {
    return (
      <a
        href={to}
        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 capitalize whitespace-nowrap py-4 px-1 border-b-3 font-medium text-sm"
      >
        {children}
      </a>
    );
  }
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) => clsx(
        isActive || active
          ? 'border-primary-500 text-primary-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'capitalize whitespace-nowrap py-4 px-1 border-b-3 font-medium text-sm',
      )}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default NavbarItem;
