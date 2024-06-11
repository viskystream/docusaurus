/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { ElementType, memo, ReactNode } from 'react';
import clsx from 'clsx';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export interface ComponentProps {
  children: ReactNode,
  className: string
}

export interface BreadcrumbsPage {
  name?: string,
  className?: string,
  component: React.ComponentType<ComponentProps> | ElementType,
  icon?: React.ElementType
}

export interface BreadcrumbsProps {
  className?: string,
  pages?: BreadcrumbsPage[],
  role?: string,
}

function Breadcrumbs({ className, pages }: BreadcrumbsProps) {
  return (
    <nav className={clsx('flex max-w-[74vw]', className)} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 overflow-x-auto">
        {pages?.map((page, i) => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            name, className = '', component: Component, icon: Icon, ...otherProps
          } = page;

          return (
            <li key={name}>
              <div className="flex items-center">
                {i !== 0 && <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />}
                <Component
                  {...otherProps}
                  className={clsx('ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer', className)}
                >
                  {Icon && <Icon className="flex-shrink-0 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />}
                  {!Icon && name}
                </Component>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default memo(Breadcrumbs);
