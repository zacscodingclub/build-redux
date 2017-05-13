import React, { Component } from 'react';
import connect from '../connect';
import api from '../api';
import { handlers, reducer, CREATE_NOTE, UPDATE_NOTE, CLOSE_NOTE, OPEN_NOTE } from '../reducers';

import NoteApp from './NoteApp';

const mapStateToProps = state => ({
  notes: state.notes,
  openNoteId: state.openNoteId
});

const mapDispatchToProps = dispatch => ({
  onAddNote: () => dispatch(
    ({ dispatch }) => {
      dispatch({ type: CREATE_NOTE });
      api.createNote()
            .then(({ id }) => {
              dispatch({
                type: CREATE_NOTE,
                id
              });
            });
    }
  ),
  onChangeNote: (id, content) => dispatch({
    type: UPDATE_NOTE,
    id,
    content
  }),
  onOpenNote: id => dispatch({
    type: OPEN_NOTE,
    id
  }),
  onCloseNote: () => dispatch({
    type: CLOSE_NOTE
  })
});

const NoteAppContainer = connect(mapStateToProps, mapDispatchToProps)(NoteApp);
export default NoteAppContainer;
