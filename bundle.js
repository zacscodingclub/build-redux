const initialState = {
  nextNoteId: 1,
  notes: {}
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
    if (notes.length === 0) {
      "Add a note now!";
    } else {
      return Object.keys(notes).map(id => {
        React.createElement(
          "li",
          { className: "note-list-item", key: id },
          id
        );
      });
    }
  }

  return React.createElement(
    "div",
    null,
    React.createElement(
      "ul",
      { className: "note-list" },
      buildNotesList()
    )
  );
};

const renderApp = () => {
  ReactDOM.render(React.createElement(NoteApp, { notes: window.state.notes }), document.getElementById('root'));
};

window.state = initialState;
renderApp();

console.log;
