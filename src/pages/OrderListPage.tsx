import { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { RootStore } from "store";
import Loader from "components/custom/Loader";
import Message from "components/custom/Mesaage";
import { getOrdersListAdmin } from "store/orders/order.actions";
interface OrderListPageProps {}

const OrderListPage: React.FC<OrderListPageProps> = () => {
  const dispatch = useDispatch();
  const { isLoading, orders, error } = useSelector((store: RootStore) => store.orders);

  useEffect(() => {
    dispatch(getOrdersListAdmin());
    const currentDate = new Date();
    console.log(currentDate.toLocaleDateString("en-US"));
  }, [dispatch]);

  const formatDate = (date: string) => {
    const orderDate = new Date(date);
    return orderDate.toLocaleDateString("en-US");
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>ORDERS</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
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
                <td>{order._id}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.paidAt ? formatDate(order.paidAt) : <i className="fas fa-times" style={{ color: "red" }}></i>}
                </td>
                <td>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
