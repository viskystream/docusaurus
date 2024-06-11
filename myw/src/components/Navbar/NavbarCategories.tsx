import React from 'react';
import { Popover } from '@headlessui/react';
import { useAuth } from 'react-oidc-context';
import Skeleton from '../Skeleton';
import NavbarCategory from './NavbarCategory';
import { useGetUserRoutesQuery } from '../../services/api/endpoints/getUserRoutes';

function NavbarCategories() {
  const auth = useAuth();
  const { data: categories = {}, error, isLoading } = useGetUserRoutesQuery(undefined, {
    skip: !auth.isAuthenticated,
  });

  if (error || !auth.isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex space-x-2">
        <Skeleton active>
          <div className="h-8 w-24" />
        </Skeleton>
        <Skeleton active>
          <div className="h-8 w-24" />
        </Skeleton>
        <Skeleton active>
          <div className="h-8 w-24" />
        </Skeleton>
      </div>
    );
  }

  return (
    <Popover.Group as="nav" className="flex space-x-2">
      {Object.keys(categories).map((key) => {
        const { name, routes } = categories[key];

        return <NavbarCategory name={name} key={key} routes={routes} />;
      })}

      <a
        href="/docs"
        className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
      >
        <span>Docs</span>
      </a>

    </Popover.Group>
  );
}

export default NavbarCategories;
