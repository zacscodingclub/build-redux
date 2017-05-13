import React from 'react';
import NoteEditor from './NoteEditor';
import NoteList from './NoteList';

const NoteApp = ({ notes, openNoteId, onAddNote, onChangeNote, onOpenNote, onCloseNote }) => {
  function renderContent() {
    if (openNoteId) {
      const currentNote = notes.filter(note => note.id === openNoteId)[0];
      return (
        <NoteEditor
          note={currentNote}
          onChangeNote={onChangeNote}
          onCloseNote={onCloseNote}
        />
      )
    }

    return (
      <div>
        <NoteList notes={notes} onOpenNote={onOpenNote} />
        <button className="editor-button" onClick={onAddNote}>New Note</button>
      </div>
    )
  }

  return (
    <div>
      { renderContent() }
    </div>
  );
};

export default NoteApp;
