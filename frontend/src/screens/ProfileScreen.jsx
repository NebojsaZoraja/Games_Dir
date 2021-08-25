import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Card,
  Table,
  Collapse,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listmyOrders } from "../actions/orderActions";

const ProfileScreen = ({ location, history }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listmyOrders());
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [history, userInfo, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center my-lg-5 my-md-5 my-4">
        <Col
          md={6}
          lg={5}
          style={{ borderRight: "solid", borderWidth: "0.5px" }}
          className=""
        >
          <Card className="p-2 m-lg-3">
            <h2 style={{ textAlign: "center" }}>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-1">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="my-1">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="my-1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="my-1">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ textAlign: "center" }}>
                <Button type="submit" variant="primary" className="my-2">
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Card>
        </Col>
        <Col lg={7}>
          <h3 style={{ textAlign: "center" }}>My Games</h3>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <>
              <Button
                variant="dark"
                style={{
                  width: "100%",
                }}
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Click to view all of your purchases
              </Button>
              <Collapse in={open} className="my-1">
                <Dropdown>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>NAME</th>
                        <th>TOTAL</th>
                        <th>Purchased on</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order.orderItem.title}</td>
                          <td>${order.totalPrice}</td>
                          <td>{order.updatedAt.substring(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Dropdown>
              </Collapse>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
