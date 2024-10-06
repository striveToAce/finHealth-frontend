import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Persist configuration for redux-persist
const persistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

// Create a persist reducer for auth slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with the persisted auth reducer
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Setup persistor for the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
