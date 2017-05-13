'use strict';

var _handlers;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CREATE_NOTE = 'CREATE_NOTE';
var UPDATE_NOTE = 'UPDATE_NOTE';

var initialState = {
  nextNoteId: 1,
  notes: {}
};

var validateAction = function validateAction(action) {
  var isItAnObject = !action || (typeof action === 'undefined' ? 'undefined' : _typeof(action)) !== 'object' || Array.isArray(action);
  if (isItAnObject) {
    throw new Error('Action must be an object');
  }
  var isItUndefined = typeof action.type === 'undefined';
  if (isItUndefined) {
    throw new Error('Action must have a type!');
  }
};

var createStore = function createStore(reducer) {
  var state = undefined;
  var subscribers = [];
  var store = {
    dispatch: function () {
      function dispatch(action) {
        validateAction(action);
        state = reducer(state, action);
        subscribers.forEach(function (handler) {
          return handler();
        });
      }

      return dispatch;
    }(),
    getState: function () {
      function getState() {
        return state;
      }

      return getState;
    }(),
    subscribe: function () {
      function subscribe(handler) {
        subscribers.push(handler);
        return function () {
          var index = subscribers.indexOf(handler);
          if (index > 0) {
            subscribers.splice(index, 1);
          }
        };
      }

      return subscribe;
    }()
  };
  store.dispatch({ type: '@@redux/INIT' });
  return store;
};

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

var NoteApp = function NoteApp(_ref) {
  var notes = _ref.notes;

  function buildNotesList() {
    if (notes) {
      return Object.values(notes).map(function (_ref2) {
        var id = _ref2.id,
            content = _ref2.content;

        debugger;
        return React.createElement(
          'li',
          { className: 'note-list-item', key: id },
          id,
          '. ',
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
  ReactDOM.render(React.createElement(NoteApp, { notes: store.getState().notes }), document.getElementById('root'));
};

var store = createStore(reducer);

store.subscribe(function () {
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
