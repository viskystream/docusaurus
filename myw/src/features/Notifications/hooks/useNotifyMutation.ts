import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { NotificationType } from '../../../services/types';
import { dismiss, notify } from '../notificationsSlice';

type Notification = Omit<NotificationType, 'id'>

type NotifyMutationOptions = {
  success?: Notification | ((mutationState: any) => NotificationType);
  error?: Notification | ((error: any) => NotificationType);
  callback?: (mutationState: any) => void;
  showLoading?: boolean
};

const useNotifyMutation = (
  mutationState: any,
  options: NotifyMutationOptions,
) => {
  const id = Math.random();
  const {
    success: successOptions, error: errorOptions, callback, showLoading,
  } = options;
  const [loadingNotificationId, setLoadingNotificationId] = useState(Math.random());
  const dispatch = useDispatch();
  const notifyCallback = useCallback((notifyOptions: NotificationType) => dispatch(notify(notifyOptions)), [dispatch]);
  const dismissCallback = useCallback((dismissOptions: { id?: number, max?: number }) => dispatch(dismiss(dismissOptions)), [dispatch]);

  useEffect(() => {
    const {
      isFetching, isSuccess, isError, error, isLoading,
    } = mutationState;

    if ((isFetching || isLoading) && showLoading) {
      notifyCallback({
        id: loadingNotificationId,
        title: 'Loading...',
        severity: 'info',
      });
    }

    if (!isFetching && isSuccess) {
      if (showLoading) {
        dismissCallback({ id: loadingNotificationId });
        setLoadingNotificationId(Math.random());
      }

      if (successOptions instanceof Function) {
        notifyCallback({
          severity: 'success',
          title: 'Success',
          ...successOptions(mutationState),
        });
      } else {
        notifyCallback({
          id,
          severity: 'success',
          title: 'Success',
          ...successOptions,
        });

        if (mutationState.reset) {
          mutationState.reset();
        }

        if (callback) {
          callback(mutationState);
        }
      }
    }

    if (!isFetching && isError) {
      if (showLoading) {
        dismissCallback({ id: loadingNotificationId });
        setLoadingNotificationId(Math.random());
      }

      if (errorOptions instanceof Function) {
        notifyCallback({
          severity: 'error',
          title: 'Error',
          ...errorOptions(error),
        });
      } else {
        notifyCallback({
          id,
          severity: 'error',
          title: 'Error',
          ...errorOptions,
        });
      }

      if (mutationState.reset) {
        mutationState.reset();
      }

      if (callback) {
        callback(mutationState);
      }
    }
  }, [mutationState, notifyCallback, dismissCallback]);

  return notifyCallback;
};

export default useNotifyMutation;
