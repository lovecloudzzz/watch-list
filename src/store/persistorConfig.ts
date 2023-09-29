import storage from 'redux-persist/es/storage';
import { RootState } from './reducers/reducer.ts';
import {PersistConfig} from "redux-persist/es/types"; // Import RootState from your reducer

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
};

export default persistConfig;