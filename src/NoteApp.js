const NoteApp = ({ notes }) => {
  function buildNotesList() {
    if(notes) {
      return Object.values(notes).map(({id, content}) => {
        return (
          <li className="note-list-item" key={id}>
            {id}. {content}
          </li>
        )
      })
    }
    return "Add a note now!";
  }

  return (
    <div>
      <ul className="note-list">
        { buildNotesList() }
      </ul>
    </div>
  );
};

export default NoteApp;
