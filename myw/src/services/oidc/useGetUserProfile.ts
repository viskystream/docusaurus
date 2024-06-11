import { UserProfile } from 'oidc-client-ts';
import { useAuth } from 'react-oidc-context';

interface UserInfo extends UserProfile {
  domains: Record<string, string>;
  groups: string[];
  roles: string[];
}

const defaultUser:UserInfo = {
  aud: '',
  domains: {},
  email: '',
  email_verified: false,
  exp: 0,
  family_name: '',
  given_name: '',
  groups: [],
  iat: 0,
  iss: '',
  name: '',
  preferred_username: '',
  roles: [],
  session_state: '',
  sid: '',
  sub: '',
  typ: '',
};

function useGetUserProfile() {
  const auth = useAuth();
  const { user } = auth;
  const profile = (user?.profile || defaultUser) as UserInfo;

  return profile;
}

export default useGetUserProfile;
