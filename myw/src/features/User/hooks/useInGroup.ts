import { useMemo } from 'react';
import { useGetUserProfile } from '../../../services';

const useInGroup = (groups: string[]) => {
  const { groups: groupsState } = useGetUserProfile();

  const inGroup = useMemo(() => groups.some((g) => groupsState.includes(g)), [groups, groupsState]);

  return inGroup;
};

export default useInGroup;
