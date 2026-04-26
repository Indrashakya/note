import * as React from "react";
import { Badge, Button, Card, Stack } from "react-bootstrap";
import { Note } from "../models/noteModals";

interface NotesProps {
  note: Note;
  handleDelete: (id: string) => void;
  handleTogglePin: (id: string) => void;
}

const Notes: React.FC<NotesProps> = ({ note, handleDelete, handleTogglePin }) => {
  const readableDate = new Date(note.date).toLocaleString();

  return (
    <Card className="mb-3 note-card" style={{ backgroundColor: note.color }}>
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between align-items-start mb-2" gap={2}>
          <Card.Title className="mb-0">{note.title}</Card.Title>
          {note.pinned && <Badge bg="dark">Pinned</Badge>}
        </Stack>

        <Card.Text className="note-text">{note.text}</Card.Text>
        <Card.Subtitle className="text-muted small">{readableDate}</Card.Subtitle>

        <Stack direction="horizontal" gap={2} className="mt-3">
          <Button variant="outline-dark" size="sm" onClick={() => handleTogglePin(note.id)}>
            {note.pinned ? "Unpin" : "Pin"}
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(note.id)}>
            Delete
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Notes;
