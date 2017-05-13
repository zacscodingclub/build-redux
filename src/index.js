import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider';
import createStore from './store';
import { reducer } from './reducers';
import NoteAppContainer from './components/NoteAppContainer';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <NoteAppContainer />
  </Provider>,
  document.getElementById('root')
);
