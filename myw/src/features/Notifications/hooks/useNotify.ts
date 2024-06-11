import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationType } from '../../../services/types';
import { notify } from '../notificationsSlice';

const useNotify = () => {
  const dispatch = useDispatch();

  const notifyCallback = useCallback(
    (options: NotificationType) => {
      /**
       * Example Payload
       * {
       * 	 severity: 'info',
       * 	 title: 'Enable flash player',
       * 	 description: 'Requires Adobe Flash Player versi n 11.0 or above',
       * 	 action: {
       * 	 	 type: 'custom/action',
       * 	 	 text: 'Click me!',
       * 	 	 payload: { foo: 'bar' },
       * 	 }
       * }
       */
      dispatch(notify(options));
    },
    [dispatch],
  );

  return notifyCallback;
};

export default useNotify;
