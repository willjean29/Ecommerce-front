import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import Message from "components/custom/Mesaage";
// import Loader from "components/custom/Loader";
import FormContainer from "components/custom/FormContainer";
import { cartSaveShippingAddress } from "store/cart/cart.actions";
import { useNavigate } from "react-router-dom";
import { RootStore } from "store";
import CheckSteps from "components/custom/CheckoutSteps";
interface ShippingPageProps {}

const ShippingPage: React.FC<ShippingPageProps> = () => {
  const { shippingAddress } = useSelector((state: RootStore) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  // const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!address || !city || !country || !postalCode) {
      // setMessageError("");
      return;
    }
    console.log("enviuar address");
    dispatch(
      cartSaveShippingAddress({
        address,
        city,
        country,
        postalCode,
      })
    );
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
