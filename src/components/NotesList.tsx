import * as React from "react";
import { Card, Form, Stack } from "react-bootstrap";
import { Note } from "../models/noteModals";
import Notes from "./Notes";

interface NotesListProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NotesList: React.FC<NotesListProps> = ({ notes, setNotes }) => {
  const [search, setSearch] = React.useState("");

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setNotes(
      notes.map((note) => {
        if (note.id !== id) {
          return note;
        }

        return {
          ...note,
          pinned: !note.pinned,
        };
      })
    );
  };

  const filteredNotes = notes
    .filter((note) => {
      const query = search.toLowerCase().trim();
      if (!query) {
        return true;
      }

      return note.title.toLowerCase().includes(query) || note.text.toLowerCase().includes(query);
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <Card className="panel-card">
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between align-items-center mb-3" gap={2}>
          <Card.Title className="mb-0">Your notes</Card.Title>
          <span className="text-muted small">{filteredNotes.length} shown</span>
        </Stack>

        <Form.Control
          className="mb-3"
          type="search"
          placeholder="Search notes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {filteredNotes.length === 0 ? (
          <p className="text-muted mb-0">No notes found. Try a different keyword.</p>
        ) : (
          filteredNotes.map((note) => (
            <Notes key={note.id} note={note} handleDelete={handleDelete} handleTogglePin={handleTogglePin} />
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default NotesList;
