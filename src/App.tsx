import React, { useState } from "react";
import { Note } from "./models/noteModals";
import "./App.css";
import Header from "./components/Header";
import { Col, Container, Row } from "react-bootstrap";
import NotesList from "./components/NotesList";
import AddNote from "./components/AddNote";

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: new Date().toString(),
      title: "meeting",
      text: "Coffee meeting",
      color: "#dfdfdf",
      date: new Date().toString(),
    }
  ]);
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col>
          <NotesList notes={notes} setNotes={ setNotes}/>
          </Col>
        </Row>
        <Row>
          <Col>
          <AddNote notes={notes} setNotes={ setNotes}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
