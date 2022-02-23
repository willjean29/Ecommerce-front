import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootStore } from "store";
import { deleteUserById, getAllUsers } from "store/users/user.actions";
import Modal from "components/custom/Modal";
import Loader from "components/custom/Loader";
import Message from "components/custom/Mesaage";
interface UserListPageProps {}

const UserListPage: React.FC<UserListPageProps> = () => {
  const [isVisible, setiIsVisible] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { isLoadingUsers, users, errorUser: error } = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const openModalHandler = (id: string) => {
    setUserId(id);
    setiIsVisible(true);
  };

  const deleteUserHandler = () => {
    dispatch(deleteUserById(userId));
    setiIsVisible(false);
  };

  return (
    <>
      <h1>Users</h1>
      {isLoadingUsers ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button variant="danger" className="btn-sm" onClick={() => openModalHandler(user._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal
        isVisible={isVisible}
        setIsVisible={setiIsVisible}
        title="Delete User"
        description="A deleted user cannot be recovered, are you sure?"
        onSuccess={() => {
          // console.log("eleminar");
          deleteUserHandler();
        }}
      />
    </>
  );
};

export default UserListPage;
