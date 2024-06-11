import { AuthContextProps } from 'react-oidc-context';
import { storage } from '../services';

const signOut = (auth:AuthContextProps) => {
  storage.remove('searchParams');
  storage.remove('jwt');
  auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
};

export default signOut;
