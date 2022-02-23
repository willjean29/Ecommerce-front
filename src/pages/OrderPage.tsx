import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import api from "api";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "components/custom/Mesaage";
import { RootStore } from "store";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder, updateDeliveredOrder } from "store/orders/order.actions";
import Loader from "components/custom/Loader";
import { IPaypalResponse } from "store/orders/interfaces/order.interface";

interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const { user } = useSelector((state: RootStore) => state.user);
  const { error, order, isLoading } = useSelector((state: RootStore) => state.orders);
  const dispatch = useDispatch();
  const addDecimals = (num: number) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };

  const itemsPrice = Number(
    order?.orderItems.reduce((acc, product) => acc + product.price * product.qty, 0).toFixed(2)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = Number((itemsPrice + +shippingPrice + +taxPrice).toFixed(2));

  useEffect(() => {
    dispatch(getOrderDetails(id as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    // console.log(window.paypal);
    const script = document.createElement("script");
    const addPaypalScript = async () => {
      const { data } = await api.get("/config/paypal");
      console.log(data);

      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.id = "script-paypal";
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };
    addPaypalScript();
    return () => {
      setSdkReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successPaymentHandler = (paymentResult: IPaypalResponse) => {
    console.log(paymentResult);
    dispatch(
      payOrder(id as string, {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.payer.email_address,
      })
    );
  };

  const successDeliveredHandler = () => {
    dispatch(updateDeliveredOrder(id as string));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error || order == null ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">Delivered on {order.deliverydAt}</Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong> Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Your cart is Empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((product, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={product.image} alt={product.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${product.product}`}>{product.name}</Link>
                            </Col>
                            <Col md={4}>
                              {product.qty} x {product.price} = ${addDecimals(product.qty * product.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Sumary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${shippingPrice}.00</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {isLoading && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>

                {/* <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item> */}
              </Card>
              {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                <Button variant="primary" className="my-3 w-100" onClick={() => successDeliveredHandler()}>
                  Mark Delivery
                </Button>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderPage;
