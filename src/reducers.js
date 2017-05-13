export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const OPEN_NOTE = 'OPEN_NOTE';
export const CLOSE_NOTE = 'CLOSE_NOTE';

const initialState = {
  notes: [],
  openNoteId: null,
  isLoading: false
};

export const reducer = (state = initialState, action) => {
  if(handlers[action.type]){
    return handlers[action.type](state, action);
  }
  return state;
};

export const handlers = {
  [CREATE_NOTE]: (state, action) => {
    if (!action.id) {
      return {
        ...state,
        isLoading: true
      };
    }
    const newNote = {
      id: action.id,
      content: ''
    };
    return {
      ...state,
      openNoteId: action.id,
      notes: [...state.notes, newNote]
    }
  },
  [OPEN_NOTE]: (state, action) => {
    return {
      ...state,
      openNoteId: action.id
    }
  },
  [CLOSE_NOTE]: (state, action) => {
    return {
      ...state,
      openNoteId: null
    }
  },
  [UPDATE_NOTE]: (state, action) => {
    const { id, content } = action;
    let editedNote = state.notes.filter(note => note.id === id)[0];
    let reducedNotes = state.notes.filter(note => note.id !== id);
    editedNote.content = content;

    return {
      ...state,
      notes: [...reducedNotes, editedNote]
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
