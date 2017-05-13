const initialState = {
  nextNoteId: 1,
  notes: {}
}

const onAddNote = () => {
  const id = window.state.nextNoteId;
  window.state.notes[id] = {
    id,
    content: ''
  };
  window.state.nextNoteId++;
  renderApp();
}

const NoteApp = ({ notes }) => {
  function buildNotesList() {
    if(notes.length > 0) {
      return Object.keys(notes).map(id => {
        <li className="note-list-item" key={id}>
          {id}
        </li>
      })
    } else {
      return "Add a note now!"
    }
  }

  return (
    <div>
      <ul className="note-list">
        { buildNotesList() }
      </ul>
    </div>
  );
}

const renderApp = () => {
  ReactDOM.render(
    <NoteApp notes={window.state.notes} />,
    document.getElementById('root')
  );
};

window.state = initialState;
renderApp();
