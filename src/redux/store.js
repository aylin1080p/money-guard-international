import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import {contactsReducer} from './contacts/slice';
// import { filtersReducer } from './filters/slice';
import { authReducer } from "./auth/slice";
// import storage from 'redux-persist/lib/storage'; // ← add later
import createWebStorageModule from 'redux-persist/lib/storage/createWebStorage';  // ← remove later

const createWebStorage = createWebStorageModule.default ?? createWebStorageModule;  // ← remove this line later
const storage = createWebStorage('local'); // ← remove this line later

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // contacts: contactsReducer,
    // filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);