import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "components/custom/FormContainer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserById } from "store/users/user.actions";
import { RootStore } from "store";
import Message from "components/custom/Mesaage";
import Loader from "components/custom/Loader";
interface UserEditPageProps {}

const UserEditPage: React.FC<UserEditPageProps> = () => {
  const { id } = useParams();
  const { errorUser: error, isLoadingUsers, userDetails } = useSelector((store: RootStore) => store.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDetails?.name || userDetails?._id !== id) {
      dispatch(getUserById(id as string));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userDetails.isAdmin);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, dispatch]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(isAdmin);
    dispatch(
      updateUserById(id as string, {
        name,
        email,
        isAdmin,
      })
    );
    if (!error) {
      navigate("/admin/userlist");
    }
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {error && <Message variant="danger">{error}</Message>}
        {isLoadingUsers ? (
          <Loader />
        ) : (
          <Form onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary" className="btn btn-block my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
