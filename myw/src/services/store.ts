import {
  configureStore, combineReducers, Reducer, ReducersMapObject, MiddlewareArray, Middleware,
} from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import middleware from './middleware';

const DEBUG = true;
type RootReducer = Reducer<any, any> | ReducersMapObject<any, any> | { [key: string]: any }

const rootReducer: RootReducer = {
  ...reducer,
};

const mw = new MiddlewareArray();

mw.concat([
  ...middleware,
]);

if (DEBUG) {
  middleware.concat(createLogger({
    collapsed: true,
  }) as Middleware);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mw),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type SharedRootState = ReturnType<typeof store.getState>
export type SharedAppDispatch = ReturnType<typeof store.dispatch>

export const injectReducer = (key: string, rdcer: Reducer) => {
  rootReducer[key] = rdcer;
  store.replaceReducer(combineReducers(rootReducer));
};
declare global {
  interface Window {
    store: any;
  }
}
if (DEBUG) {
  window.store = store;
}

export default store;
