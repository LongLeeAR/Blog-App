import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; // Create this file for your reducers
import rootSaga from './sagas'; // Create this file for your sagas

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', 
});

sagaMiddleware.run(rootSaga);

export default store;