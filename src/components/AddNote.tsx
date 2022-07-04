import Button from 'react-bootstrap/Button';
import * as React from 'react';
import { Alert, Form } from 'react-bootstrap';
import { Note } from '../models/noteModals';

interface AddNoteProps {
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const AddNote: React.FunctionComponent<AddNoteProps> = ({notes, setNotes}) => {
  const [err, setErr] = React.useState<string>("") 
  const notetitle = React.useRef<HTMLInputElement | null>(null);
  const noteText = React.useRef<HTMLTextAreaElement | null>(null);
  const noteColor = React.useRef<HTMLInputElement | null>(null);

  const handleSave = (e:React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (notetitle.current?.value === "" || noteText.current?.value === "") {
      return setErr("All fields are mandatory");
  }

  setErr("");
  setNotes([...notes, {
      id: (new Date()).toString(),
      title: (notetitle.current as HTMLInputElement).value,
      text: (noteText.current as HTMLTextAreaElement).value,
      color: (noteColor.current as HTMLInputElement).value,
      date: (new Date()).toString()
  }]);
  
  (notetitle.current as HTMLInputElement).value = "";
  (noteText.current as HTMLTextAreaElement).value = "";

}

  return(
    <>
    {err && <Alert variant="danger">{ err }</Alert>}
            <Form className="mt-3 mb-3" onSubmit={(e)=> handleSave(e) }>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Note" ref={notetitle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Text</Form.Label>
                    <Form.Control placeholder="Enter your notes" as="textarea" rows={3} ref={ noteText }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="colorInput">Notes Color</Form.Label>
                    <Form.Control type="color" id="colorInput" defaultValue="#dfdfdf" title="Choose your color" ref={noteColor}/>
                </Form.Group>
                <Button  type="submit" variant="primary">Save</Button>
            </Form>
    </>
  ) ;
};

export default AddNote;
