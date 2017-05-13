import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider';
import createStore from './store';
import { reducer } from './reducers';
import { applyMiddleware, delayMiddleware, loggingMiddleWare } from './middleware';
import thunkMiddleware from './thunk';
import NoteAppContainer from './components/NoteAppContainer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleWare));

ReactDOM.render(
  <Provider store={store}>
    <NoteAppContainer />
  </Provider>,
  document.getElementById('root')
);
