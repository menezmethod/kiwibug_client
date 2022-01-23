import { combineReducers, createStore } from 'redux';

import snackbarReducer from './models/snackbar';

const reducer = combineReducers({
  snackbar: snackbarReducer,
});

const store = createStore(reducer, {});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
