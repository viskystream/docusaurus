import { ReactNode } from 'react';
import { DataGridState } from '../components/DataGrid/dataGridSlice';
import store from './store';

export type AppDispatch = ReturnType<typeof store.dispatch>

/* ********* */
/* DEVELOPER */
/* ********* */
export interface DeveloperState {
  name?: string
  email?: string
  groups?: string[]
}
/* ************* */
/* NOTIFICATIONS */
/* ************* */
export interface NotificationType {
  id: number
  severity?: 'error' | 'warning' | 'info' | 'success'
  title?: string
  description?: ReactNode
  dismissable?: boolean
  dismissed?: boolean
  action?: {
    type: string
    text?: string
    payload: any
  },
}

export interface NotificationsState {
  notifications: NotificationType[]
}

/* ************** */
/* COMBINED STATE */
/* ************** */
// Infer the `RootState` and `AppDispatch` types from the store itself?
export interface RootState extends ReturnType<typeof store.getState> {
  '@shared/notifications': NotificationsState
  '@shared/developer': DeveloperState
  '@shared/data-grid': DataGridState
}

export type StringKeys = Record<string, any>;
