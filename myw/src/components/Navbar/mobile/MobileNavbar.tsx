import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '../../Logo';
import CategoriesDropdown from './CategoriesDropdown';
import EnvironmentsDropdown from './EnvironmentsDropdown';
import UserOptions from './UserOptions';

export default function MobileNavbarItems() {
  return (
    <div>
      <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
        <span className="sr-only">Open menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-200">
                  <Logo />
                </a>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="mt-6">
                <nav className="grid gap-6">
                  <div className="overflow-y-scroll max-h-[50vh]">
                    <CategoriesDropdown />
                    <EnvironmentsDropdown />

                    <a
                      href="/docs"
                      className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 ml-3 inline-flex items-center"
                    >
                      <span>Docs</span>
                    </a>

                  </div>
                  <UserOptions />
                </nav>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </div>
  );
}
