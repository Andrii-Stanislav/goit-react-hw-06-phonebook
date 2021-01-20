import { createAction } from '@reduxjs/toolkit';

export const createContact = createAction('contacts/create');
export const deleteContact = createAction('contacts/delete');

