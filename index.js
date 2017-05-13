const CREATE_NOTE = 'CREATE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';

const initialState = {
  nextNoteId: 1,
  notes: {}
};

const validateAction = (action) => {
  const isItAnObject = (!action || typeof action !== 'object'|| Array.isArray(action));
  if (isItAnObject) {
    throw new Error('Action must be an object');
  }
  const isItUndefined = typeof action.type === 'undefined';
  if (isItUndefined) {
    throw new Error('Action must have a type!');
  }
};

const createStore = (reducer) => {
  let state = undefined;
  const subscribers = [];
  const store = {
    dispatch: (action) => {
      validateAction(action);
      state = reducer(state, action);
      subscribers.forEach(handler => handler());
    },
    getState: () => state,
    subscribe: handler => {
      subscribers.push(handler);
      return () => {
        const index = subscribers.indexOf(handler);
        if (index > 0) {
          subscribers.splice(index, 1);
        }
      };
    }
  };
  store.dispatch({ type: '@@redux/INIT' });
  return store;
};


const handlers = {
  [CREATE_NOTE]: (state, action) => {
    const id = state.nextNoteId;
    const newNote = {
      id,
      content: ''
    };
    return {
      ...state,
      nextNoteId: id + 1,
      notes: {
        ...state.notes,
        [id]: newNote
      }
    }
  },
  [UPDATE_NOTE]: (state, action) => {
    const { id, content } = action;
    const editedNote = {
      ...state.notes[id],
      content
    };
    return {
      ...state,
      notes: {
        ...state.notes,
        [id]: editedNote
      }
    }
  }
};

const reducer = (state = initialState, action) => {
  if(handlers[action.type]){
    return handlers[action.type](state, action);
  }
  return state;
};

const NoteApp = ({ notes }) => {
  function buildNotesList() {
    if(notes) {
      return Object.values(notes).map(({id, content}) => {
        return (
          <li className="note-list-item" key={id}>
            {id}. {content}
          </li>
        )
      })
    }
    return "Add a note now!";
  }

  return (
    <div>
      <ul className="note-list">
        { buildNotesList() }
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(
    <NoteApp notes={store.getState().notes} />,
    document.getElementById('root')
  );
};

const store = createStore(reducer);

store.subscribe(() => {
  renderApp();
});

store.dispatch({
  type: CREATE_NOTE
});

store.dispatch({
  type: UPDATE_NOTE,
  id: 1,
  content: 'Hello, world!'
});
