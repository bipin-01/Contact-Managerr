import React, { useEffect } from "react";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/Loading";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../Components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { deleteContactAction, listContacts } from "../../actions/contactsAction";

const MyContacts = ({ search }) => {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, contacts, error } = contactList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactCreate = useSelector((state) => state.contactCreate);
  const { success: successCreate } = contactCreate;

  const contactUpdate = useSelector((state) => state.contactUpdate);
  const { success: successUpdate } = contactUpdate;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  const history = useHistory();
  useEffect(() => {
    dispatch(listContacts());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteContactAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome back ${userInfo?.name}...`}>
      <Link to="/createcontact">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Contact
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger"> {error}</ErrorMessage>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {contacts &&
        contacts
          .map((contact) => (
            <Accordion key={contact._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {contact.namee}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button href={`/contact/${contact._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(contact._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Department - {contact.department}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>Email- {contact.emailAddress}</p>
                      <footer className="blockquote=footer">
                        Contact Added On{" "}
                        <cite title="Source Title">
                          {contact.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyContacts;
