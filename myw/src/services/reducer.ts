import notifications from '../features/Notifications/notificationsSlice';
import dataGridSlice from '../components/DataGrid/dataGridSlice';
import api from './api';

const reducer = {
  [notifications.reducerPath]: notifications.reducer,
  [dataGridSlice.reducerPath]: dataGridSlice.reducer,
  [api.reducerPath]: api.reducer,
};

export default reducer;
