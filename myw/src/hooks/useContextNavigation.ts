import { useOutletContext } from 'react-router-dom';
//import { ApiNavigation } from '@dev-center/shared/src/services/api/endpoints/getDocsNavigation';

type ContextType = {
  navigation: null
}

const useNavigiation = () => useOutletContext<ContextType>();

export default useNavigiation;
