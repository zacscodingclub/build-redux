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
  return (
    <div>
      <ul className="note-list">
        {
          Object.keys(notes).map(id => {
            <li className="note-list-item" key={id}>
              {id}
            </li>
          });
        }
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
