import axios from 'axios';
import Loading from '../../Components/Loading';
import React, { useEffect, useState } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../Components/ErrorMessage';
import { delteNoteAction, updateNoteAction } from "../../actions/notesAction";

const SingleNote = ({ history, match}) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(delteNoteAction(id));
    }
    history.push("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
  };

  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
             { loadingDelete && <Loading/> } 
             {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
             {errorDelete && (
               <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
             )} 
             <Form.Group controlId="title">
               <Form.Label>Title</Form.Label>
               <Form.Control
               type="title"
               placeholder="Enter the title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               />
             </Form.Group>

             <Form.Group controlId="content">
               <Form.LABEL>Content</Form.LABEL>
               <Form.Control
               type="textarea"
               placeholder="Enter the content"
               rows={3}
               value={content}
               onChange={(e) => setTitle(e.target.value)}
               />
             </Form.Group>

             <Form.Group controlId="content">
               <Form.LABEL>Category</Form.LABEL>
               <Form.Control
               type="content"
               placeholder="Enter the Department"
               value={category}
               onChange={(e) => setTitle(e.target.value)}
               />
             </Form.Group>
             {loading && <Loading size={50} />}
             <Button variant="primary" type="submit">
               Update Button
             </Button>

             <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
              >Delete Button</Button> 
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  )
};

export default SingleNote;