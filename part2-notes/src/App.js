import { useEffect, useState } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((notesInDb) => {
      setNotes(notesInDb);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((savedNote) => {
      setNotes(notes.concat(savedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note["important"]);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n["id"] === id);

    const updatedNote = { ...note, important: !note["important"] };

    noteService
      .update(id, updatedNote)
      .then((updatedNote) =>
        setNotes(notes.map((n) => (n["id"] !== id ? n : updatedNote)))
      )
      .catch((err) => {
        alert(`the note "${note.content}" does not exist on the server`);
        setNotes(notes.filter((n) => n["id"] !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
