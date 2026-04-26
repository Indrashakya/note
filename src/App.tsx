import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";
import { Note } from "./models/noteModals";

const STORAGE_KEY = "notes-app-v2";

const starterNote: Note = {
  id: crypto.randomUUID(),
  title: "Welcome",
  text: "Capture ideas, pin important notes, and find anything instantly.",
  color: "#fff3cd",
  date: new Date().toISOString(),
  pinned: true,
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (!savedNotes) {
      setNotes([starterNote]);
      return;
    }

    try {
      const parsed = JSON.parse(savedNotes) as Note[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setNotes(parsed);
      } else {
        setNotes([starterNote]);
      }
    } catch {
      setNotes([starterNote]);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const pinnedCount = useMemo(() => notes.filter((note) => note.pinned).length, [notes]);

  return (
    <>
      <Header totalNotes={notes.length} pinnedNotes={pinnedCount} />
      <Container className="app-shell pb-5">
        <Row className="g-4">
          <Col lg={5}>
            <AddNote notes={notes} setNotes={setNotes} />
          </Col>
          <Col lg={7}>
            <NotesList notes={notes} setNotes={setNotes} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
