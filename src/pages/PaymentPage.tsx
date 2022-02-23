import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import Message from "components/custom/Mesaage";
// import Loader from "components/custom/Loader";
import FormContainer from "components/custom/FormContainer";
import { cartSavePaymentMethod } from "store/cart/cart.actions";
import { useNavigate } from "react-router-dom";
import { RootStore } from "store";
import CheckSteps from "components/custom/CheckoutSteps";
interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = () => {
  const { shippingAddress } = useSelector((state: RootStore) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  // const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(cartSavePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
