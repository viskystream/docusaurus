import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SideNavbarItemProps {
  children: ReactNode
  to: string
  end?: boolean
  notInSection?: boolean
  className?: string
}

function SideNavbarItem({
  children, to, end = false, notInSection = false, className,
}: SideNavbarItemProps) {
  return (
    <li className={clsx(className, 'relative')}>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) => clsx({
          // SideNavbarItem is a child of SideNavbarSection
          'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-trangray-y-1/2 before:rounded-full':
              !notInSection,
          'font-semibold text-primary-500 before:bg-primary-500': isActive && !notInSection,
          'text-gray-500 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block':
              !isActive && !notInSection,

          // SideNavbarItem is not child of SideNavbar
          'font-display font-medium text-primary-500 before:bg-primary-500': isActive && notInSection,
          'font-display font-medium text-gray-400 before:hidden before:bg-gray-300 hover:text-gray-600 hover:before:block':
              !isActive && notInSection,
        })}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default SideNavbarItem;
