import { useGetXcodeRegionQuery } from '../../../services/api/endpoints/getXcodeRegion';

const useXcodeRegion = (options = {}) => {
  const { select } = options;

  return useGetXcodeRegionQuery(undefined, {
    selectFromResult: select,
  });
};

export default useXcodeRegion;
