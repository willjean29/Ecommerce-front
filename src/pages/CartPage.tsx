import Message from "components/custom/Mesaage";
import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RootStore } from "store";
import { addToCart, removeToCart } from "store/cart/cart.actions";
interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { products } = useSelector((store: RootStore) => store.cart);
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const qty = params.get("qty");
  console.log(id, qty);
  useEffect(() => {
    if (id && qty) {
      dispatch(addToCart(id, Number(qty)));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id: string) => {
    dispatch(removeToCart(id));
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {products.length === 0 ? (
            <Message>
              Your Cart is Empty
              <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {products.map((product) => (
                <ListGroup.Item key={product.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product.product}`}>
                        {product.name}
                      </Link>
                    </Col>
                    <Col md={2}>${product.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={product.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(product.product, Number(e.target.value))
                          )
                        }
                      >
                        {Array.from(
                          { length: product.countInStock },
                          (v, i) => i
                        ).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="ligth"
                        onClick={() => removeFromCartHandler(product.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {products.reduce((sum, product) => sum + product.qty, 0)}) items
              </h2>
              $
              {products
                .reduce((sum, product) => sum + product.qty * product.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={products.length === 0}
                onClick={() => navigate("/payment")}
              >
                Proccess To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
