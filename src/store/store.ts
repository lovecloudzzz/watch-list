import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducer.ts';
import persistConfig from './persistorConfig.ts';
import { persistReducer, persistStore } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor: Persistor = persistStore(store);

export { store, persistor };