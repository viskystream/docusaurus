import { useMemo } from 'react';
import { useGetUserProfile } from '../../../services';

const useHasRole = (roles: string[]) => {
  const { roles: userRoles } = useGetUserProfile();

  const hasRole = useMemo(() => roles.every((role) => userRoles.includes(role)), [roles, userRoles]);

  return hasRole;
};

export default useHasRole;
