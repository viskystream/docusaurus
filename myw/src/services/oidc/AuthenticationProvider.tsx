import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import storage from '../storage';
import Button from '../../components/Button';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { DashboardGrid } from '../../layouts/Dashboard';
import Spin from '../../components/Spin';
import OIDCProvider from './OIDCProvider';
import signOut from '../../utils/signOut';
import useGetUserProfile from './useGetUserProfile';
import { Text } from '../../components';
import { useGetPublicConfigQuery } from '../api/endpoints/getConfigValues';

const BASENAME = process.env.BASENAME ?? '/';

function isCurrentRoutePublic(publicRoutes: string[] | '*', pathname: string) {
  // all routes are public
  if (publicRoutes === '*') {
    return true;
  }

  // all routes are private
  if (!publicRoutes.length) {
    return false;
  }

  // if location matches publicRoutes, don't redirect to login
  if (Array.isArray(publicRoutes)) {
    let isPublicRoute = false;
    // filter out empty strings
    publicRoutes.filter((route) => !!route).forEach((route) => {
      if (pathname.startsWith(route)) {
        isPublicRoute = true;
      }
    });
    return isPublicRoute;
  }

  return false;
}

interface Props {
  publicRoutes?: string[] | '*';
  children: JSX.Element;
}

function Authentication({ publicRoutes = [], children }: Props) {
  const [isJwtSet, setIsJwtSet] = useState(false);
  const auth = useAuth();
  const location = useLocation();
  const isPublicRoute = isCurrentRoutePublic(publicRoutes, location.pathname);
  const signInRequired = !auth.isAuthenticated && !isPublicRoute;
  const routePath = `${window.location.origin}${BASENAME}${location.pathname}`;
  const { groups } = useGetUserProfile();
  const isInAnyGroup = groups.length > 0;
  const isNativeframe = process.env.REACT_APP_THEME === 'nativeframe';
  const { isLoading: isConfigLoading, data } = useGetPublicConfigQuery();
  const redirectHint = useRef(new URLSearchParams(window.location.search).get('redirect_hint') ?? null);

  useEffect(() => {
    const jwt = storage.get('jwt');
    if (jwt && typeof jwt !== 'string') {
      storage.remove('jwt');
      signOut(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      storage.set('jwt', auth.user.access_token);
      setIsJwtSet(true);
    }

    if (auth.error || !auth.isAuthenticated) {
      storage.remove('jwt');
      setIsJwtSet(false);
    }
  }, [auth.isAuthenticated, auth.user, auth.error]);

  useEffect(() => {
    /**
     * Automatically redirect to login if user is not authenticated and trying to access a private route
     */
    if (isConfigLoading) return;

    if (signInRequired && !auth.isLoading && !auth.error) {
      let searchParams = window.location.search;

      if (searchParams) {
        const newSearchParams = new URLSearchParams(searchParams);
        // remove redirect_hint from searchParams
        if (redirectHint) {
          newSearchParams.delete('redirect_hint');
          searchParams = newSearchParams.toString();
        }

        storage.set('searchParams', searchParams);
      }

      if (isNativeframe) {
        if (redirectHint.current === 'signup' && isNativeframe) {
          const redirectUri = encodeURIComponent(`${window.location.origin}/docs?redirect_hint=login`);
          const signUpLink = `${data?.keycloakUrl}/protocol/openid-connect/registrations?client_id=${data?.clientId}&scope=openid%20profile&redirect_uri=${redirectUri}&response_type=code`;
          window.location.replace(signUpLink);
        } else if (redirectHint.current === 'login') {
          auth.signinRedirect();
        } else if (window.location.pathname === '/') {
          window.location.href = '/docs';
        } else {
          auth.signinRedirect();
        }
      } else {
        auth.signinRedirect();
      }
    } else if (isNativeframe && !auth.isLoading && !auth.error && !auth.isAuthenticated && redirectHint.current === 'login') {
      auth.signinRedirect();
    }
  }, [signInRequired, auth, isNativeframe, location.pathname, isConfigLoading, data?.keycloakUrl, data?.clientId]);

  if (auth.isLoading || (!isJwtSet && auth.isAuthenticated && auth.user)) {
    let message = '';
    switch (auth.activeNavigator) {
      case 'signinRedirect':
        message = 'Redirecting to sign in...';
        break;
      case 'signoutRedirect':
        message = 'Signing you out...';
        break;
      default:
    }
    return (
      <div className="h-screen bg-gray-100 px-8 flex flex-col justify-center items-center">
        {!!message && <p className="mb-4">{message}</p>}
        <div>
          <Spin />
        </div>
      </div>
    );
  }

  if (signInRequired && auth.error) {
    return (
      <div className="h-screen bg-gray-100 px-8 flex justify-center items-center">
        <DashboardGrid className="max-w-screen-lg lg:min-w-[70rem] md:min-w-[100%] mx-auto">
          <DashboardGrid item>
            <Card>
              <CardHeader primary={auth.error.message} className="text-center" />
              <CardContent className="flex justify-center">
                <Button onClick={() => auth.signinRedirect({ redirect_uri: routePath })}>
                  Log in
                </Button>
              </CardContent>
            </Card>
          </DashboardGrid>
        </DashboardGrid>
      </div>
    );
  }

  /** User has no groups and cannot see any apps and routs except for public ones */
  if (!isPublicRoute && !isInAnyGroup && auth.isAuthenticated) {
    return (
      <div className="h-screen bg-gray-100 px-8 flex justify-center items-center">
        <DashboardGrid className="max-w-screen-lg lg:min-w-[70rem] md:min-w-[100%] mx-auto">
          <DashboardGrid item>
            <Card>
              <CardHeader primary="Permission Denied" className="text-center" />
              <CardContent className="flex flex-col items-center justify-center">
                <Text size="md"> Group association is required to access this application.</Text>
                <Text size="md"> Please contact your administrator to get assigned to a group.</Text>
                <Button onClick={() => signOut(auth)} className="my-2">
                  Go back
                </Button>
              </CardContent>
            </Card>
          </DashboardGrid>
        </DashboardGrid>
      </div>
    );
  }

  /**
     * User is authenticated and ready to go
     */
  return children;
}

function AuthenticationProvider({ publicRoutes, children }: Props) {
  return (
    <OIDCProvider>
      <Authentication publicRoutes={publicRoutes}>
        {children}
      </Authentication>
    </OIDCProvider>
  );
}

export default AuthenticationProvider;
