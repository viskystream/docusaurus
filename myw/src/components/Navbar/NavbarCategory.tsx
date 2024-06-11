/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import OutlineIcon from '../OutlineIcon';
import { Category } from '../../services/api/endpoints/getUserRoutes';

function NavbarCategory({ name, routes }: Category) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              open ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
              'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium',
            )}
          >
            <span>{name}</span>
            <ChevronDownIcon
              className={clsx(
                open ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                'ml-2 h-5 w-5',
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={clsx('absolute z-10 mt-3 px-2 w-screen max-w-md sm:px-0 ', {
              'lg:max-w-3xl': routes.length > 1,
            })}
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className={clsx('relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8', {
                  'lg:grid-cols-2': routes.length > 1,
                })}
                >
                  {routes.map((route) => (
                    <a
                      key={route.name}
                      href={route.href}
                      className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
                    >
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-${route.color}-700 bg-${route.color}-50 sm:h-12 sm:w-12`}>
                        <OutlineIcon className="h-6 w-6" icon={route.icon} />
                      </div>
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{route.name}</p>
                        <p className="mt-1 text-sm text-gray-500">{route.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default NavbarCategory;
