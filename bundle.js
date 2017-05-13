'use strict';

var _handlers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_NOTE = 'CREATE_NOTE';
var UPDATE_NOTE = 'UPDATE_NOTE';

var initialState = {
  nextNoteId: 1,
  notes: {}
};
window.state = initialState;

var handlers = (_handlers = {}, _defineProperty(_handlers, CREATE_NOTE, function (state, action) {
  var id = state.nextNoteId;
  var newNote = {
    id: id,
    content: ''
  };
  return Object.assign({}, state, {
    nextNoteId: id + 1,
    notes: Object.assign({}, state.notes, _defineProperty({}, id, newNote))
  });
}), _defineProperty(_handlers, UPDATE_NOTE, function (state, action) {
  var id = action.id,
      content = action.content;

  var editedNote = Object.assign({}, state.notes[id], {
    content: content
  });
  return Object.assign({}, state, {
    notes: Object.assign({}, state.notes, _defineProperty({}, id, editedNote))
  });
}), _handlers);

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
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
    if (notes) {
      return Object.values(notes).map(function (_ref2) {
        var id = _ref2.id,
            content = _ref2.content;

        return React.createElement(
          'li',
          { className: 'note-list-item', key: id },
          content
        );
      });
    }
    return "Add a note now!";
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'ul',
      { className: 'note-list' },
      buildNotesList()
    )
  );
};

var renderApp = function renderApp() {
  ReactDOM.render(React.createElement(NoteApp, { notes: window.state.notes }), document.getElementById('root'));
};

var actions = [{ type: CREATE_NOTE }, { type: UPDATE_NOTE, id: 1, content: 'herro world!' }, { type: CREATE_NOTE }, { type: UPDATE_NOTE, id: 2, content: 'number 2!' }];

var state = actions.reduce(reducer, undefined);

renderApp();
