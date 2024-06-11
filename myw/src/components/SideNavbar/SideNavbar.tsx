import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface SideNavbarProps {
  children?: ReactNode
  backgroundColor?: string
  isList?: boolean
  className?: string
  width?: string
  scrollable?: boolean
  maxWidth?: string
}

function SideNavbar({
  children,
  backgroundColor = 'gray-50',
  isList = true,
  width = 'w-fit',
  className = '',
  scrollable = true,
  maxWidth = 'max-w-[26rem]',
}: SideNavbarProps) {
  return (
    <div className={`relative block flex-none ${width} ${maxWidth} bg-${backgroundColor}`}>
      <div
        className={clsx('sticky top-[7.5rem] h-[calc(100vh-7.5rem)] max-md:pb-20', {
          'overflow-auto': scrollable,
          'overflow-hidden': !scrollable,
        })}
      >
        <nav>
          {isList ? (
            <ul className={`space-y-9 text-base lg:text-sm pr-8 xl:pr-16 py-9 pl-8 ${className}`}>
              {children}
            </ul>
          ) : (
            children
          )}
        </nav>
      </div>
    </div>
  );
}

export default SideNavbar;
