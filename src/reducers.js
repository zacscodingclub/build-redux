export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';

const initialState = {
  nextNoteId: 1,
  notes: {}
};

export const reducer = (state = initialState, action) => {
  if(handlers[action.type]){
    return handlers[action.type](state, action);
  }
  return state;
};

export const handlers = {
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

export const validateAction = (action) => {
  const isItAnObject = (!action || typeof action !== 'object'|| Array.isArray(action));
  if (isItAnObject) {
    throw new Error('Action must be an object');
  }
  const isItUndefined = typeof action.type === 'undefined';
  if (isItUndefined) {
    throw new Error('Action must have a type!');
  }
};
