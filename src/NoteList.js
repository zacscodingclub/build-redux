import React from 'react';
import NoteLink from './NoteLink';

const NoteList = ({ notes, onOpenNote }) => {
  function buildList() {
    return notes.map((note, index) => {
      return (
        <NoteLink
          key={index}
          note={note}
          onOpenNote={onOpenNote}
        />
      )
    });
  }

  return (
    <ul className="note-list">
      { buildList() }
    </ul>
  )
};

export default NoteList;
