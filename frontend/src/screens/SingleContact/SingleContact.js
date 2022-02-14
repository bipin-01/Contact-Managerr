import React, { useEffect, useState } from "react";
import MainScreen from "../../Components/MainScreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {deleteContactAction, updateContactAction } from "../../actions/contactsAction";
import { Button, Card, Form } from "react-bootstrap";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";

function SingleContact({ match, history }) {
  const [namee, setNamee] = useState();
  const [emailAddress, setEmailAddress  ] = useState();
  const [department, setDepartment] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { loading, error } = contactUpdate;

  const contactDelete = useSelector((state) => state.contactDelete);
  const { loading: loadingDelete, error: errorDelete } = contactDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteContactAction(id));
    }
    history.push("/mycontacts");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/contacts/${match.params.id}`);

      setNamee(data.namee);
      setEmailAddress(data.emailAddress);
      setDepartment(data.department);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setNamee("");
    setEmailAddress("");
    setDepartment("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateContactAction(match.params.id, namee, emailAddress, department));
    if (!namee || !emailAddress || !department) return;

    resetHandler();
    history.push("/mycontacts");
  };

  return (
    <MainScreen title="Edit Contact">
      <Card>
        <Card.Header>Edit your Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="namee">
              <Form.Label>Namee</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={namee}
                onChange={(e) => setNamee(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="emailAddress">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="department">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Contact
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Contact
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleContact;
