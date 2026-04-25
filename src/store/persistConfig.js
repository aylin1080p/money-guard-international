// export const persistConfig = {
//   key: 'auth',
//   whitelist: ['token'],
// };


// import storage from 'redux-persist/lib/storage'; // ← add later
import createWebStorageModule from 'redux-persist/lib/storage/createWebStorage';  // ← remove later

const createWebStorage = createWebStorageModule.default ?? createWebStorageModule;  // ← remove later
const storage = createWebStorage('local'); // ← remove later

export const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
