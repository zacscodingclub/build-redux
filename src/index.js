import React from 'react';
import ReactDOM from 'react-dom';

import createStore from './store';
import { reducer } from './reducers';
import NoteAppContainer from './NoteAppContainer';

const store = createStore(reducer);

ReactDOM.render(
  <NoteAppContainer notes={store.getState().notes} store={store} />,
  document.getElementById('root')
);
