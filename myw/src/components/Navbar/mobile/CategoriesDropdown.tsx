import React, { Fragment, useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useAuth } from 'react-oidc-context';
import OutlineIcon from '../../OutlineIcon';
import { useGetUserRoutesQuery, Category as CategoryType } from '../../../services/api/endpoints/getUserRoutes';

interface CategoryProp {
  category: CategoryType
}

function Category({ category }: CategoryProp) {
  const [open, setOpen] = useState(false);

  const { name, routes } = category;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex flex-row w-full justify-between align-middle text-left p-2 mb-1 active:bg-primary-100"
      >
        <p className="p-1">{name}</p>
        {!open ? <ChevronRightIcon className="w-7 h-7" /> : <ChevronDownIcon className="w-7 h-7" />}
      </button>
      {open && routes.map((route) => (
        <a
          key={route.name}
          href={route.href}
          className="ml-2 flex rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 items-center"
        >
          <div
            className={`flex flex-shrink-0 h-12 w-12 items-center justify-center rounded-md text-${route.color}-700 bg-${route.color}-50`}
          >
            <OutlineIcon className="h-6 w-6" icon={route.icon} />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-900">{route.name}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function CategoriesDropdown() {
  const auth = useAuth();
  const { data: categories = {} } = useGetUserRoutesQuery(undefined, {
    skip: !auth.isAuthenticated,
  });

  return (
    <Fragment>
      {Object.keys(categories).map((key) => (
        <Category key={key} category={categories[key]} />
      ))}
    </Fragment>
  );
}
