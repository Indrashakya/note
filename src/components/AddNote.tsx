import Button from "react-bootstrap/Button";
import * as React from "react";
import { Alert, Card, Form } from "react-bootstrap";
import { Note } from "../models/noteModals";

interface AddNoteProps {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const AddNote: React.FunctionComponent<AddNoteProps> = ({ notes, setNotes }) => {
  const [err, setErr] = React.useState<string>("");
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [color, setColor] = React.useState("#f8f9fa");
  const [pinned, setPinned] = React.useState(false);

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      setErr("Title and note text are required.");
      return;
    }

    setErr("");
    setNotes([
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        text: text.trim(),
        color,
        pinned,
        date: new Date().toISOString(),
      },
      ...notes,
    ]);

    setTitle("");
    setText("");
    setColor("#f8f9fa");
    setPinned(false);
  };

  return (
    <Card className="panel-card">
      <Card.Body>
        <Card.Title className="mb-3">Create note</Card.Title>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="What do you want to remember?"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              placeholder="Write your note..."
              as="textarea"
              rows={6}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="colorInput">Note Color</Form.Label>
            <Form.Control
              type="color"
              id="colorInput"
              title="Choose your color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </Form.Group>
          <Form.Check
            className="mb-3"
            type="switch"
            id="pin-switch"
            label="Pin this note"
            checked={pinned}
            onChange={(event) => setPinned(event.target.checked)}
          />
          <Button type="submit" variant="dark" className="w-100">
            Save Note
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNote;
