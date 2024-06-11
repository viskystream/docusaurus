import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { Transition } from '@headlessui/react';
import {
  InformationCircleIcon, ExclamationTriangleIcon, XCircleIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationType } from '../../services/types';
import {
  Notification,
  NotificationAction,
  NotificationActions,
  NotificationContent,
  NotificationTitle,
  NotificationDescription,
} from '../../components/Notification';
import { dismiss, getNotifications, getActiveNotifications } from './notificationsSlice';
import useMediaQuery from '../../hooks/useMediaQuery';

const NotificationsProvider = ({ className = '', maxAlerts = 2, duration = 6000 }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);
  const activeAlerts = useSelector(getActiveNotifications);
  const [hover, setHover] = useState(false);

  const mediaQueryLG = useMediaQuery('lg');
  const max = useMemo(() => (mediaQueryLG ? maxAlerts : 1), [mediaQueryLG, maxAlerts]);

  useEffect(() => {
    if (!activeAlerts.length || hover) {
      return () => null;
    }

    const interval = setInterval(() => {
      dispatch(dismiss({ max }));
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, hover, duration, activeAlerts, max]);

  const onMouseEnter = useCallback(() => setHover(true), [setHover]);
  const onMouseLeave = useCallback(() => setHover(false), [setHover]);
  const onDismissClick = useCallback((id: number) => dispatch(dismiss({ id })), [dispatch]);
  const onActionClick = useCallback(
    (id: number, { type, payload }: { type: string, payload: any }) => {
      dispatch({
        type,
        ...payload,
      });
      dispatch(dismiss({ id }));
    },
    [dispatch],
  );

  const rootClass = clsx(
    'px-2 py-1 fixed z-[999] inset-0 pointer-events-none flex flex-col-reverse items-center justify-start sm:flex-col sm:items-end',
    className,
  );

  const getIcon = useCallback((severity?: string) => {
    if (!severity) {
      return null;
    }

    switch (severity) {
      case 'error':
        return XCircleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
      default:
        return CheckCircleIcon;
    }
  }, []);

  return ReactDOM.createPortal(
    <div className={rootClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {notifications.map(
        ({
          id, title, description, severity, dismissed, dismissable, action,
        }: NotificationType, index: number) => {
          const icon = getIcon(severity);
          const transitionClass = clsx('px-2 py-3 max-w-md w-full transform transition ease duration-300');
          return (
            <Transition
              className={transitionClass}
              key={id}
              appear
              show={index < max && !dismissed}
              enter="duration-300 transition transform"
              enterFrom="opacity-0 scale-50 max-h-0"
              enterTo="opacity-100 scale-100 scale-y-100 max-h-full"
              leave="duration-300 transition transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              <Notification>
                <NotificationContent icon={icon} iconSeverity={severity}>
                  <NotificationTitle>{title}</NotificationTitle>
                  {description && <NotificationDescription>{description}</NotificationDescription>}
                </NotificationContent>
                {(action || dismissable) && (
                  <NotificationActions>
                    {action && (
                      <NotificationAction onClick={() => onActionClick(id, action)}>{action.text}</NotificationAction>
                    )}
                    {dismissable && (
                      <NotificationAction variant="secondary" onClick={() => onDismissClick(id)}>
                        Dismiss
                      </NotificationAction>
                    )}
                  </NotificationActions>
                )}
              </Notification>
            </Transition>
          );
        },
      )}
    </div>,
    document.body,
  );
};

export default NotificationsProvider;
