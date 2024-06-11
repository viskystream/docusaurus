import React from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useAuth } from 'react-oidc-context';
import { useGetUserProfile } from '../../../services';

export default function EnvironmentsDropdown() {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();
  const profile = useGetUserProfile();
  const environments = profile.domains;

  const environmentKeys = Object.keys(environments);

  if (auth.error || auth.isLoading || !auth.isAuthenticated) {
    return null;
  }

  if (environmentKeys.length === 0) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex flex-row w-full justify-between align-middle text-left px-2 mb-3 active:bg-primary-100"
      >
        <p className="p-1">Environments</p>
        {!open ? <ChevronRightIcon className="w-7 h-7" /> : <ChevronDownIcon className="w-7 h-7" />}
      </button>
      {open && environmentKeys.map((key) => (
        <a
          key={key}
          href={`https://${environments[key]}${window.location.pathname}`}
          className="ml-2 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
        >
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{key}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
