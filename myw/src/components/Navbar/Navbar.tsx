import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { Popover } from '@headlessui/react';
import { useAuth } from 'react-oidc-context';
import Logo from '../Logo';
import NavbarCategories from './NavbarCategories';
import UserMenu from '../UserMenu';
import MobileNavbarItems from './mobile/MobileNavbar';

interface NavbarProps {
  sticky?: boolean
  fullscreen?: boolean
  children?: ReactNode
  noAuth?:boolean
}

const theme = process.env.REACT_APP_THEME;

function Navbar({
  sticky = true, fullscreen = false, children, noAuth = true,
}: NavbarProps) {
  const auth = useAuth();
  const fullscreenClass = fullscreen ? '' : 'max-w-7xl mx-auto md:px-8';

  const shouldRedirectToNativeFrame = theme === 'nativeframe' && !auth.isAuthenticated;

  return (
    <div className={clsx('z-[1000] top-0 bg-white shadow', sticky ? 'sticky' : '')}>
      <Popover>
        <div className={clsx('flex justify-between items-center h-16 px-4', fullscreenClass)}>
          {/* Logo */}
          <a href={shouldRedirectToNativeFrame ? 'https://nativeframe.com' : '/'} className="flex">
            <Logo />
          </a>

          {/* Categories */}
          <div className="pl-6 hidden md:flex-1 md:flex md:items-center md:justify-between">
            <NavbarCategories />
          </div>

          {/* Menus */}
          <div className="hidden md:flex items-center gap-2">
            <UserMenu className="pl-4" />
          </div>

          {/* Mobile-only popout menu */}
          <div className="md:hidden z-50">
            <MobileNavbarItems />
          </div>
        </div>

        {/* Secondary Navbar Below */}
        {(children && (!!auth.isAuthenticated || noAuth)) && (
          <nav className={clsx('flex justify-between px-4', fullscreenClass)}>
            {children}
          </nav>
        )}

      </Popover>
    </div>
  );
}

export default Navbar;
