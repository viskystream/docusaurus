import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface NavbarSectionProps {
  children: ReactNode
  className?: string
}

function NavbarSection({ children, className = '' }: NavbarSectionProps) {
  return (
    <div className={clsx(className, 'flex gap-6 items-center')}>
      {children}
    </div>
  );
}

export default NavbarSection;
