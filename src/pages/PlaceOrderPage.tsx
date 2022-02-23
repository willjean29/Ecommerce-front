import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "components/custom/CheckoutSteps";
import Message from "components/custom/Mesaage";
import { RootStore } from "store";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "store/orders/order.actions";
import { useEffect } from "react";
interface PlaceOrderPageProps {}

const PlaceOrderPage: React.FC<PlaceOrderPageProps> = () => {
  const navigate = useNavigate();
  const { products, shippingAddress, paymentMethod } = useSelector((state: RootStore) => state.cart);
  const { user } = useSelector((state: RootStore) => state.user);
  const { error, successOrder, order } = useSelector((state: RootStore) => state.orders);
  const dispatch = useDispatch();
  const addDecimals = (num: number) => {
    return Number((Math.round(num * 100) / 100).toFixed(2));
  };

  const itemsPrice = Number(products.reduce((acc, product) => acc + product.price * product.qty, 0).toFixed(2));
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = Number((itemsPrice + +shippingPrice + +taxPrice).toFixed(2));
  useEffect(() => {
    if (successOrder) {
      navigate(`/order/${order?._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successOrder]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        user: user?._id!,
        orderItems: products,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        shippingAddress: shippingAddress!,
        paymentMethod,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress?.address}, {shippingAddress?.city} {shippingAddress?.postalCode},{" "}
                {shippingAddress?.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong> Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {products.length === 0 ? (
                <Message>Your cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {products.map((product, index) => (
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
            </ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={products.length === 0} onClick={placeOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
