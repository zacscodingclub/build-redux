const CREATE_NOTE = 'CREATE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';

const initialState = {
  nextNoteId: 1,
  notes: {}
}
window.state = initialState;

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

const onAddNote = () => {
  const id = window.state.nextNoteId;
  window.state.notes[id] = {
    id,
    content: ''
  };
  window.state.nextNoteId++;
  renderApp();
};

const NoteApp = ({ notes }) => {
  function buildNotesList() {
    if(notes) {
      return Object.values(notes).map(({id, content}) => {
        return (
          <li className="note-list-item" key={id}>
            {content}
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
    <NoteApp notes={window.state.notes} />,
    document.getElementById('root')
  );
};

const actions = [
  {type: CREATE_NOTE},
  {type: UPDATE_NOTE, id: 1, content: 'herro world!'},
  {type: CREATE_NOTE},
  {type: UPDATE_NOTE, id: 2, content: 'number 2!'}
];

const state = actions.reduce(reducer, undefined);

renderApp();
