import { createReducer } from '@reduxjs/toolkit';
import { changeFilter } from './filter-actions';

export const filterReducer = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});
