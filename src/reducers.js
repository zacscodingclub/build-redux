export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const OPEN_NOTE = 'OPEN_NOTE';
export const CLOSE_NOTE = 'CLOSE_NOTE';

const initialState = {
  nextNoteId: 3,
  notes: [
    {
      id: 1,
      content: 'testing'
    },
    {
      id: 2,
      content: 'testing 2'
    },
  ],
  openNoteId: null
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
      openNoteId: id,
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
    let reducedState = state.notes.filter(note => note.id !== id);
    editedNote.content = content;

    const newNotes = [...reducedState, editedNote];

    return {
      ...state,
      notes: newNotes
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
