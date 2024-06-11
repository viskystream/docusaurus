/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import {
  Dropdown, DropdownButton, DropdownItems, DropdownItem,
} from '../Dropdown';
import useGetUserProfile from '../../services/oidc/useGetUserProfile';
import Button from '../Button';
import signOut from '../../utils/signOut';

interface UserMenuProps {
  className?: string;
}

const BASENAME = process.env.BASENAME || '/';
function UserMenu({ className = '' }: UserMenuProps) {
  const auth = useAuth();
  const { name, email } = useGetUserProfile();
  const location = useLocation();
  const routePath = `${window.location.origin}${BASENAME}${location.pathname}`;

  if (!auth.isAuthenticated) {
    return (
      <Button
        onClick={() => {
          auth.signinRedirect({ redirect_uri: routePath });
        }}
        type="button"
      >
        Login
      </Button>
    );
  }

  return (
    <Dropdown className={className}>
      <DropdownButton className="!rounded-full !px-0 !py-0 shadow-none border-none" hideIcon>
        <Avatar loading={auth.isLoading} size="sm" radius="full" username={name} />
      </DropdownButton>
      <DropdownItems position="right">
        <div className="font-medium border-b block mb-1 px-4 pt-2 pb-3 text-sm text-gray-700">
          {email}
        </div>
        <DropdownItem
          as="a"
          onClick={() => {
            signOut(auth);
          }}
        >
          Logout
        </DropdownItem>
      </DropdownItems>
    </Dropdown>
  );
}

export default UserMenu;
