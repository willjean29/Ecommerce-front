import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/custom/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "store/users/user.actions";
import { RootStore } from "store";
import Message from "components/custom/Mesaage";
import Loader from "components/custom/Loader";
interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, isLoading } = useSelector(
    (store: RootStore) => store.user
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [navigate, isAuthenticated]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      signIn({
        email,
        password,
      })
    );
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
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
        <Button type="submit" variant="primary" className="btn btn-block my-3">
          Sign In
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer?
          <Link to={`/register`}> Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
