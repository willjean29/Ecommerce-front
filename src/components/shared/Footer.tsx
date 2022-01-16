import React from "react";
import { Container, Row, Col } from "react-bootstrap";
interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
