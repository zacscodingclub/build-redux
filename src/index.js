import createStore from './store';
import { handlers, reducer, validateAction, CREATE_NOTE, UPDATE_NOTE } from './reducers';

import NoteApp from './NoteApp';
import NoteEditor from './NoteEditor';

const store = createStore(reducer);

const renderApp = () => {
  ReactDOM.render(
    <NoteApp notes={store.getState().notes} />,
    document.getElementById('root')
  );
};

store.subscribe(() => {
  renderApp();
});

store.dispatch({
  type: CREATE_NOTE
});

store.dispatch({
  type: UPDATE_NOTE,
  id: 1,
  content: 'some change!'
});
