// Import necessary functions and modules from Redux toolkit and related packages
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Import userReducer from userSlice
import themeReducer from './theme/themeSlice'; // Import themeReducer from themeSlice
import { persistReducer, persistStore } from 'redux-persist'; // Import persistReducer and persistStore from redux-persist
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist


// Combine multiple reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

// Configuration for Redux persist, specifying the key, storage, and version
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer by wrapping the root reducer with the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore, passing the persistedReducer and custom middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializableCheck middleware to allow non-serializable values
});

// Create a persistor for the store using persistStore
export const persistor = persistStore(store);
