import Product from "components/custom/Product";
import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "utils/products";
interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  console.log(products);
  return (
    <>
      <h1>Lastet Products</h1>
      <Row>
        {products.map((product, index) => (
          <Col sm={12} md={6} lg={4} xl={3} key={index.toString()}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
