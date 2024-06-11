import React, { useEffect } from 'react';
import { AuthProvider } from 'react-oidc-context';
import { User } from 'oidc-client-ts';
import { useGetPublicConfigQuery } from '../api/endpoints/getConfigValues';
import { Spin } from '../../components';
import storage from '../storage';

const HOST = process.env.REACT_APP_HOST ?? '';
const path = window.location.pathname;
const h = HOST || window.location.origin;
const host = window.location.hostname === 'localhost' ? 'https://localhost:3000' : h;
const defaultRedirectUri = `${host}${path}`;

interface Props {
  children: React.ReactNode;
  redirectUri?: string;
}

function OIDCProvider({
  children,
  redirectUri = defaultRedirectUri,
}: Props) {
  const jwt = storage.get('jwt');
  const isObject = typeof jwt === 'object';
  const { isLoading, data, error } = useGetPublicConfigQuery(undefined, { skip: isObject });

  useEffect(() => {
    if (jwt && isObject) {
      storage.remove('jwt');
    }
  }, [jwt, isObject]);

  /**
   * User is authenticated, redirect to remove OIDC params from URL
   */

  const onSigninCallback = (_user: void | User) => {
    const searchParams = storage.get('searchParams');
    storage.remove('searchParams');
    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}${searchParams || ''}`,
    );
  };

  if (isLoading || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (error) {
    return <div>Error...</div>;
  }

  const { clientId, keycloakUrl } = data;

  return (
    <AuthProvider
      authority={keycloakUrl}
      client_id={clientId}
      response_type="code"
      redirect_uri={redirectUri}
      onSigninCallback={onSigninCallback}
    >
      {children}
    </AuthProvider>
  );
}

export default OIDCProvider;
