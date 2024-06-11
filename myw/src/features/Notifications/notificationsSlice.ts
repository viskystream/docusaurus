import { createSelector, createSlice } from '@reduxjs/toolkit';
import { NotificationType, NotificationsState, RootState } from '../../services/types';

const name = '@shared/notifications';

const { reducer, actions } = createSlice({
  name,
  initialState: {
    notifications: [],
  },
  reducers: {
    notify: (state: NotificationsState, { payload }: { payload: NotificationType }) => {
      /**
       * Example Payload
       * {
       * 	 severity: 'info',
       * 	 title: 'Enable flash player',
       * 	 description: 'Requires Adobe Flash Player version 11.0 or above',
       * 	 action: {
       * 	 	 type: 'custom/action',
       * 	 	 text: 'Click me!',
       * 	 	 payload: { foo: 'bar' },
       * 	 }
       * }
       */
      const {
        severity, title, description, action, dismissable = true, id,
      } = payload;

      const notification = {
        id: id ?? Math.round(Date.now() * Math.random()),
        dismissed: false,
        severity,
        title,
        description,
        action,
        dismissable,
      };

      state.notifications = [notification, ...state.notifications.slice(0, 3)];
    },
    dismiss: (state: NotificationsState, action: { payload: { id?: number, max?: number } }) => {
      const { id, max = 3 } = action.payload;

      state.notifications = [...state.notifications.slice(0, max)];

      if (id) {
        const index = state.notifications.findIndex((notification) => notification.id === id);
        if (index !== -1) state.notifications[index].dismissed = true;
        return;
      }

      const index = state.notifications
        .slice()
        .reverse()
        .findIndex((notification) => !notification.dismissed);

      const count = state.notifications.length - 1;
      const finalIndex = index >= 0 ? count - index : index;

      if (finalIndex !== -1) {
        state.notifications[finalIndex].dismissed = true;
      }
    },
  },
});

const { notify, dismiss } = actions;
export { notify, dismiss };

export const getSlice = (state: RootState) => state[name];
export const getNotifications = createSelector(getSlice, (slice) => slice?.notifications ?? []);
export const getActiveNotifications = createSelector(getNotifications, (notifications) => notifications.filter((notification) => !notification.dismissed));

const notificationsSlice = {
  reducerPath: name,
  reducer,
};

export default notificationsSlice;
