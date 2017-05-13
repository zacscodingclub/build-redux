import React from 'react';

const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action({ dispatch, getState });
  }

  return next(action);
}

export default thunkMiddleware;
