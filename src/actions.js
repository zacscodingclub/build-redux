import React from 'react';
import api from './api';
import { CREATE_NOTE } from './reducers';

export const createNote = () => {
  return ({ dispatch }) => {
    dispatch({
      type: CREATE_NOTE
    });
    api.createNote()
          .then(({ id }) => {
            dispatch({
              type: CREATE_NOTE,
              id
            });
          });
  }
};
