import api from './api';
// import storage from '@shared/services/storage';

// const persistMiddleware = ({ getState }) => (next) => (action) => {
// 	if (action.type.includes('@shared/api/executeQuery/fulfilled')) {
// 		const state = getState();
// 		const apiState = state['@shared/api'];
// 		console.log('Shared:', apiState);
// 	}
// }

// @TODO-andrew:
// Hydrate shared api
// https://github.com/reduxjs/redux-toolkit/pull/1277

const middleware = [
  api.middleware,
  // persistMiddleware,
];

export default middleware;
