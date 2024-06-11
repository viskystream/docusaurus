import React from 'react';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import { useAuth } from 'react-oidc-context';
import Skeleton from '../Skeleton';
import {
  Dropdown, DropdownButton, DropdownItem, DropdownItems,
} from '../Dropdown';
import { useGetUserProfile } from '../../services';

function EnvironmentsMenu({ developmentMode = false }: { developmentMode?: boolean }) {
  const auth = useAuth();
  const profile = useGetUserProfile();
  const environments = profile.domains;
  const environmentKeys = developmentMode ? ['env-1', 'env-2', 'env-3'] : Object.keys(environments);

  if (auth.error) {
    return null;
  }

  if (auth.isAuthenticated && environmentKeys.length === 0) {
    return null;
  }

  return (
    <Dropdown className="leading-3">
      <Skeleton active={auth.isLoading}>
        <DropdownButton className="rounded-full !px-1 !py-1 shadow-none border-none" hideIcon>
          <span className="sr-only">View notifications</span>
          <Squares2X2Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </DropdownButton>
      </Skeleton>
      <DropdownItems position="right">
        <div className="font-medium border-b block mb-1 px-4 pt-2 pb-3 text-sm text-gray-700">
          Environments
        </div>

        {environmentKeys.map((key) => {
          const domain = environments[key];

          return (
            <DropdownItem key={key} as="a" href={developmentMode ? '#' : `https://${domain}${window.location.pathname}`}>
              {key}
            </DropdownItem>
          );
        })}
      </DropdownItems>
    </Dropdown>
  );
}

export default EnvironmentsMenu;
