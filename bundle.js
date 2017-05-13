"use strict";

var initialState = {
  nextNoteId: 1,
  notes: {}
};

var onAddNote = function onAddNote() {
  var id = window.state.nextNoteId;
  window.state.notes[id] = {
    id: id,
    content: ''
  };
  window.state.nextNoteId++;
  renderApp();
};

var NoteApp = function NoteApp(_ref) {
  var notes = _ref.notes;

  function buildNotesList() {
    if (notes.length > 0) {
      return Object.keys(notes).map(function (id) {
        React.createElement(
          "li",
          { className: "note-list-item", key: id },
          id
        );
      });
    } else {
      return "Add a note now!";
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

var renderApp = function renderApp() {
  ReactDOM.render(React.createElement(NoteApp, { notes: window.state.notes }), document.getElementById('root'));
};

window.state = initialState;
renderApp();
