import { createReducer } from '@reduxjs/toolkit';
import { createContact, deleteContact } from './contacts-actions';

const contactsReducer = createReducer([], {
  [createContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) => [
    ...state.filter(contact => contact.id !== payload),
  ],
});

export { contactsReducer };
