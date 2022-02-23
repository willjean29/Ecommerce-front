import Loader from "components/custom/Loader";
import Message from "components/custom/Mesaage";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootStore } from "store";
import { getOrdersList } from "store/orders/order.actions";
import { updateUserProfile } from "store/users/user.actions";
interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { user, isLoading, error, message } = useSelector((store: RootStore) => store.user);
  const { orders, isLoading: loadingOrders, error: errorOrders } = useSelector((store: RootStore) => store.orders);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrdersList());
    console.log(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessageAlert("Please enter values");
      return;
    }
    if (password !== confirmPassword) {
      setMessageAlert("Passwords do not match");
      return;
    }
    dispatch(
      updateUserProfile({
        name,
        email,
        password,
      })
    );
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {messageAlert && <Message variant="danger">{messageAlert}</Message>}
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password2" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="btn btn-block my-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                  <td>
                    {order.isDelivered ? order.deliverydAt : <i className="fas fa-times" style={{ color: "red" }}></i>}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
