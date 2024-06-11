import React, {
  ReactNode, useEffect,
} from 'react';
import { useAuth } from 'react-oidc-context';
import storage from '../../services/storage';
import Spin from '../../components/Spin';
import { DashboardGrid } from '.';
import { Card, CardContent, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useGetUserProfile } from '../../services';

type DashboardAuthSuspenseProps = {
  children: ReactNode;
};

function DashboardAuthSuspense({ children }: DashboardAuthSuspenseProps) {
  const auth = useAuth();
  const {
    isLoading: authIsLoading, error: authError, isAuthenticated, signinRedirect,
  } = auth;
  const profile = useGetUserProfile();

  useEffect(() => {
    if (isAuthenticated) {
      storage.set('jwt', profile);
    }

    if (authError) {
      storage.remove('jwt');
    }
  }, [isAuthenticated, profile, authError]);

  if (authError) {
    return (
      <DashboardGrid className="max-w-screen-lg lg:min-w-[70rem] md:min-w-[100%] mx-auto mt-7">
        <DashboardGrid item>
          <Card>
            <CardHeader primary="You are not logged in" className="text-center" />
            <CardContent className="flex justify-center">
              <Button onClick={() => signinRedirect()}>
                Log in
              </Button>
            </CardContent>
          </Card>
        </DashboardGrid>
      </DashboardGrid>
    );
  }

  if (authIsLoading) {
    return <Spin className="mt-8" />;
  }

  return children as React.ReactElement;
}

export default DashboardAuthSuspense;
