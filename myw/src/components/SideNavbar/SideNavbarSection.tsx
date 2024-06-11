import React, { ReactNode } from 'react';

interface SideNavbarSectionProps {
  children?: ReactNode
  title: string
  className?: string
}

function SideNavbarSection({ children, title, className = '' }: SideNavbarSectionProps) {
  return (
    <li>
      <h2 className="font-display font-medium text-gray-900 capitalize">{title}</h2>
      <ul className={`mt-2 space-y-2 border-l-2 border-gray-100 lg:mt-4 lg:space-y-4 lg:border-gray-200 ${className}`}>
        {children}
      </ul>
    </li>
  );
}

export default SideNavbarSection;
