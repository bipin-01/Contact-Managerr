
import React, { useEffect, useState} from "react";
import MainScreen from "../../Components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createContactAction } from "../../actions/contactsAction";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";

function CreateContact({ history }) {
  const [namee, setNamee] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch = useDispatch();

  const contactCreate = useSelector((state) => state.contactCreate);
  const { loading, error} = contactCreate;

  // console.log(contact);

  const resetHandler = () => {
    setNamee("");
    setEmailAddress("");
    setDepartment("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createContactAction(namee, emailAddress, department));
    if (!namee || !emailAddress || !department) return;

    resetHandler();
    history.push("/mycontacts");
  };

  useEffect(() => {}, []);

  return (
    <MainScreen title="Create Contact">
      <Card>
        <Card.Header>Create New Contact</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="title"
                value={namee}
                placeholder="Enter the Name"
                onChange={(e) => setNamee(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="title"
                value={emailAddress}
                placeholder="Enter the Email Address"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="content"
                value={department}
                placeholder="Enter the Department"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Contact
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateContact;