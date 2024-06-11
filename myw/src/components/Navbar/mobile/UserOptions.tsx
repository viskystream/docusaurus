import React from 'react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { useAuth } from 'react-oidc-context';
import useGetUserProfile from '../../../services/oidc/useGetUserProfile';
import Button from '../../Button';
import signOut from '../../../utils/signOut';

export default function UserOptions() {
  // const [open, setOpen] = React.useState(false);
  const { email } = useGetUserProfile();
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return (
      <Button onClick={() => auth.signinRedirect()}>
        Login
      </Button>
    );
  }

  return (
    <div className="ml-2">
      <div className="flex text-gray-600 mb-3 pb-1">
        <UserIcon className="w-9 h-9" />
        <p className="ml-2 p-1.5">{email}</p>
      </div>
      <button
        type="button"
        className="flex w-full b-0 m-0 p-0 bg-transparent"
        onClick={() => {
          signOut(auth);
        }}
      >
        <ArrowRightOnRectangleIcon className="w-9 h-9 text-gray-900" />
        <p className="ml-2 p-1.5 text-gray-900">Logout</p>
      </button>
    </div>
  );
}
