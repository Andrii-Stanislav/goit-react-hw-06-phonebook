import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
  persistStore,
  persistReducer,
  contactsPersistConfig,
  middleware,
} from './persistConfig';

import { contactsReducer } from './contactsItems/contacts-reducer';
import { filterReducer } from './filter/filter-reducer';

const reducer = {
  contacts: persistReducer(
    contactsPersistConfig,
    combineReducers({
      items: contactsReducer,
      filter: filterReducer,
    }),
  ),
};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export { store, persistor };
